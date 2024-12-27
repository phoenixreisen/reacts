//--- View Types -----

export type Props = {
    inText?: {
        prefix: string,
        suffix: string,
    },
    id?: string,
    value: string,
    label?: string,
    valid?: boolean,
    pattern?: RegExp,
    warnmsg?: string,
    errormsg?: string,
    disabled?: boolean,
    readonly?: boolean,
    logerror?: boolean,
    maxLength?: number,
    minLength?: number,
    throttling?: number,
    withButton?: boolean,
    placeholder?: string,
    clearAfterLoad?: boolean,
    // Event-Funktionen
    onInput: (input: string) => void,
    onBlur?: (param?: unknown) => void,
    onLoad: (name: string) => Promise<unknown>,
    onQuery: (input?: string) => Promise<Array<string>>,
    onFocusCallback?: (input: string, state: State, props: Props) => void,
}

export type State = {
    value: string,
    valid: boolean,
    loading: boolean,
    error: Error|null,
    events: Events | null,
}

export type Events = {
    ESCAPE: ((e: KeyboardEvent) => void) | null,
    ARROW: ((e: KeyboardEvent) => void) | null
}