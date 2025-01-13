# Phoenix Fuzzy-Suche

**Ein Eingabefeld, das während des Tippens bereits Suchergebnisse anzeigt.** Die Komponente stellt nur die Implementierung, 
die Styles kommen wie immer aus dem Design-System.

Es gibt zwei Varianten:

- **Autocomplete für komplette Eingabe.** Entsprechend der Eingabe ins Textfeld werden Vorschläge abgerufen und angezeigt. Wird ein Vorschlag ausgewählt, wird die komplette Eingabe durch diesen Vorschlag ersetzt. Siehe Demo.

- **Autocomplete für Platzhalter.** Tippt man innerhalb eines Textes ein definiertes Prefix, werden entsprechende Platzhalter abgerufen und angezeigt. Wird ein Platzhaler ausgewählt, wird der Prefix (sowie das direkt anschließend Getippte bis zum nächsten Leerzeichen) durch diesen Platzhalter (samt Prefix+Suffix) ersetzt. Der Rest des Textes bleibt bestehen. Siehe Demo.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/fuzzy-input/

## Installation

[React](https://react.dev/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

#### Parameter / Props

```ts
type Attrs = {
    id?: string,
    label?: string,
    value?: string,
    valid?: boolean,
    pattern?: RegExp,
    warnmsg?: string,
    errormsg?: string,
    disabled?: boolean,
    readonly?: boolean,
    logerror?: boolean,
    maxLength?: number,
    minLength?: number,
    throttling?: number,
    withButton?: boolean,
    placeholder?: string,
    clearAfterLoad?: boolean,
    inText?: {
        prefix: string,
        suffix: string,
    },
    onLoad: (name: string) => Promise<unknown>,
    onQuery: (input?: string) => Promise<Array<string>>
    onInput: (input: string) => void,
    onBlur?: () => void,
}
```

#### Aufruf

```ts
/** Autocomplete gesamter Eingabe (siehe Demo) */

import FuzzyInput from '@phoenixreisen/reacts/fuzzy-input';
import React from 'react';

// Entweder JSX
<FuzzyInput
    id={'example-1'}
    label={'Vorlagensuche'}
    pattern={new RegExp(/[a-Z]/)}
    warnmsg={'Ungueltige Eingabe'}
    errormsg={'Huch, ein Fehler ist aufgetreten.'}
    oninput={(value) => someState.value = value}
    query={(needle: string) => Promise.resolve(console.log('search it'))}
    load={(choice: string) => Promise.resolve(console.log('get it'))}
    value={() => someState.value}
/>

//oder Hyperscript bzw. JS
m(FuzzyInput, {
    id: 'example-1',
    label: 'Vorlagensuche',
    pattern: new RegExp(/[0-9]/),
    warnmsg: 'Ungültige Eingabe',
    errormsg: 'Es ist ein Fehler aufgetreten.',
    oninput: (value) => someState.value = value}
    load: (name: string) => Promise.resolve(console.log('search it')),
    query: (input: string) => Promise.resolve(console.log('get it')),
    value: () => someState.value}
});
```

```ts
/** Autocomplete für Platzhalter mit Button (siehe Demo) */

import FuzzyInput from '@phoenixreisen/reacts/fuzzy-input';
import React from 'react';

<FuzzyInput
    inText={{
        prefix: '{{',
        suffix: '}}'
    }}
    minLength={1}
    id={'example-2'}
    withButton={true}
    label={'Irgendwas'}
    pattern={new RegExp(/[{a-zA-Z]/)}
    warnmsg={'Ungueltige Eingabe'}
    value={() => someState.value}
    oninput={(value) => someState.value = value}
    errormsg={'Huch, ein Fehler ist aufgetreten.'}
    query={(needle: string) => query2(needle)}
    load={(choice: string) => load2(choice)}
/>
```

## Demo für Github Page

Mit folgendem Befehl werden alle Demos in den Ordner [../../docs](../../docs) gebaut. Dieser Ordner wird von Github zur Bereitstellung der Demos bzw. Github Pages genutzt.

Möchte man zum Entwickeln nur bestimmte Demos bauen, kann man in der [rollup.config.js](../../rollup.config.js) nicht benötigte Demos auskommentieren, sollte sie vor dem `push` aber wieder einkommentieren.

```bash
npm run compile:demos
```

## Test

```bash
[npm install]
npm run test
```

## Deployment

Deployed & published wird immer die ganze Sammlung. [Siehe hier](../../README.md).