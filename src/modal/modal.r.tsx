import React, { FunctionComponent, useEffect } from "react";
import Sizes from "./modal.sizes";

//--- Types -----

type Props = {
  size?: Sizes;
  title: string;
  footer?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  withCloseText?: boolean;
  preventOverflowHidden?: boolean;
  allowBgClickToClose?: boolean;
  toggle?: (e?) => void;
};

//--- Komponente -----

export const Modal: FunctionComponent<Props> = (props) => {
  const { size, content, children, toggle } = props;

  useEffect(() => {
    if (!content && !React.Children.count(children)) {
      throw "Modal without Content?";
    } else if (size && ![...Object.values(Sizes)].includes(size)) {
      throw "Unknown size value given";
    }

    function onKeyDown(e) {
      // esc key down
      if (e.keyCode === 27) {
        toggle?.();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    const $body = document.querySelector("body") as HTMLElement;
    if ($body && !props.preventOverflowHidden) {
      $body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if ($body) {
        $body.style.overflow = "";
      }
    };
  }, []);

  return (
    <>
      <div className={`modal modal--visible ${props.size || ""}`}>
        <div className="modal__header">
          <span className="modal__headline">{props.title || ""}</span>
          {props.toggle && (
            <a className="modal__toggle" href="#" onClick={props.toggle}>
              {props.withCloseText && (
                <span className="desktop-only">schließen</span>
              )}
              <i className="fas fa-times-circle"></i>
            </a>
          )}
        </div>

        <div className="modal__content">{props.content || props.children}</div>

        {props.footer && <div className="modal__footer tr">{props.footer}</div>}
      </div>
      <div
        onClick={props.allowBgClickToClose && toggle}
        className="modal__bg"
      />
    </>
  );
};

export default Modal;
