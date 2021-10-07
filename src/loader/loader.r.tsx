import React from 'react';

//--- Types -----

export interface Props {
    type?: string,
    text?: string,
    iconname?: string
}

//--- Component -----

export const Loader = (props:Props) => {
    const { type, text, iconname } = props;

    if(type && type === 'overlay') {
        return (
            <article className="loader loader--overlay">
                <p className="loader__spinner">
                    <i className={`${iconname || 'fab fa-cuttlefish'} fa-spin`}></i><br />
                    {text || 'Daten werden geladen...'}
                </p>
            </article>
        );
    }
    return (
        <article className="loader">
            <p className="loader__spinner">
                <i className={`${iconname || 'fab fa-cuttlefish'} fa-spin`}></i>
            </p>
            <p className="loader__text">
                {text || 'Daten werden geladen...'}
            </p>
        </article>
    );
};

export default Loader;