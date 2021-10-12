# Phoenix Modal

[React](https://reactjs.org/)-Komponente für das Phoenix Modal.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/modal/

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

```tsx
import Modal from '@phoenixreisen/modal';
```

Das Modal selbst kümmert sich **nicht** um seinen Geöffnet-/Geschlossen-Status. Das muss außerhalb entschieden werden, indem eine Statusvariable dafür sorgt, ob das Modal gerendert wird oder nicht.

Wenn keine Größe angegeben ist, passt sich das Modal bis zu seiner `max-width` und `max-height` an seinen Content an. Folgende **fixe Größen für Tablets und Desktops** können aber auch festgelegt werden:

- s7590 - 75% breit, 90% hoch
- s9090 - 90% breit, 90% hoch
- s5050 - 50% breit, 50% hoch
- s5075 - 50% breit, 75% hoch

Auf Smartphones nimmt das Modal immer 90% der Breite ein und wird bis zu 90% hoch.

```tsx
<Modal title="Mein Modal" withCloseText={false}
    toggle={() => state.show = false}
    content={<div>CONTENT</div>}
    footer={<div>FOOTER</div>}>
</Modal>
```

## Demo für Github Page

Mit folgendem Befehl werden alle Demos gebaut. Möchte man nur bestimmte Demos bauen, kann man in der [rollup.config.js](../../rollup.config.js) nicht benötigte Demos auskommentieren, sollte sie vor dem `push` aber wieder einkommentieren.

```bash
npm run compile:demos
```

## Test

```bash
[npm install]
npm run test:modal
```

## Deployment

Deployed & published wird immer die ganze Sammlung. [Siehe hier](../../README.md).