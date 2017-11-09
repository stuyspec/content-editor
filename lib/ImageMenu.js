import React from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";

const ImageMenu = ({
  uploadData,
  images,
  addImageToContent,
  addImageToState
}) =>
  <div>
    <div>
      {images.map(image =>
        <ImagePreview
          key={image.id}
          image={image}
          addImageToContent={addImageToContent}
        />
      )}
    </div>
    <ImageUploader addImageToState={addImageToState} uploadData={uploadData} />
  </div>;

export default ImageMenu;
