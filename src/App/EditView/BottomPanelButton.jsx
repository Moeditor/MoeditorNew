import React from 'react';
import Radium from 'radium';

import Icon from '../components/Icon.jsx';

export default Radium(class BottomPanelButton extends React.Component {
  render () {
    let style = {
      display: 'inline-block',
      color: this.props.theme.bottomPanel.button['color'],
      margin: this.props.theme.bottomPanel.button['margin'],
      transition: this.props.theme.bottomPanel.button['transition'],
      ':hover': {
        color: this.props.theme.bottomPanel.button.hover['color'] || this.props.theme.bottomPanel.button['color']
      },
      ':active': {
        color: this.props.theme.bottomPanel.button.active['color'] || this.props.theme.bottomPanel.button['color']
      }
    };
    return <div className='m-bottom-panel-button'
                onClick={e => this.props.onClick(e, this.props.name)}
                style={style}>
             <Icon name={this.props.icon} size={this.props.theme.bottomPanel.button.size} />
           </div>;
  }
});
