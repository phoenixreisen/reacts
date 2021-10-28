/**
 * @jest-environment jsdom
 */
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import modalSizes from '../modal.sizes';
import Modal from '../modal.r';
import React from 'react';

describe('Modal should', () => {

    test('render correctly', () => {
        const state = {
            show: true
        };
        const component = renderer.create(
            <Modal
                key="modal"
                withCloseText={false}
                title={"Awesome Modal"}
                content={<div>Content</div>}
                footer={<div><button>Schließen</button></div>}
                toggle={() => state.show = false}
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('call toggle function', () => {
        const state = {
            show: true
        }
        const component = render(
            <Modal
                key="modal"
                withCloseText={true}
                title={"Awesome Modal"}
                content={<div>Content</div>}
                footer={<div><button>Toggle</button></div>}
                toggle={() => state.show = false}
            />
        );
        expect(screen.getByText('Toggle')).not.toBeNull();
        expect(screen.getByText('Content')).not.toBeNull();
        expect(screen.getByText('schließen')).not.toBeNull();
        expect(screen.getByText('Awesome Modal')).not.toBeNull();

        expect(state.show).toBe(true);
        fireEvent.click(document.querySelector('a.modal__toggle'));
        expect(state.show).toBe(false);
    });

    test('not render without content', () => {
        const out = console.error;
        console.error = () => {};
        let error = false;
        try {
            render(<Modal />);
        } catch(e) {
            error = true;
        }
        expect(error).toBe(true);
        console.error = out;
    });

    test('not render with an unknown size prop', () => {
        const out = console.error;
        console.error = () => {};

        // unknown size
        let error = false;
        try {
            render(<Modal size={"90x90"} title="Title" content={<div>Hallo</div>} />);
        } catch(e) {
            error = true;
        }
        expect(error).toBe(true);

        // known size
        error = false;
        try {
            render(<Modal size={modalSizes.s7590} title="Title" content={<div>Hallo</div>} />);
        } catch(e) {
            console.log(e);
            error = true;
        }
        expect(error).toBe(false);
        console.error = out;
    });
});
