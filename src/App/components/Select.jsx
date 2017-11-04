import React from 'react';
import Radium from 'radium';

export default Radium(class Select extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  getValue () {
    return this.select.value;
  }

  setValue (value) {
    this.select.value = value;
    this.setState({
      value: value
    });
  }

  onChange = () => {
    this.setState({
      value: this.select.value
    });
    this.props.onChange();
  }

  render () {
    let style = Object.assign({
      minWidth: this.props.theme.components.select['min-width'],
      padding: this.props.theme.components.select['padding'],
      color: this.props.theme.components.select['color'],
      background: this.props.theme.components.select['background'],
      border: this.props.theme.components.select['border'],
      fontSize: this.props.theme.components.select['font-size'],
      fontFamily: this.props.theme.components.select['font-family'],
      letterSpacing: this.props.theme.components.select['letter-spacing'],
      textTransform: this.props.theme.components.select['text-transform'],
      transition: this.props.theme.components.select['transition'],
      marginRight: this.props.theme.components.select['spacing-x'],
      marginBottom: this.props.theme.components.select['spacing-y'],
      display: 'inline-block',
      textAlign: this.props.align || 'left',
      outline: 'none',
      WebkitUserSelect: 'none',
      ':hover': {
        color: this.props.theme.components.select.hover['color'] || this.props.theme.components.select['color'],
        background: this.props.theme.components.select.hover['background'] || this.props.theme.components.select['background'],
        border: this.props.theme.components.select.hover['border'] || this.props.theme.components.select['border']
      },
      ':active': {
        color: this.props.theme.components.select.active['color'] || this.props.theme.components.select['color'],
        background: this.props.theme.components.select.active['background'] || this.props.theme.components.select['background'],
        border: this.props.theme.components.select.active['border'] || this.props.theme.components.select['border']
      },
      ':last-of-type': {
        marginRight: 0
      }
    }, this.props.style);

    let options = this.props.children.map((item, i) => {
      return (
        <option key={i}
                value={item.value}>
          {item.text}
        </option>
      );
    });

    return (
      <select className='m-components-select'
              style={style}
              ref={obj => (this.select = obj)}
              value={this.state.value}
              onChange={this.onChange}>
        {options}
      </select>
    );
  }
});
