import React from 'react';
import Radium from 'radium';

import Button from '../components/Button.jsx';

import Panel from './Panel.jsx';
import PanelSection from './PanelSection.jsx';

export default Radium(class ExportPanel extends React.Component {
  onExportPDF = () => {
    console.log('Export PDF');
  }

  onExportHTML = () => {
    console.log('Export HTML');
  }

  render () {
    return (
      <Panel theme={this.props.theme} appConfig={this.props.appConfig}>
        <PanelSection title='Export'
                      icon={this.props.theme.icon.menuView.export['export']}
                      theme={this.props.theme} appConfig={this.props.appConfig}>
          <Button icon={this.props.theme.icon.menuView.export['pdf']}
                  size='large'
                  theme={this.props.theme} appConfig={this.props.appConfig}
                  onClick={this.onExportPDF}>
            PDF
          </Button>
          <Button icon={this.props.theme.icon.menuView.export['html']}
                  size='large'
                  theme={this.props.theme} appConfig={this.props.appConfig}
                  onClick={this.onExportHTML}>
            HTML
          </Button>
        </PanelSection>
      </Panel>
    );
  }
});
