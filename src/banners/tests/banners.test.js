/**
 * @jest-environment jsdom
 */
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import ShareBanner from '../share.r';
import LinkBanner from '../link.r';
import React from 'react';

describe('Link Banner should', () => {

    test('render correctly', () => {
        const component = renderer.create(
            <LinkBanner
                text="Hallo"
                key="linkbanner"
                urltext="Phoenix Reisen"
                url="https://www.phoenixreisen.com"
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('throw error without params', () => {
        const out = console.error;
        console.error = () => {};

        let error = null;
        let error2 = null;

        // Without params at all
        try { render(<LinkBanner />); }
        catch(e) { error = e; }

        // Just without "text" param
        try { renderer.create(<LinkBanner url="url" urltext="text" />); }
        catch(e) { error2 = e; }

        expect(error).not.toBeNull();
        expect(error2).toBeNull();
        console.error = out;
    });
});

describe('Share Banner should', () => {

    test('render correctly without params', () => {
        const component = renderer.create(<ShareBanner />);
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('use given params correctly', () => {
        const component = renderer.create(
            <ShareBanner
                appname="Phoenix Reisen"
                mailsubject="Mail Subject"
                headline="Sie finden uns auch auf"
                urltext="Tolle Reisen mit dem Schiff"
                hashtags="Phoenix, Reisen, Kreuzfahrten"
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('be with background by default', () => {
        const component = render(<ShareBanner />);
        expect(document.querySelector('.share-banner--bg-less')).toBeNull();
    });
    test('be backgroundless when `noBackground` is `true`', () => {
        const component = render(<ShareBanner noBackground={true} />);
        expect(document.querySelector('.share-banner--bg-less')).not.toBeNull();
    });

    test('toggle clipboard icon on click', () => {
        const component = render(<ShareBanner />);

        expect(document.querySelector('.share-clipboard')).not.toBeNull();
        expect(document.querySelector('.fa-clipboard-check')).toBeNull();
        expect(document.querySelector('.share-clipboard--clipped')).toBeNull();

        fireEvent.click(document.querySelector('.share-clipboard'));
        expect(document.querySelector('.fa-clipboard-check')).not.toBeNull();
        expect(document.querySelector('.share-clipboard--clipped')).not.toBeNull();
    });
});