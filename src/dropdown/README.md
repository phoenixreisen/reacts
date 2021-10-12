# Phoenix Dropdown

Phoenix Dropdown, umgesetzt mit React.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/dropdown/

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

```tsx
import Dropdown from '@phoenixreisen/reacts/dropdown';
```

#### Aufruf

```tsx
const el1 = <div>Element</div>
const el2 = <div>Element</div>
const el3 = <a href="/nirgendwo">Link</a>;

<Dropdown title="Optionen">
    <el1 />
    <el2 />
    <el3 />
</Dropdown>
```

## Kompilat Demo für Github Page

Mit folgendem Befehl werden alle Demos gebaut. Möchte man nur bestimmte Demos bauen, kann man in der [rollup.config.js](../../rollup.config.js) nicht benötigte Demos auskommentieren, sollte sie vor dem `push` aber wieder einkommentieren.

```bash
npm run compile:demos
```

## Test

```bash
[npm install]
npm run test:dropdown
```

## Deployment

Deployed & published wird immer die ganze Sammlung. [Siehe hier](../../README.md).