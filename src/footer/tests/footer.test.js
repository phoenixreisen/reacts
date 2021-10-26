/**
 * @jest-environment jsdom
 */
 import {render, fireEvent, waitFor, screen} from '@testing-library/react';
 import renderer from 'react-test-renderer';
 import Footer from '../footer.r';
 import React from 'react';

 describe('footer should', () => {

    test('render correctly without params', () => {
        const component = renderer.create(
            <Footer />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render correctly with params', () => {
        const component = renderer.create(
            <Footer
                headline="Custom Footer Headline"
                urls={{
                    FACEBOOK: 'https://facebook.com',
                    PHXWEBSITE: 'https://meinereise.phoenixreisen.com'
                }}
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });
 });