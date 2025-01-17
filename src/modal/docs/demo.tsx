import { Item1 } from "./demo.content";
import React, { useState } from "react";
import Modal from "../modal.r";

//--- Komponente -----

export const Demo = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="modal-demo">
      <div className="box">
        <a
          href="#"
          title="Modal aufrufen"
          className="btn btn--link"
          onClick={(e) => {
            e.preventDefault();
            setShow(true);
          }}
        >
          Klick mich!
        </a>
      </div>

      {show && (
        <Modal
          title="Modal Demo"
          withCloseText={true}
          toggle={() => setShow(false)}
          preventOverflowHidden
          allowBgClickToClose
          content={
            <div>
              <Item1 />
            </div>
          }
          footer={
            <div className="tr">
              <button
                className="btn btn--secondary mr1"
                onClick={() => setShow(false)}
              >
                Abbrechen
              </button>
              <button
                className="btn btn--primary ml1"
                onClick={() => setShow(false)}
              >
                Verbindlich buchen
              </button>
            </div>
          }
        ></Modal>
      )}
    </div>
  );
};

export default Demo;
