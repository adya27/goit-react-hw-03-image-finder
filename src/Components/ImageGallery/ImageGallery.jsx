import React, { Component } from "react";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
  //   console.log(match);
  onClick = (data) => {
    this.props.onClick(data);
  };

  render() {
    const { match } = this.props;
    return (
      <ul className="ImageGallery">
        {match.map((image) => {
          return (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onClick={this.onClick}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
