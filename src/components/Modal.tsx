import React from "react";

type PropsType = {
  open: boolean;
  openCloseModal: () => void;
  children: React.ReactNode;
};

const Modal = (props: PropsType) => {
  return (
    <dialog
      className="w-full h-full m-0 p-0 z-20 bg-modal-transparent"
      open={props.open}
    >
      <div className="w-5/6 max-w-xl h-auto m-auto bg-white rounded-md">
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
