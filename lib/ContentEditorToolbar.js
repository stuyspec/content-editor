import React from "react";
import { RichUtils } from "draft-js";
import ImageMenu from "./ImageMenu";
import { FaBold, FaItalic, FaUnderline, FaImage } from "react-icons/lib/fa";

const ContentEditorToolbar = ({
  addImageToState,
  addImageToContent,
  images,
  classes,
  handleChange,
  editorState,
  isImageMenuOpen,
  toggleImageMenu
}) => {
  const handleStyleChange = style => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };
  const handleBoldClick = event => {
    event.preventDefault();
    handleStyleChange("BOLD");
  };

  const handleItalicClick = event => {
    event.preventDefault();
    handleStyleChange("ITALIC");
  };

  const handleUnderlineClick = event => {
    event.preventDefault();
    handleStyleChange("UNDERLINE");
  };

  return (
    <div>
      <span className={classes.toolbar}>
        <button onClick={handleBoldClick}>
          {" "}<FaBold />{" "}
        </button>
        <button onClick={handleItalicClick}>
          {" "}<FaItalic />{" "}
        </button>
        <button onClick={handleUnderlineClick}>
          {" "}<FaUnderline />{" "}
        </button>
        <button onClick={toggleImageMenu}>
          <FaImage />
        </button>
      </span>
      {isImageMenuOpen &&
        <ImageMenu
          addImageToState={addImageToState}
          addImageToContent={addImageToContent}
          images={images}
          handleChange={handleChange}
        />}
    </div>
  );
};

export default ContentEditorToolbar;
