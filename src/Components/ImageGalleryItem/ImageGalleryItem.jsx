import React, { Component } from "react";

class ImageGalleryItem extends Component {
  state = {
    currentImg: "",
    showModal: false,
  };

 

  handleClick = (e) => {
    // console.log(e.currentTarget);
    this.setState({ currentImg: e.currentTarget.dataset.largesrc });
    // console.log(this.state.currentImg);
    // this.toggleModal();
    this.props.onClick(e.currentTarget.dataset.largesrc);
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.handleClick}
          data-largesrc={largeImageURL}
          src={webformatURL}
          alt=""
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
