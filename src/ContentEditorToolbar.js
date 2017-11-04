import React from "react";
import { uploadImage } from "./utils";
import { RichUtils } from "draft-js";
import { FaBold, FaItalic, FaUnderline } from "react-icons/lib/fa";
import Dropzone from "react-dropzone";

const ContentEditorToolbar = ({
  addImage,
  classes,
  handleChange,
  editorState
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

  const handleDrop = acceptedFiles => {
    const attachment = acceptedFiles[0];
    uploadImage(attachment, response => {
      handleChange(addImage(editorState, response.data.medium_attachment_url));
    });
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
      </span>
      <Dropzone onDrop={handleDrop} />
    </div>
  );
};

export default ContentEditorToolbar;
