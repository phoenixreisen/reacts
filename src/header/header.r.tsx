import logo from './phx.logo.svg';
import React from 'react';

interface Attrs {
    url?: string,
    tab?: string,
    title?: string,
    version?: string,
    toggleNav?: () => void
}

export const Header = (props: Attrs) => {
    const { protocol, host, pathname } = location as Location;

    const href = !props.url
        ? `${protocol || ''}//${host}${(pathname?.length > 1) ? pathname : ''}`
        : props.url;

    return (
        <article className="header">
            <a href={href} target={props.tab || '_self'} title={props.title || ''}>
                <picture className="header__logo">
                    <img src={logo} />
                </picture>
            </a>

            {props.version ?
                <div className="header__version">
                    { props.version }
                </div>
                : ''}

            {props.toggleNav ?
                <div className="header__nav-btn">
                    <a href="javascript:" title="Navigation ein- & ausblenden" className="nav-btn noprint"
                        onClick={() => props.toggleNav()}>
                        <i className="fas fa-bars"></i>
                    </a>
                </div>
                : ''}
        </article>
    );
};

export default Header;