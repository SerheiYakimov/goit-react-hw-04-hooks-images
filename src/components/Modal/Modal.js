import { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import s from "../Modal/Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    const { handleBackdropClick } = this;
    const { modalImg, tags } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <img src={modalImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  handleBackdropClick: PropTypes.func.isRequired,
  modalImg: PropTypes.string,
  tags: PropTypes.string,
};
