import { NoteObject, notes } from './notification.settings';
import React, { useEffect, useState } from 'react';
import { Notification } from './notification.r';

//--- Ausgabe aller Notifications -----

export const Notifications = () => {
    const [rerender, setRerender] = useState<number>(0);

    useEffect(() => {
        notes.map(() => setRerender(notes().length));
    }, [rerender]);

    return (
        <React.Fragment>
            {notes().map?.((note:NoteObject, index:number) =>
                <Notification
                    key={index}
                    text={note.text}
                    status={note.status}
                    toggle={() => notes(notes().filter(current => current !== note))}
                />,
            )}
        </React.Fragment>
    );
};

export default Notifications;