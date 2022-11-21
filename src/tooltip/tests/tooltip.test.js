/**
 * @jest-environment jsdom
 */
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Content } from '../docs/demo'; 
import Tooltip from '../tooltip';
import React from "react";

describe('Tooltip should', () => {
    test('have some default classes', () => {
        const component = renderer.create(
            <Tooltip text='Tooltip' tooltip='Hinweis!' />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render text with icon', () => {
        const component = renderer.create(
            <Tooltip text="How to live?!" iconname="fas fa-blabla" tooltip="WORK HARD, PLAY HARD" />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('also render React Components as tooltip', () => {
        const component = renderer.create(
            <Tooltip text="Ich bin ein Tooltip" TipComponent={<Content />} />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render positions', () => {
        const component = renderer.create(
            <React.Fragment>
                <Tooltip text='Tooltip' tooltip='Hinweis left!' position='left' />
                <Tooltip text='Tooltip' tooltip='Hinweis rechts!' position='right' />
                <Tooltip text='Tooltip' tooltip='Hinweis drunter!' position='below' />
                <Tooltip text='Tooltip' tooltip='Hinweis drüber!' position='above' />
            </React.Fragment>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render colors', () => {
        const component = renderer.create(
            <React.Fragment>
                <Tooltip text='Tooltip' tooltip='Hinweis grüm!' color='danger' />
                <Tooltip text='Tooltip' tooltip='Hinweis grüm!' color='success' />
                <Tooltip text='Tooltip' tooltip='Hinweis grüm!' color='warning' />
                <Tooltip text='Tooltip' tooltip='Hinweis grüm!' color='info' />
            </React.Fragment>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('also handle on click instead of hover', () => {
        const component = renderer.create(
            <React.Fragment>
                <Tooltip text='Tooltip' tooltip='Hinweis grüm!' event='click' />
                <Tooltip text='Tooltip' TipComponent={<Content />} event='click' />
            </React.Fragment>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('change visibility class on mouse over/leave', () => {
        const component = render(
            <Tooltip key="1" text='Tooltip' tooltip='Hinweis!' />
        );

        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
        fireEvent.mouseEnter(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') !== null).toBeTruthy();
        fireEvent.mouseLeave(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
    });

    test('change visibility class on click', () => {
        const component = render(
            <Tooltip key="2" text='Tooltip' tooltip='Hinweis!' event="click" />
        );

        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
        fireEvent.click(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') !== null).toBeTruthy();
        fireEvent.click(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
    });
});