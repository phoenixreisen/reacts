import React, { Children, useEffect, useState } from 'react';

//--- Types -----

interface Props {
    icon?: string,
    title?: string,
    isOpen?: boolean,
    cssclass?: string,
    children: React.ReactNode
}

//--- Komponente -----

export const Dropdown = (props:Props) => {
    const {title, icon, cssclass} = props;
    const [isOpen, setIsOpen] = useState(false);

    const closeOnEsc = (e: KeyboardEvent) => {
        (e?.keyCode === 27) && setIsOpen(false);
    };

    useEffect(() => {
        setIsOpen(props.isOpen || false);
    }, [props.isOpen]);

    useEffect(() => {
        document.body.addEventListener('keydown', e => closeOnEsc(e));
    }, []);

    return(
        <article className={`dropdown ${isOpen ? 'dropdown--open':''} ${cssclass || ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
                {icon ? <i className={`fas ${icon} mr1`} aria-hidden="true"></i> : ''} {title || ''}
            </a>
            <div className="dropdown-items">
                {Children.toArray(props.children).map((child: React.ReactNode, index: number) => {
                    return (
                        <div key={`item-${index}`} className={`dropdown-item dropdown-item-${index}`}
                            onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
                            { child }
                        </div>
                    );
                })}
            </div>
        </article>
    );
};

export default Dropdown;