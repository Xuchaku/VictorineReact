import React, { ReactNode, FC } from "react";
import Button from "../Button/Button";
import { BackgroundHashMap } from "../../constants/constants";
import "./Modal.scss";
type ModalProps = {
  type: "error" | "default" | "help";
  children: string | ReactNode;
  statusResponseCloseHandler: () => void;
};
const Modal: FC<ModalProps> = ({
  type,
  children,
  statusResponseCloseHandler,
  ...props
}) => {
  function closeModal() {
    statusResponseCloseHandler();
  }
  return (
    <div className={`FadedBlock`}>
      <div {...props} className={`Modal ${type}`}>
        <p>{children}</p>
        <Button background={BackgroundHashMap[type]} onClick={closeModal}>
          Окей
        </Button>
      </div>
    </div>
  );
};

export default Modal;
