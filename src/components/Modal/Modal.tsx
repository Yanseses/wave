import { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('modal') as HTMLDivElement;

export const Modal: FC<PropsWithChildren> = ({ children }) => {
  return ReactDOM.createPortal(
    <ModalOverlay>
      { children }
    </ModalOverlay>
  , modalRoot
  )
}