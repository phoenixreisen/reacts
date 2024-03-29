# Phoenix Footer

Standard-Footer für diverse (standalone) Phoenix-Applikationen. Einmal ein externer Footer für öffentlich zugängliche Applikationen,
sowie ein interner Footer für Intranet-Anwendungen.

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
import Footer from '@phoenixreisen/reacts/src/footer';

<Footer headline="für etwas Vorfreude" env="[staging|production]" />
```

Wird für `env` "staging" angegeben, wird `border-top` gelb eingefärbt.

```tsx
import Footer from '@phoenixreisen/reacts/src/footer/footer.intern.m';

<Footer loggedIn={true|false} username="Fabian" />
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