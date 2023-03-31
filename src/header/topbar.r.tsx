import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//--- Types -----

type AttrProps = {
    name: string,
    backUrl?: string,
    faviconUrl?: string,
    faviconTarget?: string,
    toggleNav?: (e?: any) => void,
    toggleAvatar?: (e?: any) => void,
    AvatarComponent?: React.ReactNode,
    NavComponent?: React.ReactNode
}

//--- Funktionen -----

const _getScrollOffset = () => {
    return window.scrollY
        || window.pageYOffset
        || document.body.scrollTop + (document.documentElement?.scrollTop || 0);
};

const _checkPosition = ({$header, isVisible, setIsVisible}) => {
    const preVisibility = isVisible;
    if($header) {
        const newStatus = (_getScrollOffset() >= $header.offsetHeight);
        if(newStatus !== preVisibility) {
            setIsVisible(newStatus);
        }
    }
};

//--- View -----

export const Topbar = (props: AttrProps) => {
    const [ $header, setHeader ] = useState<HTMLElement>(null);
    const [ isVisible, setIsVisible ] = useState<boolean>(false);

    useEffect(() => {
        setHeader(document.querySelector('.header') as HTMLElement || null);
        window.addEventListener('scroll', _checkPosition.bind(null, { $header, isVisible, setIsVisible }), true);
        window.addEventListener('touchmove', _checkPosition.bind(null, { $header, isVisible, setIsVisible }), true);
    }, [$header, isVisible]);

    return (
        <article className={`top-bar noprint ${isVisible ? 'top-bar--visible':''}`}>
            <div className="wrapper wrapper--large">
                <div className="top-bar__left">
                    {props.backUrl ?
                        <a href={props.backUrl} title="zurück" className="top-bar__back-btn">
                            <i className="fas fa-arrow-left"></i>
                        </a>
                        : ''}

                    <a href={props.faviconTarget || 'https://www.phoenixreisen.com'} title="zur Startseite">
                        <img src={props.faviconUrl || 'https://phoenixreisen.com/favicon.png'} className="top-bar__icon" alt="" />
                        <span className="ml1">{props.name}</span>
                    </a>
                </div>

                {props.toggleAvatar ?
                    <article className="top-bar__avatar noprint">
                        <Link to="#" className="avatar-cta avatar-cta--topbar"
                            title="Service, Einstellungen & Optionen"
                            onClick={(e) => props.toggleAvatar(e)}>
                            <i className="fas fa-user avatar__symbol"></i>
                        </Link>
                        {!!props.AvatarComponent && (
                            props.AvatarComponent
                        )}
                    </article>
                    : ''}

                {props.toggleNav ?
                    <article className="top-bar__nav-btn noprint">
                        <Link to="#" className="nav-btn"
                            title="Navigation ein-/ausblenden"
                            onClick={(e) => props.toggleNav(e)}>
                            <i className="fas fa-bars"></i>
                        </Link>
                        {!!props.NavComponent && (
                            props.NavComponent
                        )}
                    </article>
                    : ''}
            </div>
        </article>
    );
};

export default Topbar;