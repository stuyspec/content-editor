import React, { Component } from "react";
import axios from "axios";
import { EditorState } from "draft-js";
import ContentEditor from "../lib/ContentEditor";

const data = {
  article_id: 23,
  user_id: 1,
  title: "The Quick Brown Fox Jumps Over The Lazy Dog"
};
const ENDPOINT = "http://localhost:3000/media"

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
    axios.get(ENDPOINT).then(response => {
      this.setState({ images: response.data });
    });
  };

  render() {
    return (
      <div>
        <ContentEditor
          uploadData={data}
          endpoint={ENDPOINT}
          onChange={this.handleChange}
          images={this.state.images}
          addImage={this.addImageToState}
          editorState={this.state.editorState}
        />
      </div>
    );
  }
}

export default App;
