import React, { Children, useEffect, useState } from 'react';

//--- Types -----

interface Props {
    initTab?: number,
    tabs: Array<string>,
    children: React.ReactNode
}

//--- Komponente -----

export const Tabs = (props:Props) => {
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        setCurrentTab(props.initTab || 0);
    }, [props.initTab]);

    useEffect(() => {
        const children = props.children;
        if (!props.tabs || !children || (props.tabs.length !== Children.count(children))) {
            throw 'amount of tabs and amount of components have to be equal.';
        }
    }, [props.tabs, props.children]);

    return (
        <article className="tabs">
            <div className="tabs__tabs-bar">
                {props.tabs.map((tabname:string, tabnr:number) => {
                    const statusClass = (tabnr === currentTab) ? 'is-active-tab':'is-inactive-tab';
                    return (
                        <a
                            href="#"
                            key={tabname + tabnr}
                            onClick={(e) => { e.preventDefault(); setCurrentTab(tabnr); }}
                            className={`tab tab-${tabnr} ${props.tabs.length > 1 ? 'tab--link':''} ${statusClass}`}>
                            {tabname}
                        </a>
                    );
                })}
            </div>
            <div className="tabs__tabs-content">
                {Children.toArray(props.children).map((content: any, tabnr: number) => {
                    const statusClass = (tabnr === currentTab) ? 'is-visible-tab':'is-hidden-tab';
                    return (
                        <div key={tabnr} className={`tab-content tab-content-${tabnr} ${statusClass}`}>
                            {content}
                        </div>
                    );
                })}
            </div>
        </article>
    );
};

export default Tabs;