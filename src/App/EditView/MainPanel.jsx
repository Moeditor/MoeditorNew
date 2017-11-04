import React from 'react';
import Radium from 'radium';

import Cover from '../components/Cover.jsx';

export default Radium(class Panel extends React.Component {
  render () {
    let wrapperStyle = Object.assign({
      position: 'relative'
    }, this.props.style);

    let innerStyle = {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden'
    };

    return (
      <div className='m-main-panel-wrapper'
           style={wrapperStyle}>
        <Cover color={this.props.background}
               scrollbarWidth={this.props.theme.menuView.panel['scrollbar-width']}
               percentage='35%' />
        <div className='m-main-panel-inner'
             style={innerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
