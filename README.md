# Phoenix Loader

Ladeanzeige(n) für API-Abfragen oder ähnliches.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Installation

[Mithril](https://mithril.js.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/loader
```

## Anwendung

```js
// entweder CommonJS
const Loader = require('@phoenixreisen/loader');

// oder ES6+
import Loader from '@phoenixreisen/loader';
```

#### Aufruf

```js
// Hyperscript
m(Loader);
m(Loader, { type: 'overlay', text: 'Daten werden geladen...' });

// JSX
<Loader />
<Loader type="overlay" text="Daten werden geladen..." />
```

## Test

```bash
npm install
npm test
```

## Deployment

```bash
npm version [major|minor|patch]     # increase version x.x.x => major.minor.patch
npm publish                         # upload to npm
git push
```