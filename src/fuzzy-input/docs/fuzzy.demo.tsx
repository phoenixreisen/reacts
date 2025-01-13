import FuzzyInput from "../fuzzy-input.r";
import React, { useState } from "react";

//--- Daten -----

const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/** Eingabesuche */

async function query1(input: string) {
    return countries.filter((country) => {
        return country.toLowerCase().includes(input.toLowerCase());
    });
}
async function load1(name: string) {
    location.href = `https://www.google.de/search?q=${name}`;
    console.log(name);
    return name;
}

/** Platzhaltersuche */

async function query2(input: string) {
    console.log('query2 - input', input);
    return countries;
}
async function load2(name: string) {
    console.log('load2 - name', name);
    return name;
}

//--- Komponente -----

export function Demo() {
    const [state, setState] = useState({
        input1: '',
        input2: ''
    });

    return (
        <div className="fuzzy-demo">
            <p>
                <strong>Eingabefeld für Autocomplete.</strong><br />
                Eingabe: <em>{state.input1 || '-'}</em>
            </p>
            <FuzzyInput
                minLength={1}
                id="example-1"
                value={state.input1}
                pattern={new RegExp(/[{a-zA-Z]/)}
                label={'Name eines Landes (engl.)'}
                warnmsg={'Ungueltige Eingabe'}
                errormsg={'Huch, ein Fehler ist aufgetreten.'}
                onLoad={(choice: string) => load1(choice)}
                onQuery={(needle: string) => query1(needle)}
                onInput={(value: string) =>  setState({ ...state, input1: value })}
            />

            <hr className="mv4" />

            <p>
                <strong>Freies Eingabefeld mit Platzhaltersuche.</strong><br />
                Entweder über Button auf rechter Seite oder durch Eingabe von <code>{'{{'}</code> die Suche aufrufen.<br />
                Eingabe: <em>{state.input2 || '-'}</em>
            </p>
            <FuzzyInput
                inText={{
                    prefix: '{{',
                    suffix: '}}'
                }}
                minLength={1}
                id="example-2"
                withButton={true}
                label={'Irgendwas'}
                value={state.input2}
                warnmsg={'Ungueltige Eingabe'}
                pattern={new RegExp(/[{a-zA-Z]/)}
                errormsg={'Huch, ein Fehler ist aufgetreten.'}
                onLoad={(choice: string) => load2(choice)}
                onQuery={(needle: string) => query2(needle)}
                onInput={(value: string) =>  setState({ ...state, input2: value })}
            />
        </div>
    );
};

export default Demo;