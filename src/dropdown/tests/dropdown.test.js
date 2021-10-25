/**
 * @jest-environment jsdom
 */
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Dropdown from '../dropdown.r';
import React from 'react';

describe('Dropdown should', () => {

    test('render correctly', () => {
        const component = renderer.create(
            <Dropdown title="Awesome Dropdown" icon="fa-user">
                <div>Element 1</div>
                <div>Element 2</div>
                <div>Element 3</div>
            </Dropdown>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('contain all given children', () => {
        const component = render(
            <Dropdown>
                <div>Element</div>
                <div>Element</div>
                <div>Element</div>
                <div>Element</div>
            </Dropdown>
        );
        expect(component.getAllByText('Element')).toHaveLength(4);
    });

    test('toggle open status correctly', () => {
        const component = render(
            <Dropdown title="Awesome Dropdown">
                <div>Element</div>
            </Dropdown>
        );
        expect(document.querySelector('.dropdown--open')).toBeNull();
        fireEvent.click(component.getByText('Awesome Dropdown'));
        expect(document.querySelector('.dropdown--open')).not.toBeNull();
    });

    test('toggle open status on esc', () => {
        const component = render(
            <Dropdown title="Dropdown">
                <div>Element</div>
            </Dropdown>
        );
        expect(document.querySelector('.dropdown--open')).toBeNull();
        fireEvent.click(component.getByText('Dropdown'));
        expect(document.querySelector('.dropdown--open')).not.toBeNull();
        fireEvent.keyDown(component.getByText('Dropdown'), {keyCode: 27, key: 'Escape'});
        expect(document.querySelector('.dropdown--open')).toBeNull();
    });
});