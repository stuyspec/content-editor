import React from "react";
import injectSheet from "react-jss";

const styles = {
  imagePreview: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    border: "1px solid transparent",
    '&:hover': {
      border: "1px solid lightgray"
    }
  }
};

const ImagePreview = ({ classes, image, addImageToContent }) => (
  <div
    className={classes.imagePreview}
    onClick={() => {
      addImageToContent(image.medium_attachment_url);
    }}
  >
    <img src={image.thumb_attachment_url} />
  </div>
);

export default injectSheet(styles)(ImagePreview);
