import React from "react";
import { RichUtils } from "draft-js";
import { FaBold, FaItalic, FaUnderline } from "react-icons/lib/fa"

const ContentEditorToolbar = ({ classes, handleChange, editorState }) => {
  const handleStyleChange = style => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  }
  const handleBoldClick = event => {
    event.preventDefault();
    handleStyleChange("BOLD")
  };

  const handleItalicClick = event => {
    event.preventDefault();
    handleStyleChange("ITALIC")
  }

  const handleUnderlineClick = event => {
    event.preventDefault();
    handleStyleChange("UNDERLINE");
  }

  return (
    <span className={classes.toolbar}>
      <button onClick={handleBoldClick}> <FaBold/> </button>
      <button onClick={handleItalicClick}> <FaItalic/> </button>
      <button onClick={handleUnderlineClick}> <FaUnderline/> </button>
    </span>
  );
};


export default ContentEditorToolbar;