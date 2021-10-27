/**
 * @jest-environment jsdom
 */
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import Accordion, { getMaxHeight } from '../accordion.r';
import renderer from 'react-test-renderer';
import React from 'react';

//--- Assignments -----

const items = [{
    fas: 'fa-user-1',
    type: 'primary',
    headline: 'Headline 1',
    content: <div>Hallo 1</div>
}, {
    fas: 'fa-user-2',
    type: 'secondary',
    headline: 'Headline 2',
    content: <div>Hallo 2</div>
}, {
    fas: 'fa-user-3',
    type: 'secondary',
    headline: 'Headline 3',
    content: <div>Hallo 3</div>
}];

const openClass = '.acc-open-item';

//--- Tests -----

describe('Akkordion should', () => {

    test('render correctly', () => {
        const component = renderer.create(
            <Accordion jumpMinus={50} key="acc" items={items} />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('toggle on click', () => {
        const element = '#acc-item-0 > a';
        const component = render(<Accordion key="acc-2" items={items} />);
        expect(document.querySelector(openClass)).toBeNull();
        fireEvent.click(document.querySelector(element));
        expect(document.querySelector(openClass)).not.toBeNull();
        fireEvent.click(document.querySelector(element));
        expect(document.querySelector(openClass)).toBeNull();
    });

    test('differentiate Primaries & Secondaries', () => {
        const prime = '#acc-item-0 > a';
        const sec = '#acc-item-1 > a';
        const component = render(<Accordion key="acc-3" items={items} />);
        expect(document.querySelector(openClass)).toBeNull();
        fireEvent.click(document.querySelector(prime));
        fireEvent.click(document.querySelector(sec));
        expect(document.querySelectorAll(openClass).length).toBe(2);
        fireEvent.click(document.querySelector(sec));
        expect(document.querySelectorAll(openClass).length).toBe(1);
        fireEvent.click(document.querySelector(prime));
        expect(document.querySelectorAll(openClass).length).toBe(0);
    });

    test('close when user click another of same type', () => {
        const sec1 = '#acc-item-1 > a';
        const sec2 = '#acc-item-2 > a';
        const component = render(<Accordion key="acc-4" items={items} />);
        expect(document.querySelector(openClass)).toBeNull();
        fireEvent.click(document.querySelector(sec1));
        expect(document.querySelectorAll(openClass).length).toBe(1);
        fireEvent.click(document.querySelector(sec2));
        expect(document.querySelectorAll(openClass).length).toBe(1);
    });

    test('calc max-height for content container correctly', () => {
        const $container = document.createElement('div');
        $container.style.height = '800px';
        $container.style.padding = '10px';  // x2 wg. top+bottom
        $container.style.margin = '10px';   // x2 wg. top+bottom
        expect(getMaxHeight($container)).toBe(840);
    });
});