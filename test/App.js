import React, { Component } from "react";
import { EditorState } from "draft-js";
import ContentEditor from "../lib/ContentEditor";

const data = {
  article_id: 1,
  user_id: 1
}
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
          uploadData={data}
          onChange={this.handleChange}
          editorState={this.state.editorState}
        />
      </div>
    );
  }
}

export default App;
