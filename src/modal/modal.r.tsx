import React, { FunctionComponent, useEffect } from 'react';
import Sizes from './modal.sizes';

//--- Types -----

type Props = {
    size?: Sizes,
    title: string,
    footer?: unknown,
    content?: unknown,
    withCloseText?: boolean,
    toggle?: (e?) => void
}

//--- Komponente -----

export const Modal: FunctionComponent<Props> = (props) => {
    const { size, content, children, toggle } = props;

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if(e.keyCode === 27) {
                toggle?.();
            }
        });
    }, [children, content, size, toggle]);

    useEffect(() => {
        const $body = document.querySelector('body') as HTMLElement;

        if($body) {
            $body.style.overflow = 'hidden';
        }
        return () => {
            if($body) {
                $body.style.overflow = '';
            }
        };
    }, []);

    return (<>
        <article className={`modal modal--visible ${props.size || ''}`}>
            <div className="modal__header">
                <span className="modal__headline">
                    {props.title || ''}
                </span>
                {props.toggle &&
                    <a className="modal__toggle" href="#" onClick={props.toggle}>
                        {props.withCloseText &&
                            <span className="desktop-only">
                                schließen
                            </span>
                        }
                        <i className="fas fa-times-circle"></i>
                    </a>
                }
            </div>

            <div className="modal__content">
                { props.content || props.children }
            </div>

            {props.footer &&
                <div className="modal__footer tr">
                    {props.footer}
                </div>
            }
        </article>,
        <article className="modal__bg"></article>,
    </>);
};

export default Modal;