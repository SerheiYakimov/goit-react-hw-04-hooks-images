import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import s from "../Modal/Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({toggleModal, modalImg, tags}) {

    useEffect(
        () => {
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            }
        }
    )

    const handleKeyDown = (e) => {
        if (e.code === "Escape") {
            toggleModal();
        }
    };
    
    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            toggleModal();
        }
  };

  
    return createPortal(
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <img src={modalImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  
}

Modal.propTypes = {
  handleBackdropClick: PropTypes.func,
  modalImg: PropTypes.string,
  tags: PropTypes.string,
};