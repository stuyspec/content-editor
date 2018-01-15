import React from "react";
import Dropzone from "react-dropzone"
import { uploadImage } from "./utils";
import injectSheet from "react-jss"

const styles = {
  imageUploader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    fontFamily: "Helvetica Nueue, sans-serif",
    lineHeight: "1.5em"
  }
}

const ImageUploader = ({ addImageToState, classes, uploadData, endpoint }) => {
  const handleDrop = acceptedFiles => {
    const attachment = acceptedFiles[0];
    uploadImage(uploadData, endpoint, attachment, response => {
      addImageToState(response.data);
    });
  };
  return(
    <div className={classes.imageUploader}>
      Drop your image here:
      <Dropzone onDrop={handleDrop}/>
    </div>
  );
}

export default injectSheet(styles)(ImageUploader);