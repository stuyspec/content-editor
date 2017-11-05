import React from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";

const ImageMenu = ({
  images,
  addImageToContent,
  addImageToState,
}) =>
  <div>
    <div>
      {images.map(image =>
        <ImagePreview
          key={image.id}
          src={image.thumb_attachment_url}
          addImageToContent={addImageToContent}
        />
      )}
    </div>
    <ImageUploader addImageToState={addImageToState} />
  </div>;

export default ImageMenu;
