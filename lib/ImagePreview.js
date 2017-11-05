import React from "react";

const ImagePreview = ({ image, addImageToContent }) =>
  <div onClick={() => {
    addImageToContent(image.medium_attachment_url)
  }}>
    <img src={image.thumb_attachment_url} />
  </div>;

export default ImagePreview;
