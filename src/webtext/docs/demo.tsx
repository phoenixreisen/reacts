import React from 'react';
import Webtext from '..';

//--- Demo Content -----

export const Webtexts = {
    'webtext1': 'Dies ist der erste Webtext im Webtext-Objekt.',
    'webtext2': 'Dies ist der zweite Webtext im Webtext-Objekt.',
    'webtext3': 'Dies ist der dritte Webtext im Webtext-Objekt.',
    'webtext4': 'Dies ist der vierte Webtext im Webtext-Objekt.',
    'webtext5': 
        `<div>
            <a href="https://www.phoenixreisen.com">Phoenixreisen</a> macht 
            in <span classname="c-primary">Kreufahrten</span>. Ich bekomme aber 
            keine <strong>Suite</strong> mehr. Das 'code'-Element, um <code><strong>dieses 
            Wort</strong></code> sollte gestript worden sein.
        </div>`,
    'webtext6': `
        Hier sind {{anzahl}} Platzhalter enthalten, die ersetzt werden. 
        Die {{eigenschaft}} landen sehr schnell im Gefängnis. {{name}}
    `,
    'webtext7': `
## H2 Markdown Überschrift
### H3 Markdown Überschrift

==Etwas== Text mit *kursiv* und **fett** und einem {{placeholder}}.
Hier noch ein Link zur Website: https://www.phoenixreisen.com/

* Liste
* mit
* Punkten

Hier wieder etwas Text. :-)`,
}

//--- Tooltip Component in several variations -----

export const Demo = () => {
    return (
        <section className="webtext-demo">
            <h3>Webtext mit Namen im title-Attribut</h3>

            <Webtext
                webtexts={Webtexts}
                webtextName="webtext3"
                showWebtextName={true}
                cssClass="webtext-demo-1"
            />

            <h3>Webtext, der seinen Namen nicht preisgibt</h3>

            <Webtext
                webtexts={Webtexts}
                webtextName="webtext4"
                showWebtextName={false}
                cssClass="webtext-demo-2"
            />

            <h3>Webtext, dessen übergebener Name nicht im Objekt existiert</h3>

            <Webtext
                webtexts={Webtexts}
                showWebtextName={true}
                cssClass="webtext-demo-3"
                webtextName="webtext-which-does-not-exist"
            />

            <h3>Webtext mit HTML</h3>

            <Webtext
                webtexts={Webtexts}
                webtextName="webtext5"
                showWebtextName={true}
                cssClass="webtext-demo-4"
            />

            <h3>Webtext mit HTML, aber als Plaintext ausgegeben</h3>

            <Webtext
                asPlainText={true}
                webtexts={Webtexts}
                webtextName="webtext5"
                showWebtextName={false}
                cssClass="webtext-demo-5"
            />

            <h3>Webtext mit Link zum Webtext Manager</h3>

            <Webtext
                webtexts={Webtexts}
                webtextName="webtext3"
                showWebtextName={true}
                wtmLink={'https://meinereise.phoenixreisen.com/cdn/mitarbeiter/webtext-verwaltung/#!form/tefra__text/MeinPhoenix'}
            />

            <h3>HTML-Webtext mit Link zum Webtext Manager</h3>

            <Webtext
                webtexts={Webtexts}
                webtextName="webtext5"
                showWebtextName={true}
                wtmLink={'https://meinereise.phoenixreisen.com/cdn/mitarbeiter/webtext-verwaltung/#!form/tefra__text/MeinPhoenix'}
            />

            <h3>Webtext mit Alternativtext</h3>

            <Webtext
                webtexts={Webtexts}
                showWebtextName={false}
                webtextName="gibts-nicht"
                altText={'Ich werde stattdessen angezeigt.'}
            />

            <Webtext
                webtexts={Webtexts}
                showWebtextName={false}
                webtextName="gibts-nicht"
                altText={'<p>Ich bin <em>HTML</em> als <strong>String</strong>, werder aber gerendert.</p>'}
            />

            <h3>Webtext mit ersetzten Platzhaltern</h3>

            <Webtext
                webtexts={Webtexts}
                showWebtextName={false}
                webtextName="webtext6"
                placeholders={[
                    ['{{anzahl}}', '3'],
                    ['{{name}}', 'Ham Berger'],
                    ['{{eigenschaft}}', 'aggressiven'],
                ]}
            />

            <h3>Webtext mit interpretiertem Markdown</h3>

            <Webtext
                asMarkdown={true}
                webtexts={Webtexts}
                showWebtextName={false}
                webtextName="webtext7"
                placeholders={[
                    ['{{placeholder}}', 'Platzhalter im Markdown'],
                ]}
            />
        </section>
    );
};