import React from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";

const ImageMenu = ({
  uploadData,
  endpoint,
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
    <ImageUploader
      addImageToState={addImageToState}
      endpoint={endpoint}
      uploadData={uploadData}
    />
  </div>;

export default ImageMenu;
