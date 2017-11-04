import React, { Component } from 'react';

class AddImage extends Component {
  // Start the popover closed
  state = {
    url: '',
    open: false,
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount () {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
  }

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addImage = () => {
    const {editorState, onChange} = this.props;
    onChange(this.props.modifier(editorState, this.state.url));
  };


  changeUrl = (evt) => {
    this.setState({url: evt.target.value});
  }

  render () {
    return (
      <div>
        <button
          onMouseUp={this.openPopover}
          type="button"
        >
          +
        </button>
        <div
          onClick={this.onPopoverClick}
        >
          <input
            type="text"
            placeholder="Paste the image url …"
            onChange={this.changeUrl}
            value={this.state.url}
          />
          <button
            type="button"
            onClick={this.addImage}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
export default AddImage;