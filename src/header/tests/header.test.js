/**
 * @jest-environment jsdom
 */
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Header from '../header.r';
import React from 'react';
import fs from 'fs';

//--- Global Scope Stuff -----

delete window.location;

window.location = {
    pathname: '/',
    protocol: 'http',
    host: 'www.phoenixreisen.com'
};

//--- Tests -----

describe('Header should', () => {

    test('render correctly without params', () => {
        const component = renderer.create(
            <Header />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('show version when given', () => {
        const component = renderer.create(
            <Header version="1.0.0" />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('use given params correctly', () => {
        const component = renderer.create(
            <Header
                url="https://www.test.url.com"
                toggleNav={() => console.log('toggle nav')}
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('have logo & favicon files in folder', () => {
        expect(fs.existsSync(`${__dirname}/../favicon.png`)).toBe(true);
        expect(fs.existsSync(`${__dirname}/../phx.logo.svg`)).toBe(true);
    });
 });