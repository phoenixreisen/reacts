# Phoenix "Akkordeon"

**JS Akkordeon-Komponente mittels React.js.** Die Komponente beinhaltet nur die Implementierung, die Styles kommen wie immer aus dem Design-System.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/accordion/

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

```js
import Accordion from '@phoenixreisen/reacts/accordion';
```

## Anwendung

#### Props Typisierung

```ts
type Props = {
    jumpMinus: number,

    items: Array<{
        fas: string,
        content: React.ReactNode,
        headline: React.ReactNode | string,
        type: 'primary'|'secondary',
    }>,
}
```

#### Props Beispiel

```ts
const Prime = {
    fas: 'ship',
    type: 'primary',
    headline: 'Hafen Bremen',
    content: {
        view() {
            return ( <div>PRIMARY ITEM</div> );
        }
    }
}
const Secondary = {
    fas: 'ship',
    type: 'secondary',
    headline: 'Ausflug XYZ',
    content: {
        view() {
            return ( <div>GRAY SECONDARY ITEM</div> );
        }
    }
}
const items = [ Prime, Secondary, Secondary, Secondary ];
```

#### Aufruf

```ts
import Accordion from '@phoenixreisen/reacts/src/accordion';

<Accordion items={[0,1,2,1,3, 0,2,2,1,3, 0,1,2,3].map(current =>
    items[current]
)} />
```

## Github Page

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