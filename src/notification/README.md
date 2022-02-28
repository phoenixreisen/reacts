# Phoenix Status Notification

[React](https://reactjs.org/)-Komponente für die Darstellung von Status Notification.

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/notification/

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

### Mehrere Notifications rendern

Nach einem Benutzerereignis (z.B. Speichern oder Löschen) wird ein Notification-Objekt zu einem **gestreamten Array** auszugebender Notifications hinzugefügt. Anschließend wird es der `Notifications`-Komponente als Parameter übergeben.

`Notifications` iteriert über die Liste und rendert entsprechend oft die `Notification`-Komponente mit den jeweiligen Objektdaten. Danach, nach ca. 5 Sekunden, ruft `Notification` die als Parameter übergebene `toggle()`-Funktion auf, die dafür sorgt, dass das jeweilige Notification-Objekt aus der Liste gelöscht wird.

```tsx
import Notifications, { notify } from '@phoenixreisen/reacts/src/notifications';

const ExampleView = () => {

    const submit = () => {
        Promise.resolve('saved!').then(() => {
            notify({
                status: 'success',
                text: 'Erfolgreich gespeichert!',
            });
        });
    };

    return (
        <div>
            <div>Irgendwelcher Content</div>
            <Notifications />
        </div>
    }
};
```

## Test

```bash
npm install
npm test
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