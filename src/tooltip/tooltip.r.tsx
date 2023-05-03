import React, { useState } from 'react';

//--- Types -----

export interface Props {
    event?: 'hover' | 'click',
    type?: 'component' | 'text',
    position?: 'above' | 'right' | 'below' | 'left',
    TipComponent: React.ReactNode,
    TextComponent: React.ReactNode,
}

//--- Component -----

export const Tooltip = (props: Props) => {
    const [ showTip, setShowTip ] = useState(false);

    const { position, event, type } = props;
    const { TextComponent, TipComponent } = props;
    
    try {
        if(!TextComponent) {
            throw new Error('No text given. You have to set prop "TextComponent" with a React component.');
        } else if(!TipComponent) {
            throw new Error('No tooltip given. You have to set prop "TipComponent" with a React component.');
        }
        return (
            <article className={`tooltip ${event === 'click' ? 'tooltip--click':''}`} 
                onClick={ event === 'click' ? () => setShowTip(!showTip) : undefined }
                onMouseEnter={ !event || event === 'hover' ? () => setShowTip(true) : undefined }
                onMouseLeave={ !event || event === 'hover' ? () => setShowTip(false) : undefined }
            >
                <span className={'tooltip-text'}>{ TextComponent }</span>
                <span className={`tip ${type === 'component' ? 'tip--component':''} ${!!position ? `tip--${position}`:'tip--below'} ${showTip ? 'tip--visible':'tip--hidden'}`}>
                    { TipComponent }
                </span>
            </article>
        );
    } catch(e) {
        console.error(e);
        return (
            <span className="dib alert alert--danger alert--icon">
                <i className="fas fa-exclamation-triangle"></i>
                FEHLER BEIM RENDERN!<br />
                Siehe Konsole...
            </span>
        );
    }
};

export default Tooltip;