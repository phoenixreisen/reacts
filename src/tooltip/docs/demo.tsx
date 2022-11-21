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
                    color="warning"
                    position="right"
                    iconname='fa-info-circle'
                    TipComponent={<Content />}
                />
            </div>
            <div className="ma3">
                <Tooltip 
                    color="success"
                    position="left"
                    text="Hover mich!"
                    tooltip="Ich bin der 1. Tooltip!"
                />
             </div>
            <div className="ma3">
                <Tooltip 
                    color="danger"
                    position="right"
                    text="Hover mich auch!"
                    tooltip="Ich bin der 2. Tooltip!"
                />
            </div>
            <div className="ma3">
                <Tooltip 
                    color="info"
                    position="below"
                    text="Mich auch hovern!"
                    tooltip="Ich bin der 3. Tooltip!"
                />
            </div>
            <div className="ma3">
                <Tooltip 
                    color="warning"
                    position="above"
                    text="Hover mich endlich auch!"
                    tooltip="Ich bin der 4. Tooltip!"
                    iconname='fa-exclamation-triangle'
                />
            </div>
            <div className="ma3">
                <Tooltip 
                    event="click"
                    color="warning"
                    position="below"
                    text="Ich rendere eine Komponente"
                    TipComponent={<Content />}
                />
            </div>
        </div>
    );
};