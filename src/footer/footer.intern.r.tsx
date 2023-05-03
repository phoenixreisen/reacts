import React from 'react';

//--- View Types -----

type Props = {
    loggedIn: boolean,
    username: string,
};

const Footer = (props: Props) => {
    
    return (
        <article className="intern-footer">
            <div className="wrapper wrapper--large">
                
                <hr />
                
                {props.loggedIn && (
                    <div className="tr mr3">
                        <span>eingeloggt als <span className="f4">{props.username || ''}</span></span>
                        <span className="mh3">|</span>
                        <a href="/cdn/mitarbeiter/login/">
                            <i className="fas fa-sign-out-alt mr1"></i> abmelden
                        </a>
                    </div>
                )}
                
                {!props.loggedIn && (
                    <div className="tr mr3">
                        <a href="/cdn/mitarbeiter/login/">
                            <i className="fas fa-sign-in-alt mr1"></i> anmelden
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
};

export default Footer;