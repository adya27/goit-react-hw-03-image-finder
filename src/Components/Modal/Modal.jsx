import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
  }

  onKeyDown = (e) => {
    const { closeModal } = this.props;
    if (e.code === "Escape") {
      closeModal();
    }
  };

  onClickOverlay = (e) => {
    const { closeModal } = this.props;

    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  render() {
    const { largeImageURL } = this.props;

    return createPortal(
      <div onClick={this.onClickOverlay} className="Overlay">
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
