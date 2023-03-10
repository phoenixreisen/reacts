import React, { useState } from 'react';

//--- Types -----

export interface Props {
    text?: string,
    tooltip?: string,
    iconname?: string,
    event?: 'hover' | 'click',
    position?: 'above' | 'right' | 'below' | 'left',
    color?: 'success' | 'danger' | 'warning' | 'info',
    TipComponent?: React.ReactNode,
}

//--- Component -----

export const Tooltip = (props: Props) => {
    const [ showTip, setShowTip ] = useState(false);

    const { text, iconname } = props;           // Displayed base content
    const { tooltip, TipComponent } = props;    // The tooltip on event
    const { position, color, event } = props;   // Styling & behaviour
    
    try {
        if(!text && !iconname) {
            throw new Error('No content to display given. You have to set prop "text" and/or "iconname".');
        } else if(!tooltip && !TipComponent) {
            throw new Error('No tooltip to display given. You have to set prop "tooltip" or "TipComponent".');
        } else if(tooltip && TipComponent) {
            throw new Error('You cannot set both tooltip and TipCompoent.');
        }
        return (
            <article className={`tooltip ${event === 'click' ? 'tooltip--click':''}`} 
                onClick={ event === 'click' ? () => setShowTip(!showTip) : undefined }
                onMouseEnter={ !event || event === 'hover' ? () => setShowTip(true) : undefined }
                onMouseLeave={ !event || event === 'hover' ? () => setShowTip(false) : undefined }
            >
                { iconname?.length && <i className={`tooltip-icon fas ${iconname} ${text?.length ? 'mr1':''}`} /> }
                { text?.length && <span className={'tooltip-text'}>{ text }</span> }
    
                <span className={`tip ${!!TipComponent ? 'tip--component':''} ${!!position ? `tip--${position}`:'tip--below'} ${showTip ? 'tip--visible':'tip--hidden'}`}>
                    {!!TipComponent && 
                        TipComponent
                    }
                    {!!tooltip && 
                        <span className={color ? `tip--colored ${color}`:''}>
                            { tooltip }
                        </span>
                    }
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