import React from 'react';
import Radium from 'radium';

import Cover from '../components/Cover.jsx';

export default Radium(class Panel extends React.Component {
  render () {
    let wrapperStyle = Object.assign({
      width: '100%',
      height: '100%',
      background: this.props.theme.menuView.panel['background'],
      position: 'relative'
    }, this.props.style);

    let innerStyle = {
      width: this.props.theme.menuView.panel['width'],
      height: this.props.theme.menuView.panel['height'],
      margin: this.props.theme.menuView.panel['margin'],
      padding: this.props.theme.menuView.panel['padding'],
      overflowY: 'auto'
    };

    return (
      <div style={wrapperStyle}>
        <Cover color={this.props.theme.menuView.panel['background']}
               scrollbarWidth={this.props.theme.menuView.panel['scrollbar-width']}
               percentage='50%' />
        <div style={innerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
