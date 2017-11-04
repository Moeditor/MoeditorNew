import React from 'react';
import Radium from 'radium';

import ViewSwitcher from './components/ViewSwitcher.jsx';

import EditView from './EditView/EditView.jsx';
import MenuView from './MenuView/MenuView.jsx';

import Dialog from '../lib/Dialogs';

export default Radium(class App extends React.Component {
  constructor (props) {
    super(props);
    this.fileManager = props.fileManager;
    this.state = {
      theme: props.theme,
      appConfig: props.appConfig
    };
  }

  onOpenMenuView = () => {
    this.viewSwitcher.switchTo('menu-view');
  }

  onCloseMenuView = () => {
    this.viewSwitcher.switchTo('edit-view');
  }

  updateConfig = (newConfig) => {
    this.setState({
      appConfig: newConfig
    });
  }

  updateTheme = (newTheme) => {
    this.setState({
      theme: newTheme
    });
  }

  openFile = async (filenames) => {
    // If there's only one file, check if we can open it in current window
    if (filenames.length === 1) {
      if (await this.closeFile()) {
        this.fileManager.open(filenames[0]);
        this.fileManager.read();
        this.setState({
          fileManager: this.fileManager
        });
      }
    } else {
      // TODO: Open files in new windows
    }
  }

  saveFile = async (filenames) => {
    // TODO
    return;
  }

  closeFile = async () => {
    if (!this.fileManager.saved) {
      this.fileManager.close();
      return true;
    }
    let ans = await Dialog.askSave(this.fileManager.getFileBasename());
    if (ans) {
      if (await this.saveFile()) {
        this.fileManager.close();
        return true;
      }
    }

    return false;
  }

  render () {
    return (
      <div style={{
                   width: '100%',
                   height: '100%'
                 }}>
        <ViewSwitcher ref={obj => (this.viewSwitcher = obj)}
                      defaultView='edit-view'
                      style={{
                              width: '100%',
                              height: '100%'
                            }}>
          {[
            {
              name: 'menu-view',
              view: <MenuView theme={this.props.theme} appConfig={this.props.appConfig}
                              onOpenFile={this.onOpenFile}
                              onBack={this.onCloseMenuView} />
            },
            {
              name: 'edit-view',
              view: <EditView theme={this.props.theme} appConfig={this.props.appConfig}
                              fileManager={this.fileManager}
                              onMenu={this.onOpenMenuView} />
            }
          ]}
        </ViewSwitcher>
      </div>
    );
  }
});
