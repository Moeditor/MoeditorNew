import React from 'react';
import Radium from 'radium';

import Button from '../components/Button.jsx';

import Panel from './Panel.jsx';
import PanelSection from './PanelSection.jsx';

import Dialogs from '../../lib/Dialogs';

export default Radium(class OpenPanel extends React.Component {
  onOpenFile = async () => {
    let filenames = await Dialogs.openMarkdownFiles(true);
    if (!filenames) return;
    this.props.onOpenFile(filenames);
  }

  render () {
    return (
      <Panel theme={this.props.theme} appConfig={this.props.appConfig}>
        <PanelSection title='Open'
                      icon={this.props.theme.icon.menuView.open['open']}
                      theme={this.props.theme} appConfig={this.props.appConfig}>
          <Button icon={this.props.theme.icon.menuView.open['file']}
                  size='large'
                  theme={this.props.theme} appConfig={this.props.appConfig}
                  onClick={this.onOpenFile}>
            Open file
          </Button>
        </PanelSection>
      </Panel>
    );
  }
});
