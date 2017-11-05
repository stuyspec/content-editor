import React, { Component } from "react";
import { RichUtils } from "draft-js";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createEntityPropsPlugin from "draft-js-entity-props-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createImagePlugin from "draft-js-image-plugin";
import injectSheet from "react-jss";
import ContentEditorToolbar from "./ContentEditorToolbar";

//const alignmentPlugin = createAlignmentPlugin();
const entityPlugin = createEntityPropsPlugin();
const focusPlugin = createFocusPlugin();
const linkifyPlugin = createLinkifyPlugin();

const decorator = composeDecorators(
  //  alignmentPlugin.decorator,
  focusPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  //  alignmentPlugin,
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

class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageMenuOpen: false,
      images: []
    };
  }

  toggleImageMenu = () => {
    this.setState({ isImageMenuOpen: !this.state.isImageMenuOpen });
  };

  addImageToState = image => {
    const { images } = this.state;
    this.setState({ images: [...images, image] });
  };

  addImageToContent = imageSrc => {
    const { onChange } = this.props;
    const { editorState } = this.state;
    console.log(editorState);
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

  render() {
    const { value, classes, onChange } = this.props;
    const { isImageMenuOpen, images } = this.state;
    return (
      <div className={classes.contentEditorWrapper}>
        <ContentEditorToolbar
          addImageToState={this.addImageToState}
          addImageToContent={this.addImageToContent}
          images={images}
          isImageMenuOpen={isImageMenuOpen}
          toggleImageMenu={this.toggleImageMenu}
          editorState={value}
          classes={classes}
          handleChange={onChange}
        />
        <div className={classes.contentEditor}>
          <Editor
            editorState={value}
            onChange={onChange}
            plugins={plugins}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(ContentEditor);
