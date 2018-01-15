import React from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import Grid from "react-css-grid"
import injectSheet from "react-jss"

const styles = {
  imageGrid: {
    maxHeight: "300px",
    border: "1px solid lightgray",
    borderCollapse: "collapse",
    overflow: "auto"
  }
}

const ImageMenu = ({
  classes,
  uploadData,
  endpoint,
  images,
  addImageToContent,
  addImageToState
}) =>
  <div>
      <Grid width={230} gap={24} className={classes.imageGrid}>
      {images.map(image =>
        <ImagePreview
          key={image.id}
          image={image}
          addImageToContent={addImageToContent}
        />
      )}
      </Grid>
    <ImageUploader
      addImageToState={addImageToState}
      endpoint={endpoint}
      uploadData={uploadData}
    />
  </div>;

export default injectSheet(styles)(ImageMenu);
