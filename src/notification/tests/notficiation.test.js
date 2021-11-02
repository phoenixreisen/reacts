/**
 * @jest-environment jsdom
 */
import {render, fireEvent, waitFor, screen, getByText} from '@testing-library/react';
import { STATUS, notes } from '../notification.settings';
import Notifications from '../notifications.r';
import Notification from '../notification.r';
import renderer from 'react-test-renderer';
import React from 'react';

describe('Notification should', () => {

    test('render success correctly', () => {
        const state = { show: true };
        const success = renderer.create(
            <Notification
                status={STATUS.success}
                text={'Erfolgreich gespeichert'}
                toggle={() => state.show = false}
            />
        );
        const snap = success.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render info correctly', () => {
        const state = { show: true };
        const success = renderer.create(
            <Notification
                status={STATUS.normal}
                text={'Ich bin ein Bibabutzemann!'}
                toggle={() => state.show = false}
            />
        );
        const snap = success.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render error correctly', () => {
        const state = { show: true };
        const success = renderer.create(
            <Notification
                status={STATUS.error}
                text={'WTF?! Ein Error!'}
                toggle={() => state.show = false}
            />
        );
        const snap = success.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('fail without "text" && "toggle()" parameters', () => {
        const out = console.error;
        console.error = () => {};
        let error = null;
        try {
            renderer.create(<Notification />);
        } catch(e) {
            error = e;
        }
        expect(error).not.toBeNull();
        console.error = out;
    });

    test('render a list of notifications', () => {

        notes().push({ text: "Note 3", status: STATUS.error });
        notes().push({ text: "Note 1", status: STATUS.normal });
        notes().push({ text: "Note 2", status: STATUS.success });

        const comp = render(<Notifications />);

        expect(screen.getByText('Note 1')).not.toBeNull();
        expect(screen.getByText('Note 2')).not.toBeNull();
        expect(screen.getByText('Note 3')).not.toBeNull();
        expect(document.querySelector('.notification--error')).not.toBeNull();
        expect(document.querySelector('.notification--success')).not.toBeNull();
    });
});