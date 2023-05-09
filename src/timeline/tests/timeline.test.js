import renderer from 'react-test-renderer';
import TimeLine from '../timeline.r';
import React from "react";

test('Timeline should render left line', () => {
    const component = renderer.create(
        <TimeLine line={'constantly'} position={'left'}>
            <div><strong>Tab I</strong></div>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
        </TimeLine>
    );
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});

test('Timeline should render centered line', () => {
    const component = renderer.create(
        <TimeLine line={'separated'} position={'center'}>
            <div><strong>Tab II</strong></div>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
        </TimeLine>
    );
    const snap = component.toJSON();
    expect(snap).toMatchSnapshot();
});