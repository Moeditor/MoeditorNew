import React from 'react';
import Radium from 'radium';

export default Radium(class Image extends React.Component {
  onDragStart = e => {
    e.preventDefault();
  }

  render () {
    return (
      <img style={this.props.style}
           src={this.props.src}
           width={this.props.width}
           height={this.props.height}
           onDragStart={this.onDragStart} />
    );
  }
});
