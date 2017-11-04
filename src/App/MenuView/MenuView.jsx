import React from 'react';
import Radium from 'radium';

import ViewSwitcher from '../components/ViewSwitcher.jsx';

import Menu from './Menu/Menu.jsx';
import OpenPanel from './OpenPanel.jsx';
import ExportPanel from './ExportPanel.jsx';
import SettingsPanel from './SettingsPanel.jsx';
import AboutPanel from './AboutPanel.jsx';

export default Radium(class MenuView extends React.Component {
  onMenuItemClick = (e, itemName) => {
    switch (itemName) {
      case 'open':
      case 'export':
      case 'settings':
      case 'about':
        this.menu.setSelected(itemName);
        this.viewSwitcher.switchTo(itemName);
        break;
      case 'back':
        this.props.onBack();
        break;
      default:
        console.log(itemName);
    }
  }

  componentDidMount () {
    this.menu.setSelected('open');
  }

  render () {
    let menuItems = [
      { type: 'item', name: 'open', text: 'Open', icon: this.props.theme.icon.menu['open'] },
      { type: 'item', name: 'save', text: 'Save', icon: this.props.theme.icon.menu['save'] },
      { type: 'item', name: 'save-as', text: 'Save As', icon: this.props.theme.icon.menu['save-as'] },
      { type: 'divider' },
      { type: 'item', name: 'export', text: 'Export', icon: this.props.theme.icon.menu['export'] },
      { type: 'divider' },
      { type: 'item', name: 'settings', text: 'Settings', icon: this.props.theme.icon.menu['settings'] },
      { type: 'item', name: 'about', text: 'About', icon: this.props.theme.icon.menu['about'] },
      { type: 'divider' },
      { type: 'item', name: 'back', text: 'Back', icon: this.props.theme.icon.menu['back'] }
    ];

    return (
      <div style={{
                   width: '100%',
                   height: '100%'
                 }}>
        <div style={{
                     paddingTop: '40px',
                     width: '250px',
                     height: 'calc(100% - 40px)',
                     float: 'left',
                     background: this.props.theme.menu['background']
                   }}>
          <Menu theme={this.props.theme} appConfig={this.props.appConfig}
                onItemClick={this.onMenuItemClick}
                ref={obj => (this.menu = obj)}
                items={menuItems} />
        </div>
        <ViewSwitcher style={{
                              height: '100%',
                              float: 'right',
                              width: 'calc(100% - 250px)'
                            }}
                      defaultView='open'
                      ref={obj => (this.viewSwitcher = obj)}>
          {[
            {
              name: 'open',
              view: <OpenPanel theme={this.props.theme} appConfig={this.props.appConfig} />
            },
            {
              name: 'export',
              view: <ExportPanel theme={this.props.theme} appConfig={this.props.appConfig} />
            },
            {
              name: 'settings',
              view: <SettingsPanel theme={this.props.theme} appConfig={this.props.appConfig} />
            },
            {
              name: 'about',
              view: <AboutPanel theme={this.props.theme} appConfig={this.props.appConfig} />
            }
          ]}
        </ViewSwitcher>
      </div>
    );
  }
});
