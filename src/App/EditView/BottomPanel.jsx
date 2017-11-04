import React from 'react';
import Radium from 'radium';

export default Radium(class BottomPanel extends React.Component {
  render () {
    return (
      <div className='m-bottom-panel' style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
});
