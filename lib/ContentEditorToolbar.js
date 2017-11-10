import React from "react";
import { RichUtils } from "draft-js";
import { FaBold, FaItalic, FaUnderline, FaImage } from "react-icons/lib/fa";

const ContentEditorToolbar = ({
  classes,
  onChange,
  editorState,
  toggleImageMenu,
  UndoButton,
  RedoButton
}) => {
  const handleStyleChange = style => {
    onChange(RichUtils.toggleInlineStyle(editorState, style));
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
        <UndoButton/>
        <RedoButton/>
      </span>
    </div>
  );
};

export default ContentEditorToolbar;
