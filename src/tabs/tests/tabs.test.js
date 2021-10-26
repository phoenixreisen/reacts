/**
 * @jest-environment jsdom
 */
 import {render, fireEvent, waitFor, screen} from '@testing-library/react';
 import renderer from 'react-test-renderer';
 import Tabs from '../tabs.r';
 import React from 'react';

 describe('Tabs should', () => {

     test('render correctly', () => {
         const component = renderer.create(
             <Tabs tabs={['Tab I', 'Tab II']}>
                 <div>Tab I</div>
                 <div>Tab II</div>
             </Tabs>
         );
         const snap = component.toJSON();
         expect(snap).toMatchSnapshot();
     });

     test('render single tab not as link', () => {
        const component = renderer.create(
            <Tabs tabs={['One & Only']}>
                <div>One & Only</div>
            </Tabs>
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
     });

     test('check that amount of tabs and contents is equal', () => {
        let error = false;
        try {
            const component = render.create(
                <Tabs tabs={['Tab I']}>
                    <div>Tab I</div>
                    <div>Tab II</div>
                </Tabs>
            );
        } catch(e) {
            error = true;
        }
        expect(error).toBe(true);
     });

     test('change on click', () => {
        let active = null;
        let inactive = null;

        const component = render(
            <Tabs tabs={['Tab I', 'Tab II']}>
                <div>Tab Content 1</div>
                <div>Tab Content 2</div>
            </Tabs>
        );
        active = document.querySelector('.is-visible-tab');
        inactive = document.querySelector('.is-hidden-tab');
        expect(active?.innerHTML.includes('Tab Content 1')).toBeTruthy();
        expect(inactive?.innerHTML.includes('Tab Content 2')).toBeTruthy();
        fireEvent.click(screen.getByText('Tab II'));
        active = document.querySelector('.is-visible-tab');
        inactive = document.querySelector('.is-hidden-tab')
        expect(active?.innerHTML.includes('Tab Content 2')).toBeTruthy();
        expect(inactive?.innerHTML.includes('Tab Content 1')).toBeTruthy();
        fireEvent.click(screen.getByText('Tab I'))
        active = document.querySelector('.is-visible-tab');
        inactive = document.querySelector('.is-hidden-tab')
        expect(active?.innerHTML.includes('Tab Content 1')).toBeTruthy();
        expect(inactive?.innerHTML.includes('Tab Content 2')).toBeTruthy();
    });
 });