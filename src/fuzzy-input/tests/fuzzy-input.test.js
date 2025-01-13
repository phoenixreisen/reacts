/**
 * @jest-environment jsdom
 */
import { render, fireEvent, waitFor, screen, getByText } from '@testing-library/react';
import shallowRenderer from 'react-test-renderer/shallow';
import { isReady, isValid } from '../fuzzy-input.fns';
import renderer, { act } from 'react-test-renderer';
import FuzzyInput from '../fuzzy-input.r';
import React from 'react';

// Erweiterung von expect() um DOM-Funktionen
import '@testing-library/jest-dom';

describe('Fuzzy Input', () => {
    jest.useFakeTimers();

    test('should render correctly oninit', () => {
        const component = renderer.create(
            <FuzzyInput
                throttling={5}
                onQuery={() => Promise.resolve(['S1', 'S2', 'S3'])}
                onLoad={() => Promise.resolve({ type: 'success', value: 'String 2'})}
            />
        );
        const snap = component.toJSON();
        expect(snap).toMatchSnapshot();
    });

    test('should render button correctly', () => {
        const withoutButton = renderer.create(
            <FuzzyInput
                inText={undefined}
                withButton={false}
            />
        );
        const snapWithoutButton = withoutButton.toJSON();
        expect(snapWithoutButton).toMatchSnapshot();

        const withButton = renderer.create(
            <FuzzyInput
                withButton={true}
                inText={{ prefix: '{', suffix: '}' }}
            />
        );
        const snapWithButton = withButton.toJSON();
        expect(snapWithButton).toMatchSnapshot();
    });

    test('should correctly set and use input value from inside or outside', () => {
        const c = renderer.create(
            <FuzzyInput
                onInput={undefined}
            />
        );
        expect(c.root.findByType('input').props.value).toEqual('');
        act(() => c.root.findByType('input').props.onInput({ target: { value: 'test' } }));
        expect(c.root.findByType('input').props.value).toEqual('test');

        const outerState = {
            value: ''
        };
        const cOut = renderer.create(
            <FuzzyInput
                value={outerState.value}
                onInput={(value) => outerState.value = `${value} from outer space`}
            />
        );
        expect(cOut.root.findByType('input').props.value).toEqual('');
        act(() => cOut.root.findByType('input').props.onInput({ target: { value: 'test' } }));
        // Simulated re-render of the outer component, causing the inner 
        // component to be re-rendered with a new value provided from the outside
        cOut.update(
            <FuzzyInput
                value={outerState.value}
                onInput={(value) => outerState.value = `${value} from outer space`}
            />
        );
        expect(cOut.root.findByType('input').props.value).toEqual('test from outer space');
    });

    test('should correctly return input value', () => {
        const cInnter = renderer.create(
            <FuzzyInput />
        )
        expect(cInnter.root.findByType('input').props.value).toEqual('');
        act(() => cInnter.root.findByType('input').props.onInput({ target: { value: 'inner value' } }));
        expect(cInnter.root.findByType('input').props.value).toEqual('inner value');

        const cOuter = renderer.create(
            <FuzzyInput
                value={'outer value'}
            />
        );
        expect(cOuter.root.findByType('input').props.value).toEqual('outer value');
        act(() => cOuter.root.findByType('input').props.onInput({ target: { value: 'inner value' } }));
        // Der Feldinput wird immer über die äußere Property bezogen. Ohne eine onInput-Funktion
        // von außen, bleiben Änderungen am Feld ohne Wirkung.
        expect(cOuter.root.findByType('input').props.value).toEqual('outer value');
    });

    test('should correctly validate input', () => {
        const attrsMock = { valid: true, pattern: undefined };
        expect(isValid('test', attrsMock)).toBe(true);
        attrsMock.valid = false;
        expect(isValid('test', attrsMock)).toBe(false);
        attrsMock.valid = true;
        attrsMock.pattern = new RegExp(/^[0-9]+$/);
        expect(isValid('123', attrsMock)).toBe(true);
        expect(isValid('test', attrsMock)).toBe(false);
        expect(isValid('test123', attrsMock)).toBe(false);
        attrsMock.valid = undefined;
        attrsMock.pattern = undefined;
        expect(isValid('test', attrsMock)).toBe(true);
    });

    test('should correctly determine if input is ready for search', () => {
        const state = { loading: false, value: 'test' };
        const attrs = { minLength: undefined };
        let input = 'test';
        expect(isReady(input, input, state, attrs)).toBe(true);
        state.loading = true;
        expect(isReady(input, input, state, attrs)).toBe(false);
        state.loading = false;
        state.value = 'something other';
        expect(isReady(input, state.value, state, attrs)).toBe(false);
        input = 'te';
        state.value = 'te';
        // default min length ist aber 3 Zeichen
        expect(isReady(input, input, state, attrs)).toBe(false);
        attrs.minLength = 2;
        expect(isReady(input, input, state, attrs)).toBe(true);
    });

    test('should correctly focus a certain DOM item by Id', async () => {
        let searchSpyCount = 0;
        
        const up = { key: 'ArrowUp', preventDefault: jest.fn() };
        const down = { key: 'ArrowDown', preventDefault: jest.fn() };
        const searchSpy = jest.spyOn(window, 'setTimeout');

        const comp = renderer.create(
            <FuzzyInput
                onQuery={() => Promise.resolve(['Test 1', 'Test 2', 'Test 3'])}
                onLoad={() => Promise.resolve({ type: 'success', value: 'Test 3 ausgewählt'})}
            />
        );
        const rootElement = comp.root.findByProps({
            className: 'fuzzy-search fuzzy-show-result'
        });

        const tree = comp.toJSON();
        // console.log('TREE', tree);
        expect(tree).toMatchSnapshot();
        expect(rootElement).not.toBeNull();
        expect(searchSpy).toHaveBeenCalledTimes(0);
        
        act(() => {
            comp.root.findByType('input').props.onInput({ target: { value: 'Test' } })
        });
        expect(searchSpy).toHaveBeenCalledTimes(1);
        expect(comp.root.findByType('input').props.value).toEqual('Test');

        await waitFor(() => {
            const overlay = comp.root.findByProps({
                className: 'fuzzy-overlay fuzzy-result fuzzy-style'
            });
            expect(overlay).not.toBeNull();
            const treeWithOverlay = comp.toJSON();
            expect(treeWithOverlay).toMatchSnapshot();
        });
    });

    test('should call query and search callback in autocomplete mode correctly', async () => {
        const search = 'Result';
        const resultList = [
            'Result 1',
            'Result 2',
            'Result 3',
            'Blabla 1',
            'Blabla 2',
            'Anything 1',
            'Anything 2',
        ];
        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                onQuery={() => Promise.resolve(resultList.filter((item) => 
                    item.includes(search)
                ))}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: search } });
        expect(input.value).toBe(search);

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();

            const resultDiv = queryByTestId('fuzzy-result');
            const children = resultDiv.querySelectorAll('a');
            expect(children.length).toBe(3);

            expect(getByText('Result 1')).toBeInTheDocument();
            expect(getByText('Result 2')).toBeInTheDocument();
            expect(getByText('Result 3')).toBeInTheDocument();
        });
    });

    test('should call query and search callback in placeholder mode correctly', async () => {
        const resultList = [
            'Result 1',
            'Result 2',
            'Result 3',
            'Blabla 1',
            'Blabla 2',
            'Anything 1',
            'Anything 2',
        ];
        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                inText={{ prefix: '{{', suffix: '}}' }}
                onQuery={() => Promise.resolve(resultList)}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: '{{' } });
        expect(input.value).toBe('{{');

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();

            const resultDiv = queryByTestId('fuzzy-result');
            const children = resultDiv.querySelectorAll('a');
            expect(children.length).toBe(7);

            expect(getByText('Result 1')).toBeInTheDocument();
            expect(getByText('Blabla 1')).toBeInTheDocument();
            expect(getByText('Anything 1')).toBeInTheDocument();
        });
    });

    test('should provide up and down going (focusing) within result list by arrow keys', async () => {
        const { getByRole, getByText, getByTestId } = render(
            <FuzzyInput
                onQuery={() => Promise.resolve(['Test 1', 'Test 2', 'Test 3'])}
                onLoad={() => Promise.resolve({ type: 'success', value: 'Test 3 ausgewählt'})}
            />
        );
    
        // Type test into the input field
        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: 'Test' } });
        expect(input.value).toBe('Test');
    
        // Wait till the result list is shown
        await waitFor(() => {
            expect(getByTestId('fuzzy-result')).toBeInTheDocument();
        });
    
        // Press arrow down key
        fireEvent.keyDown(document.body, { key: 'ArrowDown', code: 'ArrowDown' });

        // Check if the first element has the focus
        await waitFor(() => {
            const firstResultItem = getByTestId('fuzzy-input-item-0');
            expect(firstResultItem).toHaveFocus();
        });

        // Press arrow down key
        fireEvent.keyDown(document.body, { key: 'ArrowDown', code: 'ArrowDown' });

        // Check if the second element has the focus
        await waitFor(() => {
            const secondResultItem = getByTestId('fuzzy-input-item-1');
            expect(secondResultItem).toHaveFocus();
        });

        // Press arrow up key
        fireEvent.keyDown(document.body, { key: 'ArrowUp', code: 'ArrowUp' });

        // Check if the first element has the focus
        await waitFor(() => {
            const firstResultItem = getByTestId('fuzzy-input-item-0');
            expect(firstResultItem).toHaveFocus();
        });
    });

    test('should close result list when escape (ESC) key is pressed', async () => {
        const { getByRole, getByText, queryByTestId } = render(
            <FuzzyInput
                onQuery={() => Promise.resolve(['Test 1', 'Test 2', 'Test 3'])}
                onLoad={() => Promise.resolve({ type: 'success', value: 'Test 3 ausgewählt'})}
            />
        );

        // Type test into the input field
        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: 'Test' } });
        expect(input.value).toBe('Test');

        // Wait till the result list is shown
        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();
        });

        // Close/remove result list by pressing escape key
        fireEvent.keyUp(document.body, { key: 'Escape', code: 'Escape' });

        // Check whether the result list is removed from DOM
        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).not.toBeInTheDocument();
        });
    });

    test('should correctly find placeholder matches', async () => {
        const resultList = [
            'Mein Name ist Mia', 
            'Der Hund ist tot', 
            'Der Hund wird tot sein',
            'Der Hund wird tot gewesen sein'
        ];

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                inText={{
                    prefix: '{{',
                    suffix: '}}'
                }}
                onQuery={() => Promise.resolve(resultList)}
                onLoad={() => Promise.resolve({
                    type: 'success',
                    value: resultList[3]
                })}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: 'Test' } });
        expect(input.value).toBe('Test');

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).not.toBeInTheDocument();
        });

        fireEvent.input(input, { target: { value: 'Sam sagt: {{Hu' } });

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();
            expect(getByText('Der Hund wird tot gewesen sein')).toBeInTheDocument();
            // Three items should be in the result list, those with "Hund" in it
            expect(getByTestId('fuzzy-input-item-0')).toBeInTheDocument();
            expect(getByTestId('fuzzy-input-item-1')).toBeInTheDocument();
            expect(getByTestId('fuzzy-input-item-2')).toBeInTheDocument();
            expect(queryByTestId('fuzzy-input-item-3')).not.toBeInTheDocument();
        });

        fireEvent.keyDown(document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        await waitFor(() => {
            const result1 = getByTestId('fuzzy-input-item-0');
            expect(result1).toHaveTextContent('Der Hund ist tot');
            expect(result1).toHaveFocus();
        });

        fireEvent.keyDown(document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        await waitFor(() => {
            const result2 = getByTestId('fuzzy-input-item-1');
            expect(result2).toHaveTextContent('Der Hund wird tot sein');
            expect(result2).toHaveFocus();
        });

        fireEvent.keyDown(document.body, { key: 'ArrowDown', code: 'ArrowDown' });
        await waitFor(() => {
            const result3 = getByTestId('fuzzy-input-item-2');
            expect(result3).toHaveTextContent('Der Hund wird tot gewesen sein');
            expect(result3).toHaveFocus();
        });

        const result3 = getByTestId('fuzzy-input-item-2');
        fireEvent.keyUp(result3, { key: 'Enter', code: 'Enter', charCode: 13 });
        await waitFor(() => {
            const input = getByRole('textbox');
            expect(input.value).toBe(`Sam sagt: {{${resultList[3]}}} `);
        });
    });

    test('should show an error when a promise rejection occurs', async () => {
        const error = async () => Promise.reject({type: 'failure', msg: 'bla'});
        const needle = 'Test';

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                onQuery={() => Promise.reject(error)}
            />
        );
        
        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(document.querySelector('.fuzzy-error')).toBeNull();
        expect(input.value).toBe(needle);

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).not.toBeInTheDocument();
            expect(document.querySelector('.fuzzy-error')).toBeInTheDocument();
            expect(getByText('Oha, während der Abfrage ist ein Fehler aufgetreten.')).toBeInTheDocument();
        });
    });

    test('should call onLoad callback correctly', async () => {
        const onLoadFn = jest.fn();
        const needle = 'Test';

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                onQuery={() => Promise.resolve([`${needle} 1`, `${needle} 2`, `${needle} 3`])}
                onLoad={() => onLoadFn()}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(input.value).toBe(needle);

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();
        });

        const result1 = getByTestId('fuzzy-input-item-0');
        fireEvent.keyUp(result1, { key: 'Enter', code: 'Enter', charCode: 13 });

        await waitFor(() => {
            expect(onLoadFn).toHaveBeenCalledTimes(1);
            expect(getByRole('textbox').value).toBe(`${needle} 1`);
        });
    });

    test('should clear field, when clearAfterLoad is set', async () => {
        const onLoadFn = jest.fn();
        const needle = 'Test';

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                clearAfterLoad={true}
                onLoad={() => onLoadFn()}
                onQuery={() => Promise.resolve([`${needle} 1`, `${needle} 2`, `${needle} 3`])}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(input.value).toBe(needle);

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();
        });

        const result1 = getByTestId('fuzzy-input-item-0');
        fireEvent.keyUp(result1, { key: 'Enter', code: 'Enter', charCode: 13 });
        
        await waitFor(() => {
            expect(getByRole('textbox').value).toBe('');
            expect(onLoadFn).toHaveBeenCalledTimes(1);
        });
    });

    test('should show warning, when input is invalid', async () => {
        const onLoadFn = jest.fn();
        const needle = 'Test';

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                clearAfterLoad={true}
                pattern={new RegExp(/[0-9]/)}
                onQuery={() => Promise.resolve([`${needle} 1`, `${needle} 2`, `${needle} 3`])}
                onLoad={() => onLoadFn()}
            />
        );
        
        await waitFor(() => {
            expect(document.querySelector('.fuzzy-warning')).not.toBeInTheDocument();
        });

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(input.value).toBe(needle);

        await waitFor(() => {
            expect(document.querySelector('.fuzzy-warning')).toBeInTheDocument();
            expect(getByText('Ungültige Eingabe.')).toBeInTheDocument();
        });
    });

    test('should catch error, when onLoad failed', async () => {
        const spy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const mockFunction = jest.fn(() => {
            throw new Error('Failure');
        });
        const needle = 'Test';

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                onQuery={() => Promise.resolve([`${needle} 1`, `${needle} 2`, `${needle} 3`])}
                onLoad={() => mockFunction()}
                clearAfterLoad={true}
                logerror={true}
            />
        );

        expect(document.querySelector('.fuzzy-error')).not.toBeInTheDocument();

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(input.value).toBe(needle);

        await waitFor(() => {
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();
        });

        const result1 = getByTestId('fuzzy-input-item-0');
        fireEvent.keyUp(result1, { key: 'Enter', code: 'Enter', charCode: 13 });

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
            expect(mockFunction).toHaveBeenCalled();
            expect(document.querySelector('.fuzzy-error')).not.toBeInTheDocument();
        });
    });

    test('should blur if onBlur is set', async () => {
        const needle = 'Test';
        const mockFunction = jest.fn();

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                onQuery={() => Promise.resolve([`${needle} 1`, `${needle} 2`, `${needle} 3`])}
                onLoad={() => fireEvent.input(getByRole('textbox'), { target: { value: 'loaded' } })}
                onBlur={() => mockFunction()}
                clearAfterLoad={true}
                logerror={true}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(input.value).toBe(needle);

        fireEvent.blur(input);

        await waitFor(() => {
            expect(mockFunction).toHaveBeenCalled();
        });
    });

    test('should trottle search requests correctly - two times', async () => {
        jest.useFakeTimers();

        const mockFunction = jest.fn().mockImplementation(() => {
            return Promise.resolve([`${needle} 1`, `${needle} 2`, `${needle} 3`])
        });
        const needle = 'Test';

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                throttling={300}
                onQuery={() => mockFunction()}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(input.value).toBe(needle);

        jest.advanceTimersByTime(310);

        fireEvent.input(input, { target: { value: `${needle} 1` } });
        expect(input.value).toBe(`${needle} 1`);

        await waitFor(() => {
            // A throttling duration of 300ms is set.
            // We fill the form two times with a pause of 310ms.
            // So the function should be called two times
            expect(mockFunction).toHaveBeenCalledTimes(2);
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();
        });

        jest.useRealTimers();
    });

    test('should trottle search requests correctly - one time', async () => {
        jest.useFakeTimers();

        const mockFunction = jest.fn().mockImplementation(() => {
            return Promise.resolve([`${needle} 1`, `${needle} 2`, `${needle} 3`])
        });
        const needle = 'Test';

        const { getByRole, getByText, getByTestId, queryByTestId } = render(
            <FuzzyInput
                throttling={300}
                onQuery={() => mockFunction()}
            />
        );

        const input = getByRole('textbox');
        fireEvent.input(input, { target: { value: needle } });
        expect(input.value).toBe(needle);

        jest.advanceTimersByTime(200);

        fireEvent.input(input, { target: { value: `${needle} 1` } });
        expect(input.value).toBe(`${needle} 1`);

        await waitFor(() => {
            // A throttling duration of 300ms is set.
            // We fill the form two times with a pause of 200ms.
            // So the function should be called one time with the second input, 
            // because it's not yet throttled
            expect(mockFunction).toHaveBeenCalledTimes(1);
            expect(queryByTestId('fuzzy-result')).toBeInTheDocument();
        });

        jest.useRealTimers();
    });
});