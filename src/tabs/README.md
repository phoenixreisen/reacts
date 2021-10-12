# Phoenix Tabs

Phoenix "Web Tabs"-Komponente mit React implementiert.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/tabs/

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

```tsx
import Tabs from '@phoenixreisen/reacts/tabs';

<Tabs tabs={['Tab 1', 'Tab 2']}>
    <div class="tab1">Tab 1</div>
    <div class="tab2">Tab 2</div>
</Tabs>
```

## Demo für Github Page

Mit folgendem Befehl werden alle Demos gebaut. Möchte man nur bestimmte Demos bauen, kann man in der [rollup.config.js](../../rollup.config.js) nicht benötigte Demos auskommentieren, sollte sie vor dem `push` aber wieder einkommentieren.

```bash
npm run compile:demos
```

## Test

```bash
[npm install]
npm run test:tabs
```

## Deployment

Deployed & published wird immer die ganze Sammlung. [Siehe hier](../../README.md).
https://phoenixreisen.github.io/notification/