# Phoenix Banners

React Implementierungen diverser Banner. Styles kommen aus dem Design System.

- Link Banner
- Social Media Share Banner

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

http://design-system.phoenixreisen.net/section-200.html

## Installation

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

## Anwendung

```js
import Linkbanner from '@phoenixreisen/reacts/banners/link.r';
import Sharebanner from '@phoenixreisen/reacts/banners/share.r';

// Import aller vorhandenen Banner
// (nur zu empfehlen, wenn auch alle benutzt werden)
import * as Banners from '@phoenixreisen/reacts/banners';
```

#### Aufruf

##### Sharebanner [Vorschau](http://design-system.phoenixreisen.net/section-200.html)

```tsx
<Sharebanner
    noBackground="true"
    headline="Hallo, I bims, der Share Banner."
    mailsubject="Ich stehe im Emailbetreff!"
    urltext="Ich bin der Text vor der Url, wenn ich geshared werde."
    url="https://phoenixreisen.com"
    hashtags="phx, reisen, kreuzfahrt"
    appname="Phoenix Kabinenpräsente"
/>
```

##### Linkbanner [Vorschau](http://design-system.phoenixreisen.net/section-200.html)

```tsx
<Linkbanner
    text="Immer über die besten Reisen auf dem Laufenden bleiben!"      //optional
    url="https://www.phoenixreisen.com"                                 //pflicht
    urltext="Jetzt abonnieren"                                          //pflicht
/>
```

## Kompilat Demo für Github Page

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