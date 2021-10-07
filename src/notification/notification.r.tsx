import { NoteProps, STATUS, ICONS, SHOWTIMER } from './notification.settings';
import React, { useEffect, useState } from 'react';

//--- Ausgabe einer Notification -----

export const Notification = (props: NoteProps) => {
    const [ icon, setIcon ] = useState<string>(null);

    useEffect(() => {
        if(!props.toggle || !props.text) {
            throw 'need at least toggle() and text!';
        }
        setIcon((props.status === STATUS.error)
            ? ICONS.triangle
            : (props.status === STATUS.success)
                ? ICONS.check
                : ICONS.info,
        );
    }, []);

    useEffect(() => {
        const to = setTimeout(() => props.toggle(), SHOWTIMER);
        return () => clearTimeout(to);
    }, []);

    return (
        <article className={`notification notification--${props.status || 'primary'}`}>
            <i className={`fas fa-${icon}`}></i>
            <span>{ props.text }</span>
            <a href="#" className="fas fa-times" onClick={(e) => {
                e?.preventDefault();
                props.toggle();
            }}></a>
        </article>
    );
};

export default Notification;