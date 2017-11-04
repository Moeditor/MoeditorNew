import React from 'react';
import Radium from 'radium';

import Icon from './Icon.jsx';

export default Radium(class Checkbox extends React.Component {
  constructor (props) {
    super(props);
    this.checked = !!props.defaultChecked;
    this.state = {
      checked: this.checked
    };
  }

  onClick = () => {
    this.checked = !this.checked;
    this.setState({
      checked: this.checked
    });
    this.props.onChange();
  }

  getChecked () {
    return this.checked;
  }

  setChecked (checked) {
    this.checked = checked;
    this.setState({
      checked: checked
    });
  }

  render () {
    let style = Object.assign({
      minWidth: this.props.theme.components.checkbox['min-width'],
      height: this.props.theme.components.checkbox['min-height'],
      padding: this.props.theme.components.checkbox['padding'],
      color: (
        this.state.checked
        ? this.props.theme.components.checkbox.checked['color']
        : this.props.theme.components.checkbox['color']
      ),
      fontSize: this.props.theme.components.checkbox['font-size'],
      fontFamily: this.props.theme.components.checkbox['font-family'],
      letterSpacing: this.props.theme.components.checkbox['letter-spacing'],
      textTransform: this.props.theme.components.checkbox['text-transform'],
      transition: this.props.theme.components.checkbox['transition'],
      marginRight: this.props.theme.components.checkbox['spacing-x'],
      marginBottom: this.props.theme.components.checkbox['spacing-y'],
      cursor: 'default',
      WebkitUserSelect: 'none',
      display: 'inline-block',
      textAlign: 'left',
      ':hover': {
        color: this.props.theme.components.checkbox.hover['color'] || this.props.theme.components.checkbox['color']
      },
      ':active': {
        color: this.props.theme.components.checkbox.active['color'] || this.props.theme.components.checkbox['color']
      },
      ':last-of-type': {
        marginRight: 0
      }
    }, this.props.style);

    let icon = <Icon style={{
                             visibility: this.state.checked ? 'visible' : 'hidden',
                             display: 'block'
                           }}
                     size={this.props.theme.components.checkbox['icon-size']}
                     name='check' />;

    let iconBox;
    if (Radium.getState(this.state, 'wrapper', ':active')) {
      iconBox = <div style={{
                             display: 'inline-block',
                             width: this.props.theme.components.checkbox['icon-size'],
                             height: this.props.theme.components.checkbox['icon-size'],
                             padding: this.props.theme.components.checkbox.icon['padding'],
                             color: this.props.theme.components.checkbox.icon.active['color'] || this.props.theme.components.checkbox.icon['color'],
                             background: this.props.theme.components.checkbox.icon.active['background'] || this.props.theme.components.checkbox.icon['background'],
                             border: this.props.theme.components.checkbox.icon.active['border'] || this.props.theme.components.checkbox.icon['border'],
                             marginRight: this.props.theme.components.checkbox['space-after-icon']
                           }}>
                  {icon}
                </div>;
    } else if (Radium.getState(this.state, 'wrapper', ':hover')) {
      iconBox = <div style={{
                             display: 'inline-block',
                             width: this.props.theme.components.checkbox['icon-size'],
                             height: this.props.theme.components.checkbox['icon-size'],
                             padding: this.props.theme.components.checkbox.icon['padding'],
                             color: this.props.theme.components.checkbox.icon.hover['color'] || this.props.theme.components.checkbox.icon['color'],
                             background: this.props.theme.components.checkbox.icon.hover['background'] || this.props.theme.components.checkbox.icon['background'],
                             border: this.props.theme.components.checkbox.icon.hover['border'] || this.props.theme.components.checkbox.icon['border'],
                             marginRight: this.props.theme.components.checkbox['space-after-icon']
                           }}>
                  {icon}
                </div>;
    } else if (this.state.checked) {
      iconBox = <div style={{
                             display: 'inline-block',
                             width: this.props.theme.components.checkbox['icon-size'],
                             height: this.props.theme.components.checkbox['icon-size'],
                             padding: this.props.theme.components.checkbox.icon['padding'],
                             color: this.props.theme.components.checkbox.icon.checked['color'] || this.props.theme.components.checkbox.icon['color'],
                             background: this.props.theme.components.checkbox.icon.checked['background'] || this.props.theme.components.checkbox.icon['background'],
                             border: this.props.theme.components.checkbox.icon.checked['border'] || this.props.theme.components.checkbox.icon['border'],
                             marginRight: this.props.theme.components.checkbox['space-after-icon']
                           }}>
                  {icon}
                </div>;
    } else {
      iconBox = <div style={{
                             display: 'inline-block',
                             width: this.props.theme.components.checkbox['icon-size'],
                             height: this.props.theme.components.checkbox['icon-size'],
                             padding: this.props.theme.components.checkbox.icon['padding'],
                             color: this.props.theme.components.checkbox.icon['color'],
                             background: this.props.theme.components.checkbox.icon['background'],
                             border: this.props.theme.components.checkbox.icon['border'],
                             marginRight: this.props.theme.components.checkbox['space-after-icon']
                           }}>
                  {icon}
                </div>;
    }

    return (
      <div key='wrapper'
           className='m-components-checkbox'
           style={style}
           onClick={this.onClick}>
        {iconBox}
        {this.props.children}
      </div>
    );
  }
});
