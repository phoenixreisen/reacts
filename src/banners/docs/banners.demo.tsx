import * as Banners from '../index';
import React from 'react';


//--- Komponente -----

export const Demo = () => {

    return (
        <div className="acc-demo">
            <Banners.Linkbanner
                urltext="Phoenix Reisen"
                url="https://www.phoenixreisen.com"
                text="Jetzt unsere Website besuchen & durch tolle Reisen stöbern"
            />

            <hr />

            <Banners.Sharebanner
                noBackground={false}
                headline="Jetzt teilen"
                appname="Phoenix Reisen"
                mailsubject="Mail Subject"
                urltext="Tolle Schiffreisen"
                url="https://www.phoenixreise.com"
                hashtags="Phoenix, Reisen, Kreuzfahrten"
            />
        </div>
    );
};

export default Demo;