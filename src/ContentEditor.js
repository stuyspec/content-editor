import React from "react";
import { RichUtils } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createEntityPropsPlugin from "draft-js-entity-props-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createImagePlugin from "draft-js-image-plugin";
import AddImage from "./AddImage";
import injectSheet from "react-jss";
import ContentEditorToolbar from "./ContentEditorToolbar";

const entityPlugin = createEntityPropsPlugin();
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const linkifyPlugin = createLinkifyPlugin();

const decorator = composeDecorators(
  alignmentPlugin.decorator,
  focusPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const { AlignmentTool } = alignmentPlugin;

const plugins = [
  alignmentPlugin,
  entityPlugin,
  focusPlugin,
  imagePlugin,
  linkifyPlugin
];

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
      <AddImage
        editorState={editorState}
        onChange={onChange}
        modifier={imagePlugin.addImage}
      />
      <div className={classes.contentEditor}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default injectSheet(styles)(ContentEditor);
