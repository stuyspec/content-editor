import React, { Component } from "react";
import axios from "axios";
import { EditorState } from "draft-js";
import ContentEditor from "../lib/ContentEditor";

const data = {
  article_id: 1,
  user_id: 1
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      images: []
    };
    this.fetchImages();
  }

  handleChange = editorState => {
    this.setState({ editorState });
  };

  addImageToState = image => {
    const { images } = this.state;
    this.setState({ images: [...images, image] });
  };

  fetchImages = () => {
    axios.get("http://localhost:3000/media").then(response => {
      this.setState({ images: response.data });
    });
  };

  render() {
    return (
      <div>
        <ContentEditor
          uploadData={data}
          onChange={this.handleChange}
          images={this.state.images}
          editorState={this.state.editorState}
        />
      </div>
    );
  }
}

export default App;
