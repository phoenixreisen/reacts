import React, { useState } from 'react';

//--- Types -----

export type ItemType = 'primary'|'secondary';

export type Item = {
    fas: string,
    type: ItemType,
    content: React.ReactNode,
    headline: React.ReactNode
}

export type Props = {
    items: Array<Item>,
    jumpMinus?: number
}

export type ItemState = {
    itemnr: number,
    maxheight: number
}

//--- Funktionen -----

export function getMaxHeight($container: HTMLElement): number {
    if($container) {
        const style = window.getComputedStyle($container);
        const height = parseInt(style.height);
        const margin = parseInt(style.margin);
        const padding = parseInt(style.padding);
        return (height + (2*margin) + (2*padding));
    }
    return 0;
}

export function scrollTo($item: HTMLElement, isOpen: boolean, delay = 500, jumpMinus = 0): void {
    setTimeout(() => {  // scrollt nach der Animation zum angeklickten Element
        const html = document.documentElement;
        const body = document.body;
        if($item && !isOpen) {
            $item.scrollIntoView(true);
            html.scrollTop -= jumpMinus;
            body.scrollTop -= jumpMinus;
        }
    }, delay);
}

//--- Komponente -----

export const Accordion = (props:Props) => {
    const [openPrimary, setOpenPrimary] = useState<ItemState>({ itemnr: -1, maxheight: 0 });
    const [openSecondary, setOpenSecondary] = useState<ItemState>({ itemnr: -1, maxheight: 0 });

    function toggle(props: Props, itemnr: number, type: ItemType) {
        const $item = (document.querySelector(`#acc-item-${itemnr}`) as HTMLElement) ?? null;
        const $section = ($item?.querySelector('.acc-section') as HTMLElement) ?? null;
        const $inner = ($section?.children.item(0) as HTMLElement) ?? null;

        const clicked = (type === 'primary'
            ? {state: openPrimary, set: setOpenPrimary}
            : {state: openSecondary, set: setOpenSecondary}
        );
        const isOpen = (clicked.state.itemnr === itemnr);

        clicked.set({
            itemnr: isOpen ? -1 : itemnr,
            maxheight: getMaxHeight($inner),
        });
        scrollTo($item, isOpen, 500, props.jumpMinus || 0);
    }

    return (
        <section className={'accordion'}>
            {props.items?.map((item:Item, index:number) => {
                const {headline, fas, content, type} = item;
                const isOpen = (index === openPrimary.itemnr || index === openSecondary.itemnr);
                const maxHeight = (type === 'primary' && openPrimary.maxheight)
                    || (type === 'secondary' && openSecondary.maxheight)
                    || 0;

                return (
                    <article key={index} id={`acc-item-${index}`} className={`acc-item ${isOpen ? 'acc-open-item':''} acc-${type}`}>
                        <a href="#" onClick={(e) => { e.preventDefault(); toggle(props, index, type); }}
                            className={`acc-opener ${type === 'secondary' ? 'acc-opener--grayed':''}`}>
                            <span><i className={`fas fa-${fas} mr1`}></i> {headline}</span>
                            <i className={'fas fa-chevron-up ml1'}></i>
                        </a>
                        <div className={'acc-section'} style={{maxHeight: isOpen ? `${maxHeight}px`:'0px'}}>
                            <div className="acc-inner">
                                { content }
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>
    );
};

export default Accordion;