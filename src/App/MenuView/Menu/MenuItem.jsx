import React from 'react';
import Radium from 'radium';

import Icon from '../../components/Icon.jsx';

export default Radium(class Menu extends React.Component {
  render () {
    if (this.props.type === 'item') {
      let icon;
      if (this.props.icon) {
        icon = <Icon name={this.props.icon}
                     wrapped
                     size={this.props.theme.menu.item['icon-size']}
                     style={{
                       width: this.props.theme.menu.item['icon-size'],
                       height: this.props.theme.menu.item['icon-size'],
                       marginRight: this.props.theme.menu.item['space-after-icon']
                     }} />;
      }

      return <li className='m-menu-item'
                 name={this.props.name}
                 onClick={e => this.props.onClick(e, this.props.name)}
                 style={{
                         padding: this.props.theme.menu.item['padding'],
                         width: this.props.theme.menu.item['width'],
                         height: this.props.theme.menu.item['height'],
                         lineHeight: this.props.theme.menu.item['height'],
                         background: (
                           this.props.selected
                           ? this.props.theme.menu.item.selected['background']
                           : this.props.theme.menu.item['background']
                         ),
                         color: (
                           this.props.selected
                           ? this.props.theme.menu.item.selected['color']
                           : this.props.theme.menu.item['color']
                         ),
                         listStyle: 'none',
                         WebkitUserSelect: 'none',
                         cursor: 'default',
                         transition: this.props.theme.menu.item['transition'],
                         ':hover': {
                           background: this.props.theme.menu.item.hover['background'] || this.props.theme.menu.item['background'],
                           color: this.props.theme.menu.item.hover['color'] || this.props.theme.menu.item['color']
                         },
                         ':active': {
                           background: this.props.theme.menu.item.active['background'] || this.props.theme.menu.item['background'],
                           color: this.props.theme.menu.item.active['color'] || this.props.theme.menu.item['color']
                         }
                       }}>
                 {icon}
                 {this.props.text}
             </li>;
    } else if (this.props.type === 'divider') {
      return <li className='m-menu-divider'
                 style={{
                         width: '100%',
                         listStyle: 'none',
                         height: '0',
                         marginTop: `calc(${this.props.theme.menu.divider['height']} / 2)`,
                         marginBottom: `calc(${this.props.theme.menu.divider['height']} / 2)`,
                         borderTop: this.props.theme.menu.divider['border']
                       }} />;
    }
  }
});
