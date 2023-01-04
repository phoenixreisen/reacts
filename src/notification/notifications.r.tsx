import { notify, notes, onNoteListChange, NoteObject } from './notification.api';
import React, { useEffect, useState } from 'react';
import Notification from './notification.r';

//--- Ausgabe aller Notifications -----

export const Notifications = () => {
    const [rerender, setRerender] = useState<number>(0);

    useEffect(() => {
        onNoteListChange.add(() => setRerender(notes.size));
    }, [rerender]);

    return (
        <React.Fragment>
            {Array.from(notes).map?.((note:NoteObject, index:number) =>
                <Notification
                    key={index}
                    text={note.text}
                    status={note.status}
                    toggle={() => notify(note, 'del')}
                />,
            )}
        </React.Fragment>
    );
};

export default Notifications;