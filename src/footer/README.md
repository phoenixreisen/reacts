# Phoenix Footer

Standard-Footer für diverse (standalone) Phoenix-Applikationen.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/footer/

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

```tsx
import Footer from '@phoenixreisen/reacts/footer';

<Footer headline="für etwas Vorfreude" env="[staging|production]" />
```

Wird für `env` "staging" angegeben, wird `border-top` gelb eingefärbt.

## Demo für Github Page

Mit folgendem Befehl werden alle Demos gebaut. Möchte man nur bestimmte Demos bauen, kann man in der [rollup.config.js](../../rollup.config.js) nicht benötigte Demos auskommentieren, sollte sie vor dem `push` aber wieder einkommentieren.

```bash
npm run compile:demos
```

## Test

```bash
[npm install]
npm run test:footer
```

## Deployment

Deployed & published wird immer die ganze Sammlung. [Siehe hier](../../README.md).