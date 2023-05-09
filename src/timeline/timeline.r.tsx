import React, { Children, ReactNode, useEffect, useState } from "react";

//--- View Types -----

type Position = 'left' | 'center';

interface Props {
    animated: boolean
    position: Position,
    children: ReactNode,
    side?: Map<number, 'left'|'right'>
    line: 'separated' | 'constantly'
}

//--- View Variables -----

//--- View Functions -----

//--- View -----

export const TimeLine = (props: Props) => {

    const [ position ] = useState<Position>(props.position || 'left');
    const [ modifier, setModifier ] = useState<'timeline--static' | 'timeline--animated' | ''>('');

    useEffect(() => {
        if(props.position && (props.position !== 'left' && props.position !== 'center')) {
            throw new Error('Unknown position parameter (allowed is left or right).');
        } else if(props.line && (props.line !== 'separated' && props.line !== 'constantly')) {
            throw new Error('Unknown line parameter (allowed is separated or constantly).');
        } else if(!!props.side && position === 'left') {
            throw new Error('Parameter only allowed when position is "center".');
        }
    }, [props.position, props.line, props.side]);

    useEffect(() => {
        if(!!props.animated) {
            setModifier('timeline--animated');
        } else {
            setModifier('timeline--static');
        }
    });


    try {
        return (
            <section className={`timeline ${modifier} ${position === 'left' ? 'timeline--left':'timeline--center'}`}>

                {props.line !== 'separated' &&
                    <span className={`timeline-axis`}></span>
                }
                {(Children.toArray(props.children)).map((child, childnr) => {
                    const transition = 500;
                    const isOdd = (childnr % 2) === 1;
                    const delayPerSection = transition * childnr;

                    return (
                        <article className="timeline-box" key={`sec-${childnr}`}>
                            {(props.line === 'separated') &&
                                <span 
                                    className={`timeline-axis`} 
                                    style={{transition: `height ${transition}ms ease ${delayPerSection}ms`}} 
                                />
                            }
                            {(position === 'left') && (
                                <div className="timeline-left-box">
                                    <i className="timeline-circle" />
                                    
                                    <div className="timeline-content">
                                        { child }
                                    </div>
                                </div>
                            )}
                            {(position === 'center') && (
                                <div className="timeline-center-box">
                                    <i className="timeline-circle" />
                                    
                                    <div className="timeline-content timeline-content--left">
                                        { !props.side?.get(childnr) && !isOdd && child }
                                        { props.side?.get(childnr) === 'left' && child }
                                    </div>
                                    <div className="timeline-content timeline-content--right">
                                        { !props.side?.get(childnr) && isOdd && child }
                                        { props.side?.get(childnr) === 'right' && child }
                                    </div>
                                </div>
                            )}
                        </article>
                    )
                })}
            </section>
        );
    } catch(e) {
        throw e;
    }
};

export default TimeLine;