import React, { Component } from "react";
import { RichUtils } from "draft-js";
import injectSheet from "react-jss";

import ContentEditorToolbar from "./ContentEditorToolbar";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import ImageMenu from "./ImageMenu";


import createEntityPropsPlugin from "draft-js-entity-props-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createImagePlugin from "draft-js-image-plugin";

import { stateToHTML } from "draft-js-export-html"

const entityPlugin = createEntityPropsPlugin();
const focusPlugin = createFocusPlugin();
const linkifyPlugin = createLinkifyPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  focusPlugin,
  entityPlugin,
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

class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageMenuOpen: false,
      images: [],
      rawHTML: ""
    };
  }

  handleSubmit = () => {
    const { editorState } = this.props;
    // For testing purposes
    console.log(stateToHTML(editorState));
  }

  toggleImageMenu = () => {
    this.setState({ isImageMenuOpen: !this.state.isImageMenuOpen });
  };

  addImageToState = image => {
    const { images } = this.state;
    this.setState({ images: [...images, image] });
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
    const { editorState, classes, onChange } = this.props;
    const { isImageMenuOpen, images, rawHTML } = this.state;
    return (
      <div className={classes.contentEditorWrapper}>
        <ContentEditorToolbar
          addImageToState={this.addImageToState}
          addImageToContent={this.addImageToContent}
          images={images}
          isImageMenuOpen={isImageMenuOpen}
          toggleImageMenu={this.toggleImageMenu}
          editorState={editorState}
          classes={classes}
          onChange={onChange}
        />
        {isImageMenuOpen &&
          <ImageMenu
            addImageToState={this.addImageToState}
            addImageToContent={this.addImageToContent}
            images={images}
          />}
        <div className={classes.contentEditor} onClick={this.focus}>
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
        <button onClick={this.handleSubmit}> Submit </button>
        <div dangerouslySetInnerHTML={{__html: rawHTML}} />
      </div>
    );
  }
}

export default injectSheet(styles)(ContentEditor);
