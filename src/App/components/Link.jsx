import React from 'react';
import Radium from 'radium';

export default Radium(class Link extends React.Component {
  onClick = e => {
    e.preventDefault();
    if (this.props.href) {
      app.openLink(this.props.href);
    } else if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render () {
    return (
      <a style={this.props.style}
         href={this.props.href}
         onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
});
