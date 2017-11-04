import React from 'react';
import Radium from 'radium';

import Icon from './Icon.jsx';

export default Radium(class Button extends React.Component {
  onClick = e => {
    if (this.props.href) {
      app.openLink(this.props.href);
    } else if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render () {
    let size = this.props.size || 'medium';
    let style = Object.assign({
      minWidth: this.props.theme.components.button[size]['min-width'],
      minHeight: this.props.theme.components.button[size]['min-height'],
      padding: this.props.theme.components.button[size]['padding'],
      color: this.props.theme.components.button['color'],
      background: this.props.theme.components.button['background'],
      border: this.props.theme.components.button['border'],
      fontSize: this.props.theme.components.button[size]['font-size'],
      fontFamily: this.props.theme.components.button['font-family'],
      letterSpacing: this.props.theme.components.button['letter-spacing'],
      textTransform: this.props.theme.components.button['text-transform'],
      transition: this.props.theme.components.button['transition'],
      marginRight: this.props.theme.components.button[size]['spacing-x'],
      marginBottom: this.props.theme.components.button[size]['spacing-y'],
      cursor: 'default',
      WebkitUserSelect: 'none',
      display: 'inline-block',
      textAlign: 'center',
      ':hover': {
        color: this.props.theme.components.button.hover['color'] || this.props.theme.components.button['color'],
        background: this.props.theme.components.button.hover['background'] || this.props.theme.components.button['background'],
        border: this.props.theme.components.button.hover['border'] || this.props.theme.components.button['border']
      },
      ':active': {
        color: this.props.theme.components.button.active['color'] || this.props.theme.components.button['color'],
        background: this.props.theme.components.button.active['background'] || this.props.theme.components.button['background'],
        border: this.props.theme.components.button.active['border'] || this.props.theme.components.button['border']
      },
      ':last-of-type': {
        marginRight: 0
      }
    }, this.props.style);

    let icon = null;
    if (this.props.icon) {
      icon = <Icon name={this.props.icon}
                   size={this.props.theme.components.button['icon-size']}
                   wrapped
                   style={{
                     marginRight: this.props.theme.components.button[size]['space-after-icon']
                   }} />;
    }

    return (
      <div className='m-components-button'
           style={style}
           onClick={this.onClick}>
        {icon}
        {this.props.children}
      </div>
    );
  }
});
