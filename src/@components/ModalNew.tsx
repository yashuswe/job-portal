import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: () => void;
  onClose: () => void;
  children: any;
}) => {
  const modalRoot = document.getElementById("modal-root");

  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!modalRoot || !isOpen) return;

    const el = elRef.current;
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [isOpen, modalRoot]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    elRef.current // Use the ref here
  );
};

export default Modal;
