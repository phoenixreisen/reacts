//--- Types -----

export interface NoteObject {
    status?: STATUS,
    text: string
}

export interface NoteProps {
    status?: STATUS,
    toggle: () => void,
    text: string
}


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
    normal = 'normal',
    success = 'success',
}


//--- Variablen & Konstanten -----

// Zeit, bis die Meldung wieder ausgeblendet wird
// mit 100ms extra zur CSS Transition
export const SHOWTIMER = 8100;

// Die Liste aller auszugebenden Notification-Objekte
export const notes = new Set<NoteObject>();

// Liste von callback Funktionen, die bei einer neuen
// oder gelöschten Notification nacheinander aufgerufen werden.
export const onNoteListChange = new Set<() => void>();

// Neue Notification hinzufügen oder löschen.
export const notify = (note?: NoteObject, type: 'add'|'del'= 'add') => {
    if(note) {
        type === 'add' && notes.add(note);
        type === 'del' && notes.delete(note);
    }
    for(const callback of Array.from(onNoteListChange)) {
        callback();
    }
}

// Wrapper-Funktion für obigen Aufruf zum löschen einer Notification.
export const unnote = (note: NoteObject) => {
    notify(note, 'del');
}