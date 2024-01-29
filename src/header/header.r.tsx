import logo from './phx.logo.svg';
import React from 'react';

//--- View Types -----

type Attrs = {
    url?: string,
    tab?: string,
    title?: string,
    version?: string,
    toggleNav?: (e?: React.MouseEvent) => void
}

//--- View -----

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
                    <a href={location.href} title="Navigation ein- & ausblenden" className="nav-btn noprint"
                        onClick={(e) => { e.preventDefault(); props.toggleNav(); }}>
                        <i className="fas fa-bars"></i>
                    </a>
                </div>
                : ''}
        </article>
    );
};

export default Header;