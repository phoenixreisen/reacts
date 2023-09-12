/**
 * @jest-environment jsdom
 */
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Webtext, { ALLOWED_HTML } from '../webtext.r';
import { Content, Webtexts } from '../docs/demo'; 
import renderer from 'react-test-renderer';
import striptags from 'striptags';
import React from "react";

describe('Webtext should', () => {
    
    test('have some default classes', () => {
        const component = renderer.create(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
                showWebtextName={true}
                cssClass='test-class'
                asPlainText={true}
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('output correct webtext of webtext object', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
            />
        );
        expect(document.querySelector('.webtext').textContent).toContain(Webtexts.webtext3);
    });

    test('show webtext name', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
                showWebtextName={true}
            />
        );
        expect(document.querySelector('.webtext').getAttribute('title')).toBe('webtext3');
    });

    test('hide webtext name', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
                showWebtextName={false}
            />
        );
        expect(document.querySelector('.webtext').getAttribute('title')).toBeFalsy();
    });

    test('render plain text', () => {
        const component = render(
            <Webtext
                asPlainText={true}
                webtexts={Webtexts}
                webtextName='webtext5'
            />
        );
        expect(document.querySelector('.webtext').textContent).toBe(Webtexts.webtext5);
        expect(document.querySelector('.webtext').innerHTML).toContain('&lt;code&gt;');
    });

    test('render html', () => {
        const component = render(
            <Webtext
                asPlainText={false}
                webtexts={Webtexts}
                webtextName='webtext5'
            />
        );
        const stripped = striptags(Webtexts.webtext5, ALLOWED_HTML);
        expect(document.querySelector('.webtext').innerHTML).toContain('<strong>');
        expect(document.querySelector('.webtext').innerHTML).not.toContain('<code>');
        expect(document.querySelector('.webtext').innerHTML).toBe(stripped.trim());
    });

    test('insert given css class', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
                cssClass='test-class'
            />
        );
        expect(document.querySelector('.webtext').classList.contains('test-class')).toBeTruthy();
    });
});