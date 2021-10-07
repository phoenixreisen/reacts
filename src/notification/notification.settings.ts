import stream from 'mithril/stream';

//--- Types -----

export interface NoteObject {
    status?: STATUS,
    text: string | Element | JSX.Element | React.Component
}

export interface NoteProps {
    status?: STATUS,
    toggle: () => void,
    text: string | Element | JSX.Element | React.Component
}


//--- Variablen & Konstanten -----

// Zeit, bis die Meldung wieder ausgeblendet wird
// mit 100ms extra zur CSS Transition
export const SHOWTIMER = 8100;

// Die Liste aller auszugebenden Notification-Objekte
export const notes = stream<Array<NoteObject>>([]);


//--- Enums -----

// Namen der FontAwesome Icons für versch. Stati
export const enum ICONS {
    check = 'check',
    info = 'info-circle',
    triangle = 'exclamation-triangle',
}

// Mögliche Stati
export const enum STATUS {
    error = 'error',
    success = 'success',
}