import React, { Component } from "react";
import { EditorState } from "draft-js";
import ContentEditor from "./ContentEditor";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    return (
      <div>
        <ContentEditor
          onChange={this.handleChange}
          editorState={this.state.editorState}
        />
      </div>
    );
  }
}

export default App;
