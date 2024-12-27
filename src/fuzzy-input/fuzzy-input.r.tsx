import type  { Props, State } from './fuzzy-input.types';

import { isValid, findMatch, isReady } from './fuzzy-input.fns';
import { ID, MAXLENGTH, THROTTLING } from './fuzzy-input.consts';
import React, { useEffect, useMemo, useRef, useState } from 'react';

//--- View Types -----

//--- View -----

export function FuzzyInput(props: Props) {

    //--- States -----

    const focused = useRef<number>(-1);
    const match = useRef<string|null>(null);
    const result = useRef<Array<string>|null>(null);
    const throttling = useRef<NodeJS.Timeout>(null);

    const [state, setState] = useState<State>({
        value: '',
        error: null,
        events: null,
        valid: false,
        loading: false,
    });

    const currentValue = useMemo(() => (
        props.value 
            ? props.value 
            : state.value
    ), [props.value, state.value]);

    const showErrormsg = useMemo(() => (
        !!state.error && (props.errormsg !== '')
    ), [state.error, props.errormsg]);

    const showResultlist = useMemo(() => (
        Array.isArray(result.current) && !state.loading
    ), [result.current, state.loading]);

    const showWarnmsg = useMemo(() => (
        props.warnmsg !== '' 
        && state.value.length > 0 
        && !isValid(currentValue, props)
    ), [currentValue, props.warnmsg]);

    //--- Funktionen -----

    function setCurrentValue(input: string) {
        if(props.onInput) {
            props.onInput(input);
        } else {
            setState(prev => ({ ...prev, value: input }));
        }
    }

    function reset(e?: KeyboardEvent, props?: Props) {
        if(!e || e.key === 'Escape') {
            if(props?.clearAfterLoad) {
                setCurrentValue('');
            }
            const reset = {
                error: null,
                match: null,
                result: null,
                loading: false,
            }
            focused.current = -1;
            result.current = null;
            setState(prev => ({ ...prev, ...reset }));
        }
    }

    function focus(
        e: KeyboardEvent,
        state: State,
        focused: React.MutableRefObject<number>,
        callback = search
    ) {
        const move = {
            'ArrowUp': (current: number) => {
                const prev = current - 1;
                return (prev > -1) ? prev : current;
            },
            'ArrowDown': (current: number) => {
                const next = current + 1;
                return (result && (next < result.current.length)) ? next : current;
            },
        }[e.key];

        // if arrow down or up was pressed and result list is not empty
        if(move && (result.current?.length)) {
            focused.current = move(focused.current);
            const id = `#${props.id || ID}-item-${focused.current}`;
            const $el = document.querySelector(id) as HTMLElement;
            $el?.focus({ preventScroll: true });
        } else if(move && !result.current && (currentValue?.length)) {
            callback?.(currentValue, state, props);
        }
    }

    async function load(choice: string, props: Props): Promise<void> {
        try {
            await props.onLoad(choice);
            
            if(props.inText) {
                const { prefix, suffix } = props.inText;
                // Ein Platzhalter wurde angefangen, dann ausgewählt.
                // Das Getippte wird durch Auswahl ersetzt bzw. vervollständigt.
                if(match.current) {
                    const value = currentValue;
                    const pattern = new RegExp(`${match.current}(\\s|$)`);
                    const substituted = value.replace(pattern, `${prefix}${choice}${suffix} `);
                    setCurrentValue(substituted);
                }
                // Es wurde einfach ein Platzhalter aus der Liste ausgewählt (z.B. über Button)
                // und wird an aktueller Cursor-Position eingefügt.
                else {
                    const $input = document.querySelector(`#${props.id || ID}`) as HTMLInputElement;
                    const cursorPosition = $input?.selectionStart ?? undefined;

                    if(typeof cursorPosition !== 'undefined') {
                        const start = currentValue.substring(0, cursorPosition);
                        const end = currentValue.substring(cursorPosition);
                        const concatenated = `${start}${prefix}${choice}${suffix}${end}`;
                        setCurrentValue(concatenated);
                    } else {
                        const concatenated = `${currentValue}${prefix}${choice}${suffix}`;
                        setCurrentValue(concatenated);
                    }
                }
                const $el = document.querySelector(`#${props.id || ID}`) as HTMLElement;
                $el?.focus({ preventScroll: true });
            } else {
                setCurrentValue(choice);
            }
            reset(null, props);
        } catch(e) {
            const error = e as Error;
            if(props.logerror) {            
                console.error(error);
            }
        }
    }

    function search(input: string, state: State, props: Props, query = callQuery): void {
        if(throttling.current) {
            clearTimeout(throttling.current);
        }
        throttling.current = setTimeout(() => {
            if(props.inText && !state.loading) {
                const { prefix } = props.inText;
                
                match.current = findMatch(input, prefix);
                
                if(match.current) {
                    const needle = match.current.replace(prefix, '').trim();
                    query(props, needle);
                } else {
                    reset(null, props);
                }
            } else if(isReady(input, currentValue, state, props) && isValid(input, props)) {
                query(props, input);
            } else if(!input.length) {
                reset(null, props);
            }
            throttling.current = null;
        }, (props.throttling || THROTTLING));
    }

    async function callQuery(props: Props, needle?: string): Promise<void> {
        try {
            setState(prev => ({ ...prev,
                error: null,
                loading: true,
            }));
            const query = await props.onQuery(needle);
            const filtered = (props.inText && (needle?.length))
                ? query.filter(item => item.includes(needle))
                : query;
            result.current = filtered;
        } catch(e) {
            const error = e as Error;
            setState(prev => ({ ...prev,
                error
            }));
            if(props.logerror) {
                console.error(e);
            }
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    }

    //--- Lifecycle Hooks -----

    useEffect(() => {
        const escapeEvent = (e: KeyboardEvent) => reset(e, props);
        const arrowEvent = (e: KeyboardEvent) => focus(e, state, focused, props.onFocusCallback);
        document.body.addEventListener('keyup', (e) => escapeEvent(e), true);
        document.body.addEventListener('keydown', (e) => arrowEvent(e), true);
        
        return () => {
            document.body.removeEventListener('keyup', escapeEvent, true);
            document.body.removeEventListener('keydown', arrowEvent, true);
        }
    }, []);

    useEffect(() => {
        if(!!currentValue) {
            search(currentValue, state, props);
        }
    }, [currentValue]);

    //--- Markup -----

    return (
        <article className="fuzzy-search fuzzy-show-result">
            {showErrormsg && (
                <div className="pulse animated fuzzy-error">
                    <div className="alert alert--danger alert--icon">
                        <i className="fas fa-times"></i>
                        {props.errormsg || 'Oha, während der Abfrage ist ein Fehler aufgetreten.'}
                    </div>
                </div>
            )}

            {showWarnmsg && (
                <div className="pulse animated fuzzy-warning">
                    <div className="alert alert--warning alert--icon">
                        <i className="fas fa-exclamation-triangle"></i>
                        {props.warnmsg || 'Ungültige Eingabe.'}
                    </div>
                </div>
            )}

            <div className={props.withButton ? 'fuzzy-with-button':''}>
                <label className="textfield fuzzy-input">
                    <input
                        type="text"
                        autoComplete='off'
                        value={currentValue}
                        id={`${props.id || ID}`}
                        name={`${props.id || ID}`}
                        data-testid={props.id || ID}
                        disabled={props.disabled || false}
                        readOnly={props.readonly || false}
                        placeholder={props.placeholder || '...'}
                        maxLength={props.maxLength || MAXLENGTH}
                        onBlur={props.onBlur || undefined}
                        onInput={(e) => {
                            const $el = (e.target as HTMLInputElement);
                            setCurrentValue($el.value);
                        }}
                    />
                    <span className="textfield__label">
                        {props.label || 'Suche'}
                    </span>
                </label>

                {props.withButton && (
                    <button type="button" className="btn btn--secondary"
                        onClick={() => callQuery(props)}>
                        <i className="fas fa-list"></i>
                    </button>
                )}
            </div>

            {showResultlist && (<>
                <div className="fuzzy-overlay fuzzy-result fuzzy-style" data-testid="fuzzy-result">
                    <div className="fadeIn animated faster">
                        {result.current?.map((name, index) =>
                            <a  href={'#'}
                                key={`${name}-${index}`}
                                id={`${props.id || ID}-item-${index}`} 
                                data-testid={`${props.id || ID}-item-${index}`}
                                onKeyUp={(e) => {
                                    if(e.key === 'Enter') {
                                        e.preventDefault();
                                        load(name, props);
                                    }
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    load(name, props);
                                }}>
                                {name}
                            </a>,
                        )}
                        {!result.current?.length && (
                            <div className="ma2">
                                <em>Die Suche ergab leider keine Treffer...</em>
                            </div>
                        )}
                    </div>
                </div>
                <div className="fuzzy-bg-layer"
                    onClick={() => reset()}>
                </div>
            </>)}
        </article>
    );
}

export default FuzzyInput;