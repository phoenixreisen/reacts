import FooterIntern from '../footer.intern.r';
import Footer from '../footer.r';
import React from 'react';

//--- Komponente -----

export const Demo = () => {
    return (
        <div className="wrapper footer-demo">
            <h3 className="pt0">
                Öffentlicher Footer
            </h3>
            <Footer />

            <h3 className="mt4">
                Interner Footer
            </h3>
            <FooterIntern
                loggedIn={true}
                username="Max Mustermann"
            />      
        </div>
    );
};

export default Demo;