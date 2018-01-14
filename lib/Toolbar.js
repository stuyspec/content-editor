import React from "react";
import { RichUtils } from "draft-js";
import { FaBold, FaItalic, FaUnderline, FaImage } from "react-icons/lib/fa";
import injectSheet from "react-jss";

const styles = {
  button: {
    padding: "8px",
    background: "transparent",
    "&:hover": {
      backgroundColor: "lightgray"
    }
  },
  toolbar: {
    borderCollapse: "collapse",
    display: "block",
    margin: "0",
    padding: "0.4em",
    border: "1px solid lightgray",
    backgroundColor: "#f7f7f7",
  }
};

const Toolbar = ({
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
        <button className={classes.button} onClick={handleBoldClick}>
          <FaBold />
        </button>
        <button className={classes.button} onClick={handleItalicClick}>
          <FaItalic />
        </button>
        <button className={classes.button} onClick={handleUnderlineClick}>
          <FaUnderline />
        </button>
        <button className={classes.button} onClick={toggleImageMenu}>
          <FaImage />
        </button>
        <UndoButton className={classes.button} />
        <RedoButton className={classes.button} />
      </span>
    </div>
  );
};

export default injectSheet(styles)(Toolbar);
