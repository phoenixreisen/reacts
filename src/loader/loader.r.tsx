import ship from './img/ship.gif';
import React from 'react';

//--- Types -----

export interface Props {
    type?: string,
    text?: string,
    iconname?: string,
    showGif?: boolean,
    noText?: boolean,
}

//--- Component -----

export const Loader = (props:Props) => {
    const { type, text, iconname, showGif, noText } = props;

    if(type && type === 'overlay') {
        return (
            <article className="loader loader--overlay">
                <p className="loader__spinner">
                    {/* Entweder ein Bild oder ein großes Spinning-Icon */}
                    {(ship && showGif) 
                        ? <img src={ship} />
                        : <i className={`${iconname || 'fab fa-cuttlefish'} fa-spin`} />
                    }
                    {!noText && (<>
                        {/* Dieses <br> ist wichtig */}
                        <br />
                        {/* Spinning Icon direkt neben dem Text, in Textgröße */}
                        {(ship && showGif) && (
                            <i className={`${iconname || 'fab fa-cuttlefish'} fa-spin mr2`} />
                        )}
                        {text || 'Daten werden geladen...'}
                    </>)}
                </p>
            </article>
        );
    }
    return (
        <article className="loader">
            <p className="loader__spinner">
                {(ship && showGif) 
                    ? <img src={ship} />
                    : <i className={`${iconname || 'fab fa-cuttlefish'} fa-spin`} />
                }
            </p>
            {!noText && (
                <p className="loader__text">
                    {(ship && showGif) && (
                        <i className={`${iconname || 'fab fa-cuttlefish'} fa-spin mr2`} />
                    )}
                    {text || 'Daten werden geladen...'}
                </p>
            )}
        </article>
    );
};

export default Loader;