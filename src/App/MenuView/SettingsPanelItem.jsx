import React from 'react';
import Radium from 'radium';

export default Radium(class SettingsPanelItem extends React.Component {
  render () {
    let style = Object.assign({
      width: '100%',
      height: this.props.theme.settings.item['height']
    }, this.props.style);

    return (
      <div className='m-settings-item'
           style={style}>
        <div className='m-settings-item-label'
             style={{
               width: this.props.theme.settings.item.label['width'],
               maxWidth: this.props.theme.settings.item.label['max-width'],
               height: '100%',
               fontSize: this.props.theme.settings.item.label['font-size'],
               fontFamily: this.props.theme.settings.item.label['font-family'],
               color: this.props.theme.settings.item.label['color'],
               background: this.props.theme.settings.item.label['background'],
               display: 'inline-block',
               WebkitUserSelect: 'none',
               cursor: 'default'
             }}>
          {this.props.label}
        </div>
        <div className='m-settings-item-control'
             style={{
               width: this.props.theme.settings.item.control['width'],
               height: '100%',
               display: 'inline-block'
             }}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
