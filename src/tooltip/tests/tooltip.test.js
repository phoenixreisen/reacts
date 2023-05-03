/**
 * @jest-environment jsdom
 */
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Content } from '../docs/demo'; 
import Tooltip from '../tooltip.r';
import React from "react";

describe('Tooltip should', () => {
    test('have some default classes', () => {
        const component = renderer.create(
            <Tooltip TextComponent='Tooltip' TipComponent='Hinweis!' />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render text with icon', () => {
        const component = renderer.create(
            <Tooltip 
                TextComponent={
                    <div><i className="fas fa-blabla"></i> How to live?!</div>
                } 
                TipComponent="WORK HARD, PLAY HARD" 
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('also render React Components as tooltip', () => {
        const component = renderer.create(
            <Tooltip TextComponent="Ich bin ein Tooltip" TipComponent={<Content />} />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render positions', () => {
        const component = renderer.create(
            <React.Fragment>
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis left!' position='left' />
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis rechts!' position='right' />
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis drunter!' position='below' />
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis drüber!' position='above' />
            </React.Fragment>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('render colors', () => {
        const component = renderer.create(
            <React.Fragment>
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis grüm!' color='danger' />
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis grüm!' color='success' />
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis grüm!' color='warning' />
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis grüm!' color='info' />
            </React.Fragment>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('also handle on click instead of hover', () => {
        const component = renderer.create(
            <React.Fragment>
                <Tooltip TextComponent='Tooltip' TipComponent='Hinweis grün!' event='click' />
                <Tooltip TextComponent='Tooltip' TipComponent={<Content />} event='click' />
            </React.Fragment>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('change visibility class on mouse over/leave', () => {
        const component = render(
            <Tooltip key="1" TextComponent='Tooltip' TipComponent='Hinweis!' />
        );

        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
        fireEvent.mouseEnter(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') !== null).toBeTruthy();
        fireEvent.mouseLeave(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
    });

    test('change visibility class on click', () => {
        const component = render(
            <Tooltip key="2" TextComponent='Tooltip' TipComponent='Hinweis!' event="click" />
        );

        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
        fireEvent.click(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') !== null).toBeTruthy();
        fireEvent.click(document.querySelector('.tooltip'));
        expect(document.querySelector('.tip--visible') === null).toBeTruthy();
    });
});