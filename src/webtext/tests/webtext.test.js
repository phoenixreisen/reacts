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
        expect(document.querySelector('.webtext').innerHTML).toBe(`<div>${stripped}</div>`);
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

    test('add a icon linked to webtext manager as suffix', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
                showWebtextName={true}
                wtmLink='https://www.phoenixreisen.com'
                wtmLinkTitle='Phoenix Reisen Website aufrufen'
            />
        );
        expect(document.querySelector('.webtext a')).toBeDefined();
        expect(document.querySelector('.fa-external-link-alt')).toBeDefined();
        expect(document.querySelector('.webtext a').getAttribute('href')).toBe('https://www.phoenixreisen.com');
        expect(document.querySelector('.webtext a').getAttribute('title')).toBe('Phoenix Reisen Website aufrufen');
    });

    test('show webtextName in wtmLink title', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
                showWebtextName={true}
                wtmLink='https://www.phoenixreisen.com'
            />
        );
        expect(document.querySelector('.webtext a').getAttribute('title')).toBe('webtext3 im Webtext-Manager öffnen');
    });

    test('only show WTM link when showWebtextName is set', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext3'
                showWebtextName={false}
                wtmLink='https://www.phoenixreisen.com'
                wtmLinkTitle='Phoenix Reisen Website aufrufen'
            />
        );
        expect(document.querySelector('.webtext a')).toBeNull();
        expect(document.querySelector('.fa-external-link-alt')).toBeNull();
    });

    test('show alternative text if one is given but no webtext is found', () => {
        const altText = 'Alternative Text';

        const component = render(
            <Webtext
                altText={altText}
                webtexts={Webtexts}
                showWebtextName={false}
                webtextName='not-existent'
            />
        );
        expect(document.querySelector('.webtext')).toBeDefined();
        expect(document.querySelector('.webtext').textContent).toBe(altText);
        expect(document.querySelector('.webtext').textContent).not.toBe('Irgendwas');
    });

    test('replace placeholders with given values', () => {
        const component = render(
            <Webtext
                webtexts={Webtexts}
                webtextName='webtext6'
                placeholders={[
                    ['{{anzahl}}', '2'],
                    ['{{name}}', 'Fabian'],
                    ['{{eigenschaft}}', 'lieben'],
                ]}
            />
        );
        expect(document.querySelector('.webtext')).toBeDefined();
        expect(document.querySelector('.webtext').textContent).toContain('2');
        expect(document.querySelector('.webtext').textContent).toContain('Fabian');
        expect(document.querySelector('.webtext').textContent).toContain('lieben');
        expect(document.querySelector('.webtext').textContent).not.toContain('{{name}}');
        expect(document.querySelector('.webtext').textContent).not.toContain('{{anzahl}}');
        expect(document.querySelector('.webtext').textContent).not.toContain('{{eigenschaft}}');
    });

    test('render markdown correctly', async () => {
        const component = renderer.create(
            <Webtext
                asMarkdown={true}
                webtexts={Webtexts}
                webtextName='webtext7'
            />
        );
        await waitFor(() => expect(document.querySelector('h2')).toBeDefined());
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('replace placeholders with given values', () => {
        const component = render(
            <Webtext
                asMarkdown={true}
                webtexts={Webtexts}
                webtextName='webtext7'
            />
        );
        expect(document.querySelector('.webtext')).toBeDefined();
        expect(document.querySelector('.webtext').innerHTML).toContain('<a href=');
        expect(document.querySelector('.webtext').innerHTML).toContain('<h2>');
        expect(document.querySelector('.webtext').innerHTML).toContain('<h3>');
        expect(document.querySelector('.webtext').innerHTML).toContain('<em>');
        expect(document.querySelector('.webtext').innerHTML).toContain('<ul>');
        expect(document.querySelector('.webtext').innerHTML).toContain('<li>');
        expect(document.querySelector('.webtext').innerHTML).toContain('<strong>');
        expect(document.querySelector('.webtext').innerHTML).toContain('Markdown Überschrift');
        expect(document.querySelector('.webtext').innerHTML).toContain('Hier wieder etwas Text');

        expect(document.querySelector('.webtext').innerHTML).not.toContain('#');
        expect(document.querySelector('.webtext').innerHTML).not.toContain('*');
        expect(document.querySelector('.webtext').innerHTML).not.toContain('==');
        expect(document.querySelector('.webtext').innerHTML).not.toContain(':-)');
    });

});