import React, { useEffect } from "react";

type PropsType = {
  isOpen: boolean;
  openCloseModal: () => void;
  children: React.ReactNode;
};

const Modal = (props: PropsType) => {
  useEffect(() => {
    if (props.isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [props.isOpen]);

  return (
    <dialog
      className="w-full h-screen m-0 p-0 z-20 bg-modal-transparent"
      open={props.isOpen}
    >
      <div className="w-5/6 max-w-xl m-auto bg-white rounded-md">
        <span
          className="text-red-500 -mt-2 float-right text-3xl font-bold cursor-pointer"
          onClick={props.openCloseModal}
        >
          &times;
        </span>
        <div className="m-3">{props.children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
