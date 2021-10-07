# Phoenix React Komponenten

Sammlung von React Implementierungen für die jeweiligen Komponenten des Design Systems.

Die Komponenten sind Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

```ts
import <KOMPONENTE> from '@phoenixreisen/reacts/<KOMPONENTE>';

// zum Beispiel
import Loader from '@phoenixreisen/reacts/loader';
import Notifications from '@phoenixreisen/reacts/header';
```

Weitere Informationen bzgl. Einbindung & Aufruf sind in der Readme der jeweiligen Komponente hinterlegt.

- [Loader](./loader/README.md)
- [Header](./header/README.md)
- [Notifications](./notifications/README.md)
- ...

## Test

```bash
npm install
npm test
```

## Deployment

```bash
npm version [major|minor|patch] # increase version x.x.x => major.minor.patch
npm publish                     # upload to npm
git push
```