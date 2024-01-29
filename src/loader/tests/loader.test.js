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

test('Loader should show Phoenix Ship Gif instead of Cuttlefish Icon as loading icon', () => {
    const component = renderer.create(
        <Loader text="ICH ZEIGE DAS PHOENIX SCHIFF GIF" showGif={true} />
    );
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});

test('Loader should just show the icon without text', () => {
    const component = renderer.create(
        <Loader text="ICH WERDE NICHT AUSGEGEBEN" noText={true} showGif={false} />
    );
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});

test('Loader should just show the icon without text but with Gif', () => {
    const component = renderer.create(
        <Loader text="ICH WERDE NICHT AUSGEGEBEN" noText={true} showGif={true} />
    );
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});