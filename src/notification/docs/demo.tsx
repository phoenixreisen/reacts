import { notes, STATUS } from '../notification.settings';
import Notifications from '../notifications.r';
import { Link } from 'react-router-dom';
import React from 'react';

//--- Variablen, Nodes & Konstanten -----

const msg = (status: STATUS) => {
    return notes([...notes(), {
        text: 'Gut geklickt, Brudi!',
        status: status
    }]);
};

//--- Komponente -----

export const Demo = () => {
    return (
        <div className="notification-demo">
            <div className="box">
                <div className="pa3 ma2">
                    <Link to="#" onClick={(e) => { e.preventDefault(); msg(STATUS.normal); }}
                        className="btn btn--primary-dark" title=" aufrufen">
                        Klick mich für Standard!
                    </Link>
                </div>
                <hr />
                <div className="pa3 ma2">
                    <Link to="#" onClick={(e) => { e.preventDefault(); msg(STATUS.success); }}
                        className="btn btn--success" title=" aufrufen">
                        Klick mich für Erfolg!
                    </Link>
                </div>
                <hr />
                <div className="pa3 ma2">
                    <Link to="#" onClick={(e) => { e.preventDefault(); msg(STATUS.error); }}
                        className="btn btn--danger" title=" aufrufen">
                        Klick mich für Fehler!
                    </Link>
                </div>
                <hr />
            </div>

            <Notifications />
        </div>
    );
};

export default Demo;