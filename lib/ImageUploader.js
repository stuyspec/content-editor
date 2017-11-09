import React from "react";
import Dropzone from "react-dropzone"
import { uploadImage } from "./utils";

const ImageUploader = ({ addImageToState, uploadData }) => {
  const handleDrop = acceptedFiles => {
    const attachment = acceptedFiles[0];
    uploadImage(uploadData, attachment, response => {
      addImageToState(response.data);
    });
  };
  return(
    <div>
      Drop your image here:
      <Dropzone onDrop={handleDrop}/>
    </div>
  );
}

export default ImageUploader;