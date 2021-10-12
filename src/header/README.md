# Phoenix Header

Header-Leiste, die das Phoenix-Logo sowie - bei Bedarf - einen App-/Versionsnamen darstellt. Zudem ist eine
Sticky Topbar enthalten, die eingeblendet wird, sobald der User nach unten über den Header hinaus scrollt.

Prinzipiell soll diese Komponente den Standard-Header für diverse (standalone) Phoenix-Services bereitstellen.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/header/

## Anwendung

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

```tsx
import { Header, Topbar } from '@phoenixreisen/reacts/header';

<Header
    version="Kabinenpräsente 1.0.0"             // wird standardmäßig unter dem Logo angezeigt
    url="https://www.phoenixreisen.com"         // verlinkt das Logo entsprechend
/>
<Topbar
    backUrl="https://www.phoenixreisen.com"
    toggleNav={() => console.info('toggled')}    // bewirkt, dass das Hamburger-Icon angezeigt wird
    toggleAvatar={() => console.info('toggled')} // bewirkt, dass das Avatar-Icon angezeigt wird
/>
```

## Demo für Github Page

Mit folgendem Befehl werden alle Demos gebaut. Möchte man nur bestimmte Demos bauen, kann man in der [rollup.config.js](../../rollup.config.js) nicht benötigte Demos auskommentieren, sollte sie vor dem `push` aber wieder einkommentieren.

```bash
npm run compile:demos
```

## Test

```bash
[npm install]
npm run test:header
```

## Deployment

Deployed & published wird immer die ganze Sammlung. [Siehe hier](../../README.md).