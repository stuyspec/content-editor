import React, { Component } from "react";
import { RichUtils } from "draft-js";
import injectSheet from "react-jss";

import Toolbar from "./Toolbar";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import ImageMenu from "./ImageMenu";

import createEntityPropsPlugin from "draft-js-entity-props-plugin";
import createAutoListPlugin from "draft-js-autolist-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createUndoPlugin from "draft-js-undo-plugin";

import { stateToHTML } from "draft-js-export-html";

const autoListPlugin = createAutoListPlugin();
const entityPlugin = createEntityPropsPlugin();
const focusPlugin = createFocusPlugin();
const linkifyPlugin = createLinkifyPlugin();
const undoPlugin = createUndoPlugin();

const decorator = composeDecorators(focusPlugin.decorator);

const imagePlugin = createImagePlugin({ decorator });
const { UndoButton, RedoButton } = undoPlugin;
const plugins = [
  autoListPlugin,
  entityPlugin,
  focusPlugin,
  imagePlugin,
  linkifyPlugin,
  undoPlugin
];

const styles = {
  contentEditor: {
    display: "flex",
    flexDirection: "column",
    borderCollapse: "collapse",
    border: "1px solid lightgray",
    maxWidth: "600px",
    maxHeight: "600px",
    overflow: "auto"
  },
  toolbar: {
    flex: "1"
  },
  editor: {
    display: "block",
    border: "1px solid lightgray",
    fontFamily: "Minion Pro",
    padding: "20px"
  },
  submit: {
    background: "transparent",
    margin: "10px",
    padding: "5px",
    maxWidth: "80px",
    '&:hover': {
      backgroundColor: "lightgray"
    }
  }
};

class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageMenuOpen: false,
      rawHTML: ""
    };
  }

  handleSubmit = () => {
    const { editorState } = this.props;
    console.log(stateToHTML(editorState.getCurrentContent()));
  };

  toggleImageMenu = () => {
    this.setState({ isImageMenuOpen: !this.state.isImageMenuOpen });
  };

  addImageToContent = imageSrc => {
    const { onChange, editorState } = this.props;
    onChange(imagePlugin.addImage(editorState, imageSrc));
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      // Update state
      this.props.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const {
      editorState,
      classes,
      onChange,
      uploadData,
      images,
      addImage,
      endpoint
    } = this.props;
    const { isImageMenuOpen, rawHTML } = this.state;
    return (
      <div className={classes.contentEditor}>
        <div className={classes.toolbar}>
          <Toolbar
            onChange={onChange}
            editorState={editorState}
            toggleImageMenu={this.toggleImageMenu}
            UndoButton={UndoButton}
            RedoButton={RedoButton}
          />
        </div>
        {isImageMenuOpen && (
          <ImageMenu
            endpoint={endpoint}
            uploadData={uploadData}
            addImageToState={addImage}
            addImageToContent={this.addImageToContent}
            images={images}
          />
        )}
        <div className={classes.editor} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
        <button className={classes.submit} onClick={this.handleSubmit}>
          Submit
        </button>
        <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
      </div>
    );
  }
}

export default injectSheet(styles)(ContentEditor);
