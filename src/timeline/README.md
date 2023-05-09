# Phoenix Timeline

Ansicht einer Zeitleiste mit React implementiert.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/timeline/

## Installation

[React](https://react.dev/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

```tsx
import TimeLine from '@phoenixreisen/reacts/src/timeline';

// API
interface Props {
    animated: boolean
    position: Position,
    children: ReactNode,
    side?: Map<number, 'left'|'right'>
    line: 'separated' | 'constantly'
}

<TimeLine animated={true} line={'constantly'} position={'left'}>
    <div className="pa3 pt0">
        <div><strong>Tab I</strong></div>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
    </div>
    <div className="pa3 pt0">
        <div><strong>Tab II</strong></div>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
    </div>
    <div className="pa3 pt0">
        <div><strong>Tab III</strong></div>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
    </div>
</TimeLine>
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