import React from "react";
import { Editor, RichUtils } from "draft-js";
import injectSheet from "react-jss";
import ContentEditorToolbar from "./ContentEditorToolbar";

const styles = {
  contentEditorWrapper: {
    padding: "50px"
  },
  contentEditor: {
    borderStyle: "solid",
    borderWidth: "1px",
    maxWidth: "600px",
    padding: "20px"
  },
  toolbar: {
    padding: "10px"
  }
};

const ContentEditor = ({ classes, editorState, onChange }) => {
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      // Update state
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className={classes.contentEditorWrapper}>
      <ContentEditorToolbar
        editorState={editorState}
        classes={classes}
        handleChange={onChange}
      />
      <div className={classes.contentEditor}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default injectSheet(styles)(ContentEditor);
