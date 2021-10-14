import renderer from 'react-test-renderer';
import Loader from '../loader.r';
import React from "react";

test('Loader should have some default classes & default text + icon', () => {
    const component = renderer.create(<Loader />);
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});

test('Loader should show customized text & icon', () => {
    const component = renderer.create(
        <Loader text="WORK HARD, PLAY HARD" iconname="fas fa-blabla" />
    );
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});

test('Loader should set an overlay class', () => {
    const component = renderer.create(
        <Loader text="ICH BIN EIN OVERLAY" iconname="fa-blublu" type="overlay" />
    );
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});