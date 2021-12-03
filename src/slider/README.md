# Phoenix Slider "Swiper"

**Die Komponente stellt einen React-Wrapper für den Slider "Swiper" zur Verfügung.** Diesem werden letztendlich
nur noch eine Reihe von React-Komponenten übergeben. Der Rest ist vorkonfiguriert. Die Styles kommen aus dem [Design-System](https://design-system.phoenixreisen.net).

Die Komponente ist Teil des [Phoenix Reisen Design-Systems](https://design-system.phoenixreisen.net).

## Demo

https://phoenixreisen.github.io/reacts/slider/

## Anwendung

[React](https://reactjs.org/) wird benötigt.

```bash
npm install --save @phoenixreisen/reacts
```

```tsx
import Slider from '@phoenixreisen/reacts/slider';
import React from 'react';

export const Demo = ()  => {

    return (
        <Slider>
            <div className="pa3">
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
            </div>
            <div className="pa3">
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
            </div>
            <div className="pa3">
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
            </div>
            <div className="pa3">
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
                <div>TEST REACT KOMPONENTE</div>
            </div>
        </Slider>
    );
};

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" render={() => <Demo />} />
        </Switch>
    </Router>,
    document.querySelector('.example-app'),
);
```

## Github Page

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