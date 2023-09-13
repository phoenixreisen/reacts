import React, { useEffect } from 'react';
import striptags from 'striptags';

//--- Types -----

interface Webtexts {
    [key: string]: string
}

interface Props {
    cssClass?: string,
    webtexts: Webtexts,
    webtextName: string,
    asPlainText?: boolean,
    showWebtextName?: boolean,
    allowedHtmlTags?: Array<string>,
    wtmLinkTitle?: string,
    wtmLink?: string,
}

//--- Variables & Constants -----

/**
 * Allowed HTML tags within a webtext.
 */
export const ALLOWED_HTML = [
    'a', 'i', 'b', 'small', 'smaller', 'strong', 'em',
    'div', 'p', 'article', 'section', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'br', 'span',
];

//--- Component -----

export const Webtext = (props: Props) => {
    const { webtexts, webtextName } = props;
    const { cssClass, wtmLink, wtmLinkTitle } = props;
    const { allowedHtmlTags, showWebtextName, asPlainText } = props;

    useEffect(() => {
        if(props.cssClass && typeof props.cssClass !== 'string') {
            throw new Error('You have to set prop "cssClass" with a string or to not set it at all.');
        } else if(typeof props.webtexts !== 'object' || Object.keys(props.webtexts).length === 0) {
            throw new Error('You have to set prop "webtexts" with an object of key-string-pairs.');
        } else if(typeof props.webtextName !== 'string') {
            throw new Error('No webtext given. You have to set prop "webtextName" with a string.');
        } else if(typeof props.asPlainText !== 'undefined' && typeof props.asPlainText !== 'boolean') {
            throw new Error('You have to set prop "asPlainText" with a boolean or to not set it at all.');
        } else if(typeof props.showWebtextName !== 'undefined' && typeof props.showWebtextName !== 'boolean') {
            throw new Error('You have to set prop "showWebtextName" with a boolean or to not set it at all.');
        } else if(props.allowedHtmlTags && !Array.isArray(props.allowedHtmlTags)) {
            throw new Error('You have to set prop "allowedTags" with an array of strings.')
        }
    }, []);

    const webtext = webtexts[webtextName] || null;
        
    const title = (!!webtextName && showWebtextName)
        ? webtextName 
        : undefined;

    if(!webtext) {
        return null;
    } else {
        return (
            <article title={title} className={`webtext ${cssClass || ''}`}>
                {(showWebtextName && wtmLink) && (
                    <div className="f6">
                        <a href={wtmLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title={wtmLinkTitle || 'Im Webtext-Manager öffnen'}>
                            <i className="fas fa-external-link-alt" /> Webtext ändern
                        </a>
                    </div>
                )}
                {asPlainText
                    ? <div>{webtext}</div>
                    : <div dangerouslySetInnerHTML={{__html: striptags(webtext, allowedHtmlTags || ALLOWED_HTML)}} />
                }
            </article>
        );
    }
};

export default Webtext;