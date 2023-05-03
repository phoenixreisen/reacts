import React from 'react';
import Tooltip from '..';

//--- React Demo Component -----

export const Content = () => {
    return (
        <article className="pa3 gray6 c-gray1" >
            <div className="f6 ma0 mb2">
                <i className="fas fa-home mr2"></i>
                Tooltip mit Überschrift
            </div>
            <p>
                Hier etwas mehr Text. Hier etwas mehr Text. Hier etwas mehr Text.<br />
                Hier etwas mehr Text. Hier etwas mehr Text. Hier etwas mehr Text. 
            </p>
            <div>
                <a href="https://www.phoenixreisen.com">
                    Zu Phoenix Reisen
                </a>
            </div>
        </article>
    );
};

//--- Tooltip Component in several variations -----

export const Demo = () => {
    return (
        <div className="pa4 tc">
            <div className="ma3">
                <Tooltip 
                    event="click"
                    position="right"
                    type='component'
                    TipComponent={
                        <Content />
                    }
                    TextComponent={
                        <i className="fas fa-info-circle c-warning"></i>
                    }
                />
            </div>
            <div className="ma3">
                    <Tooltip 
                        position="left"
                        TextComponent={
                            <span>Hover mich!</span>
                        }
                        TipComponent={
                            <span className="alert alert--success">
                                Ich bin der 1. Tooltip
                            </span>
                        }
                    />
                </div>
                <div className="ma3">
                    <Tooltip 
                        position="right"
                        TextComponent={
                            <span>Hover mich auch!</span>
                        }
                        TipComponent={
                            <span className="alert alert--danger">
                                Ich bin der 2. Tooltip
                            </span>
                        }
                    />
                </div>
                <div className="ma3">
                    <Tooltip 
                        position="below"
                        TextComponent={
                            <span>Mich auch hovern!</span>
                        }
                        TipComponent={
                            <span className="alert alert--info">
                                Ich bin der 3. Tooltip
                            </span>
                        }
                    />
                </div>
                <div className="ma3">
                    <Tooltip 
                        position="above"
                        TextComponent={
                            <span>
                                <i className="fas fa-exclamation-triangle mr2"></i>
                                Hover mich endlich auch!
                            </span>
                        }
                        TipComponent={
                            <span className="alert alert--warning">
                                Ich bin der 4. Tooltip!
                            </span>
                        }
                    />
                </div>
                <div className="ma3">
                    <Tooltip 
                        event="click"
                        position="below"
                        type="component"
                        TipComponent={
                            <Content />
                        }
                        TextComponent={
                            <span>
                                Ich rendere eine Komponente bei Klick
                                <i className="fas fa-info-circle ml2"></i>
                            </span>
                        }
                    />
                </div>
        </div>
    );
};