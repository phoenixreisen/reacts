import { notes } from '../notification/notification.settings';
import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';

//--- Types ------

interface Props {
    url: string,
    appname: string,
    urltext: string,
    headline: string,
    hashtags: string,
    mailsubject: string,
    noBackground: boolean
}

//--- Component -----

export const Sharebanner = (props:Props) => {
    const url = props.url || location.href;
    const {headline, appname, urltext, mailsubject, hashtags} = props;
    const [showClipboardMsg, setShowClipboardMsg] = useState<boolean>(false);

    function saveToClipboard() {
        setShowClipboardMsg(true);
        setTimeout(() => setShowClipboardMsg(false), 2500);
        notes([...notes(), {text: 'In die Zwischenablage kopiert.'}]);
    }

    useEffect(() => {
        new ClipboardJS('.share-clipboard');
    }, []);

    return (
        <article className={`share-banner ${props.noBackground ? 'share-banner--bg-less':''}`}>
            <div className="wrapper wrapper--large">
                <div className="tc">
                    <h3 className="tc pt0">{headline || 'Gerne weitersagen...'}</h3>
                </div>
                <div className="tc share-icons">
                    <a href={`mailto:?subject=${mailsubject || 'tolle Empfehlung'}&body=${urltext || ''}: ${url}`}
                        title={`${appname || ''} per Email empfehlen`} className="share-email">
                        <i className="fas fa-envelope"></i>
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${urltext || ''}: ${url}`}
                        title={`${appname || ''} per WhatsApp empfehlen`} className="share-whatsapp">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?text=${urltext || ''}&url=${url}&hashtags=${hashtags}`}
                        title={`${appname || ''} twittern`} className="share-twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        title={`${appname || ''} per Facebook empfehlen`} className="share-facebook"
                        rel="noopener noreferrer" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className={`share-clipboard share-clipboard${showClipboardMsg ? '--clipped':''}`}
                        onClick={(e) => { e.preventDefault(); saveToClipboard(); }}
                        data-clipboard-text={`${urltext || ''}: ${url}`}
                        title="in die Zwischenablage kopieren">
                        <i className={`fas fa-clipboard${showClipboardMsg ? '-check':''}`}></i>
                    </a>
                </div>
            </div>
        </article>
    );
};

export default Sharebanner;