import { State, Props } from './fuzzy-input.types';
import { MINLENGTH } from './fuzzy-input.consts';

//--- View Funktionen -----

export function isValid(input: string, props: Props): boolean {
    if((typeof props.valid !== 'undefined') && !props.valid) {
        return false;
    } else if(props.pattern) {
        return props.pattern.test(input);
    } else {
        return true;
    }
}

export function isReady(input: string, currentValue: string, state: State, props: Props): boolean {
    const minLength = (props && typeof props.minLength === 'number') 
        ? props.minLength 
        : MINLENGTH;
    return input.length >= minLength
        && input === currentValue
        && !state.loading;
}

export function findMatch(input: string, prefix: string): string|null {
    // Prefix gefolgt von erlaubten Zeichen, endend mit Leerzeichen oder EOL.
    const pattern = `${prefix}[0-9a-zA-ZüöäÜÖÄß_#%\\?\\-\\+]*(\\s|$)`;
    const regex = new RegExp(pattern, 'gmi');
    return input.match(regex)?.[0]?.trim() ?? null;
}
