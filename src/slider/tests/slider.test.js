/**
 * @jest-environment jsdom
 */
import {render, fireEvent, waitFor, screen, getByText} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Slider from '../slider.r';
import React from 'react';

describe('Slider should', () => {

    const Slide = () => (
        <div className="slide">
            Slide Content
        </div>
    );

    test('render correctly', () => {
        const page = (
            <div>
                <Slider>
                    <Slide />
                    <Slide />
                    <Slide />
                </Slider>
            </div>
        );
        const slides = renderer.create(page);
        const snap = slides.toJSON();
        expect(snap).toMatchSnapshot();
    });
});