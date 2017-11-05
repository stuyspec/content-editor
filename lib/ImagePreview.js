import React from "react";

const ImagePreview = ({ src, addImageToContent }) =>
  <div onClick={() => {
    console.log("CLICKED");
    addImageToContent(src)
  }}>
    <img src={src} />
  </div>;

export default ImagePreview;
