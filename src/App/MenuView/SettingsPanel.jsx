import React from 'react';
import Radium from 'radium';

import Select from '../components/Select.jsx';
import Edit from '../components/Edit.jsx';
import Checkbox from '../components/Checkbox.jsx';

import Panel from './Panel.jsx';
import PanelSection from './PanelSection.jsx';
import SettingsPanelItem from './SettingsPanelItem.jsx';

export default Radium(class SettingsPanel extends React.Component {
  onChangeLanguage = () => {
    console.log(`Change Language to '${this.controlLanguage.getValue()}'`);
  }

  onChangeAutoReload = () => {
    console.log(`Change AutoReload to '${this.controlAutoReload.getValue()}'`);
  }

  onChangeAutoSave = () => {
    console.log(`Change AutoSave to '${this.controlAutoSave.getValue()}'`);
  }

  onChangeEditorFont = () => {
    console.log(`Change Editor Font to '${this.controlEditorFont.getValue()}'`);
  }

  onChangeEditorFontSize = () => {
    console.log(`Change Editor Font Size to '${this.controlEditorFontSize.getValue()}'`);
  }

  onChangeEditorLineHeight = () => {
    console.log(`Change Line Height Size to '${this.controlEditorLineHeight.getValue()}'`);
  }

  onChangeEditorTabSize = () => {
    console.log(`Change Editor Tab Size to '${this.controlEditorTabSize.getValue()}'`);
  }

  onChangeEnableTeXMathExpressions = () => {
    console.log(`Change Enable TeX Math Expressions to '${this.controlEnableTeXMathExpressions.getChecked()}'`);
  }

  onChangeEnableUMLDiagrams = () => {
    console.log(`Change Enable UML Diagrams Expressions to '${this.controlEnableUMLDiagrams.getChecked()}'`);
  }

  onChangeRenderTheme = () => {
    console.log(`Change Render Theme to '${this.controlRenderTheme.getValue()}'`);
  }

  onChangeHighlightTheme = () => {
    console.log(`Change Highlight Theme to '${this.controlHighlightTheme.getValue()}'`);
  }

  render () {
    return (
      <Panel theme={this.props.theme} appConfig={this.props.appConfig}>
        <PanelSection title='General'
                      icon={this.props.theme.icon.menuView.settings['general']}
                      theme={this.props.theme} appConfig={this.props.appConfig}>
          <SettingsPanelItem label='Language'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Select theme={this.props.theme} appConfig={this.props.appConfig}
                    defaultValue='default'
                    ref={obj => (this.controlLanguage = obj)}
                    onChange={this.onChangeLanguage}>
              {[
                { value: 'default', text: 'Default' }
              ]}
            </Select>
          </SettingsPanelItem>
          <SettingsPanelItem label='Reload when file changed'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Select theme={this.props.theme} appConfig={this.props.appConfig}
                    defaultValue='prompt'
                    ref={obj => (this.controlAutoReload = obj)}
                    onChange={this.onChangeAutoReload}>
              {[
                { value: 'always', text: 'Always' },
                { value: 'prompt', text: 'Prompt' },
                { value: 'never', text: 'Never' }
              ]}
            </Select>
          </SettingsPanelItem>
          <SettingsPanelItem label='Auto Save'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Select theme={this.props.theme} appConfig={this.props.appConfig}
                    defaultValue='never'
                    ref={obj => (this.controlAutoSave = obj)}
                    onChange={this.onChangeAutoSave}>
              {[
                { value: 'never', text: 'Never' },
                { value: 'on-blur', text: 'On Blur' }
              ]}
            </Select>
          </SettingsPanelItem>
        </PanelSection>

        <PanelSection title='Editor'
                      icon={this.props.theme.icon.menuView.settings['editor']}
                      theme={this.props.theme} appConfig={this.props.appConfig}>
          <SettingsPanelItem label='Font'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Select theme={this.props.theme} appConfig={this.props.appConfig}
                    defaultValue='monospace'
                    ref={obj => (this.controlEditorFont = obj)}
                    onChange={this.onChangeEditorFont}>
              {[
                { value: 'monospace', text: 'Monospace' },
                { value: 'sans', text: 'Sans' },
                { value: 'serif', text: 'Serif' }
              ]}
            </Select>
          </SettingsPanelItem>
          <SettingsPanelItem label='Font Size'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Edit theme={this.props.theme} appConfig={this.props.appConfig}
                  defaultValue='13px'
                  ref={obj => (this.controlEditorFontSize = obj)}
                  onChange={this.onChangeEditorFontSize} />
          </SettingsPanelItem>
          <SettingsPanelItem label='Line Height'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Edit theme={this.props.theme} appConfig={this.props.appConfig}
                  defaultValue='1.5'
                  ref={obj => (this.controlEditorLineHeight = obj)}
                  onChange={this.onChangeEditorLineHeight} />
          </SettingsPanelItem>
          <SettingsPanelItem label='Tab Size'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Edit theme={this.props.theme} appConfig={this.props.appConfig}
                  defaultValue='4'
                  ref={obj => (this.controlEditorTabSize = obj)}
                  onChange={this.onChangeEditorTabSize} />
          </SettingsPanelItem>
        </PanelSection>

        <PanelSection title='Render'
                      icon={this.props.theme.icon.menuView.settings['render']}
                      theme={this.props.theme} appConfig={this.props.appConfig}>
          <SettingsPanelItem label='TeX Math Expressions'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Checkbox theme={this.props.theme} appConfig={this.props.appConfig}
                      defaultChecked
                      ref={obj => (this.controlEnableTeXMathExpressions = obj)}
                      onChange={this.onChangeEnableTeXMathExpressions}>
              Enable TeX Math Expressions
            </Checkbox>
          </SettingsPanelItem>
          <SettingsPanelItem label='UML Diagrams'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Checkbox theme={this.props.theme} appConfig={this.props.appConfig}
                      defaultChecked
                      ref={obj => (this.controlEnableUMLDiagrams = obj)}
                      onChange={this.onChangeEnableUMLDiagrams}>
              Enable UML Diagrams
            </Checkbox>
          </SettingsPanelItem>
          <SettingsPanelItem label='Render Theme'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Select theme={this.props.theme} appConfig={this.props.appConfig}
                    defaultValue='GitHub'
                    ref={obj => (this.controlRenderTheme = obj)}
                    onChange={this.onChangeRenderTheme}>
              {[{ value: 'GitHub', text: 'GitHub' }]}
            </Select>
          </SettingsPanelItem>
          <SettingsPanelItem label='Code Highlight Theme'
                             theme={this.props.theme} appConfig={this.props.appConfig}>
            <Select theme={this.props.theme} appConfig={this.props.appConfig}
                    defaultValue='tomorrow'
                    ref={obj => (this.controlHighlightTheme = obj)}
                    onChange={this.onChangeHighlightTheme}>
              {app.theming.getHighlightThemeList().map(s => ({ value: s, text: s }))}
            </Select>
          </SettingsPanelItem>
        </PanelSection>
      </Panel>
    );
  }
});
