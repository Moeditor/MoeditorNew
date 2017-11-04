import React from 'react';
import Radium from 'radium';

export default Radium(class Cover extends React.Component {
  render () {
    let style = Object.assign({
      width: `calc(100% - ${this.props.scrollbarWidth || '0px'})`,
      height: '40px',
      position: 'absolute',
      zIndex: '10',
      top: this.props.top,
      left: this.props.left,
      right: this.props.right,
      bottom: this.props.bottom,
      background: `linear-gradient(to bottom, ${this.props.color} ${this.props.percentage}, transparent)`
    }, this.props.style);
    return <div className='m-components-cover' style={style} />;
  }
});
