/**
 * @jest-environment jsdom
 */
 import { render, fireEvent, waitFor, screen } from '@testing-library/react';
 import renderer from 'react-test-renderer';
 import Footer from '../footer.intern.r';
 import React from 'react';

 describe('footer should', () => {

    test('render correctly when logged out', () => {
        const component = renderer.create(
            <Footer loggedIn={false} />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render correctly when logged in', () => {
        const component = renderer.create(
            <Footer
                loggedIn={true}
                username='Fabian'
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });
 });