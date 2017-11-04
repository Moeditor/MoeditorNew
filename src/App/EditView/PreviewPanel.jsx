import React from 'react';
import Radium from 'radium';

export default Radium(class PreviewPanel extends React.Component {
  getContainerElement () {
    return this.container;
  }

  getScrollerElement () {
    return this.wrapper;
  }

  render () {
    let style = {
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'scroll',
      margin: this.props.theme.preview['margin'],
      background: this.props.theme.preview['background']
    };
    return <div className='m-preview-panel'
                style={style}
                onScroll={this.props.onScroll}
                ref={obj => (this.wrapper = obj)}>
             <div className='m-container' ref={obj => (this.container = obj)} />
           </div>;
  }
});
