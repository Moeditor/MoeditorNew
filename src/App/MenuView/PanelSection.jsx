import React from 'react';
import Radium from 'radium';

import Icon from '../components/Icon.jsx';

export default Radium(class PanelSection extends React.Component {
  render () {
    let titleStyle = {
      fontSize: this.props.theme.menuView.panel.section.title['font-size'],
      fontFamily: this.props.theme.menuView.panel.section.title['font-family'],
      color: this.props.theme.menuView.panel.section.title['color'],
      letterSpacing: this.props.theme.menuView.panel.section.title['letter-spacing'],
      textTransform: this.props.theme.menuView.panel.section.title['text-transform'],
      margin: this.props.theme.menuView.panel.section.title['margin'],
      padding: this.props.theme.menuView.panel.section.title['padding'],
      WebkitUserSelect: 'none',
      cursor: 'default'
    };

    let icon;
    if (this.props.icon) {
      icon = <Icon name={this.props.icon}
                   wrapped
                   size={this.props.theme.menuView.panel.section.title['icon-size']}
                   style={{
                           width: this.props.theme.menuView.panel.section.title['icon-size'],
                           height: this.props.theme.menuView.panel.section.title['icon-size'],
                           marginRight: this.props.theme.menuView.panel.section.title['space-after-icon']
                         }} />;
    }

    return (
      <div style={this.props.style}>
        <div className='m-menuview-panel-section-title'
             style={titleStyle}>
          {icon}
          {this.props.title}
        </div>
        <div className='m-menuview-panel-section-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
});
