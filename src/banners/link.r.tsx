import React, { useEffect } from 'react';

//--- Types -----

interface Props {
    text: string,
    url: string,
    urltext: string
}

//--- Component -----

export const Linkbanner = (props:Props) => {

    useEffect(() => {
        if(!props.url || !props.urltext) {
            throw 'Need at least "url" and "urltext" as parameter. See Readme.';
        }
    }, [props.url, props.urltext]);

    return(
        <article className="link-banner mv5">
            <div className="link-banner__textbox">
                {props.text &&
                    <p>{props.text}</p>
                }
                <p className="pb0">
                    <a href={props.url}>
                        <i className="fas fa-angle-right"></i> {props.urltext}
                    </a>
                </p>
            </div>
        </article>
    );
};

export default Linkbanner;