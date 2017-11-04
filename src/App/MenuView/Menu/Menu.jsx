import React from 'react';
import Radium from 'radium';

import MenuItem from './MenuItem.jsx';

export default Radium(class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  setSelected (name) {
    this.setState({
      selected: name
    });
  }

  render () {
    let items = this.props.items.map((item, i) => (
      <MenuItem key={i}
                theme={this.props.theme} appConfig={this.props.appConfig}
                onClick={this.props.onItemClick}
                type={item.type}
                name={item.name}
                text={item.text}
                selected={item.name === this.state.selected}
                icon={item.icon} />
    ));

    let style = Object.assign({
      fontFamily: this.props.theme.menu['font-family'],
      fontSize: this.props.theme.menu['font-size'],
      background: this.props.theme.menu['background'],
      color: this.props.theme.menu['color'],
      margin: '0',
      paddingLeft: '0',
      paddingTop: `calc(${this.props.theme.menu.divider['height']} / 2)`,
      borderTop: this.props.theme.menu.divider['border'],
      width: '100%',
      height: `calc(100% - ${this.props.theme.menu.divider['height']} / 2)`
    }, this.props.style);

    return (
      <ul className='m-menu' style={style}>
        {items}
      </ul>
    );
  }
});
