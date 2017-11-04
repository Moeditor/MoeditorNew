import React from 'react';
import Radium from 'radium';

import MainPanel from './MainPanel.jsx';
import Editor from './Editor.jsx';
import PreviewPanel from './PreviewPanel.jsx';
import BottomPanel from './BottomPanel.jsx';
import BottomPanelButton from './BottomPanelButton.jsx';

import ScrollSyncer from '../../lib/ScrollSyncer';

export default Radium(class EditView extends React.Component {
  updatePreview = _.debounce(async () => {
    let editorContent = this.editor.getValue();
    let container = this.previewPanel.getContainerElement();
    await app.renderer.renderForPreview(editorContent, container);
    this.scrollSyncer.buildScrollMap();
  }, this.props.appConfig['renderDelay']);

  onEditorChange = async e => {
    // Set current editor content for FileManager
    this.props.fileManager.setContent(this.editor.getValue());

    // Update preview
    this.updatePreview();
  }

  onEditorScroll = () => {
    this.scrollSyncer.editorToPreview();
  }

  onPreviewPanelScroll = () => {
    this.scrollSyncer.previewToEditor();
  }

  onBottomPanelButtonClick = (e, name) => {
    switch (name) {
      case 'menu':
        this.props.onMenu();
        break;
      default:
        console.log(name);
    }
  }

  componentDidMount () {
    this.scrollSyncer = new ScrollSyncer(this.editor.getEditorElement(), this.editor.getScrollerElement(), this.previewPanel.getContainerElement(), this.previewPanel.getScrollerElement());
    this.onEditorChange();
  }

  render () {
    return (
      <div className='m-edit-view'
           style={{
                   width: '100%',
                   height: '100%'
                 }}>
        {/* Editor and Preview panel */}
        <MainPanel theme={this.props.theme} appConfig={this.props.appConfig}
                   background={this.props.theme.editor['background']}
                   style={{
                           float: 'left',
                           height: 'calc(100% - 25px)',
                           width: '50%'
                         }}>
          <Editor theme={this.props.theme} appConfig={this.props.appConfig}
                  onChange={this.onEditorChange}
                  onScroll={this.onEditorScroll}
                  defaultValue={app.fileManager.getContent()}
                  ref={obj => (this.editor = obj)}
          />
        {/* defaultValue={require('fs').readFileSync('/home/Menci/Dropbox/Documents/Blog/fft.md').toString()} */}
        </MainPanel>
        <MainPanel theme={this.props.theme} appConfig={this.props.appConfig}
                   background={this.props.theme.preview['background']}
                   style={{
                           float: 'right',
                           height: 'calc(100% - 25px)',
                           width: '50%'
                         }}>
          <PreviewPanel theme={this.props.theme} appConfig={this.props.appConfig}
                        onScroll={this.onPreviewPanelScroll}
                        ref={obj => (this.previewPanel = obj)}
          />
        </MainPanel>

        {/* Bottom panels */}
        <BottomPanel theme={this.props.theme} appConfig={this.props.appConfig}
                     style={{
                             float: 'left',
                             height: '24px',
                             width: 'calc(50% - 5px)',
                             background: this.props.theme.editor['background'],
                             borderTop: this.props.theme.bottomPanel['border'],
                             paddingLeft: '5px'
                           }}>
          <BottomPanelButton theme={this.props.theme} appConfig={this.props.appConfig}
                             name='menu'
                             onClick={this.onBottomPanelButtonClick}
                             icon={this.props.theme.icon.bottomPanel['menu']} />
        </BottomPanel>
        <BottomPanel theme={this.props.theme} appConfig={this.props.appConfig}
                     style={{
                             float: 'right',
                             height: '24px',
                             width: 'calc(50% - 5px)',
                             background: this.props.theme.preview['background'],
                             borderTop: this.props.theme.bottomPanel['border'],
                             textAlign: 'right',
                             paddingRight: '5px'
                           }}>
          <BottomPanelButton theme={this.props.theme} appConfig={this.props.appConfig}
                             name='mode'
                             onClick={this.onBottomPanelButtonClick}
                             icon={this.props.theme.icon.bottomPanel['mode']} />
        </BottomPanel>
      </div>
    );
  }
});
