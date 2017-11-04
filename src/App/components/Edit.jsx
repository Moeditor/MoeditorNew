import React from 'react';
import Radium from 'radium';

export default Radium(class Edit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  getValue () {
    return this.edit.value;
  }

  setValue (value) {
    this.edit.value = value;
    this.setState({
      value: value
    });
  }

  onChange = () => {
    this.setState({
      value: this.edit.value
    });
    this.props.onChange();
  }

  render () {
    let style = Object.assign({
      minWidth: this.props.theme.components.edit['min-width'],
      padding: this.props.theme.components.edit['padding'],
      color: this.props.theme.components.edit['color'],
      background: this.props.theme.components.edit['background'],
      border: this.props.theme.components.edit['border'],
      fontSize: this.props.theme.components.edit['font-size'],
      fontFamily: this.props.theme.components.edit['font-family'],
      letterSpacing: this.props.theme.components.edit['letter-spacing'],
      textTransform: this.props.theme.components.edit['text-transform'],
      transition: this.props.theme.components.edit['transition'],
      marginRight: this.props.theme.components.edit['spacing-x'],
      marginBottom: this.props.theme.components.edit['spacing-y'],
      display: 'inline-block',
      textAlign: this.props.align || 'left',
      outline: 'none',
      boxSizing: 'border-box',
      WebkitUserSelect: 'none',
      ':hover': {
        color: this.props.theme.components.edit.hover['color'] || this.props.theme.components.edit['color'],
        background: this.props.theme.components.edit.hover['background'] || this.props.theme.components.edit['background'],
        border: this.props.theme.components.edit.hover['border'] || this.props.theme.components.edit['border']
      },
      ':active': {
        color: this.props.theme.components.edit.active['color'] || this.props.theme.components.edit['color'],
        background: this.props.theme.components.edit.active['background'] || this.props.theme.components.edit['background'],
        border: this.props.theme.components.edit.active['border'] || this.props.theme.components.edit['border']
      },
      ':last-of-type': {
        marginRight: 0
      }
    }, this.props.style);

    return (
      <input className='m-components-edit'
             type='text'
             style={style}
             ref={obj => (this.edit = obj)}
             value={this.state.value}
             onChange={this.onChange} />
    );
  }
});
