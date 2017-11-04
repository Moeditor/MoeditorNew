import React from 'react';
import Radium from 'radium';

import cledit from './Editor/cledit.js';

export default Radium(class Editor extends React.Component {
  getValue () {
    return this.preContent.innerText;
  }

  getEditorElement () {
    return this.preContent;
  }

  getScrollerElement () {
    return this.divWarapper;
  }

  render () {
    let style = Object.assign({
      width: '100%',
      height: '100%',
      background: this.props.theme.editor['background'],
      color: this.props.theme.editor['color'],
      fontSize: this.props.theme.editor['font-size'],
      fontFamily: this.props.theme.editor['font-family'],
      lineHeight: this.props.theme.editor['line-height']
    }, this.props.style);

    return (
      <div className='m-editor'
           style={style}
           ref={obj => (this.containerDiv = obj)}>
        <div className='m-editor-wrapper'
             ref={obj => (this.divWarapper = obj)}
             onScroll={this.props.onScroll}
             style={{
                     width: '100%',
                     height: '100%',
                     overflowY: 'auto'
                   }}>
          <pre className='m-editor-content'
               ref={obj => (this.preContent = obj)}
               style={{
                       width: this.props.theme.editor['width'],
                       height: 'auto',
                       minHeight: '100%',
                       boxSizing: 'content-box',
                       whiteSpace: 'pre-wrap',
                       outline: 'none',
                       margin: '0',
                       tabSize: 4,
                       fontFamily: this.props.theme.editor['font-family'],
                       padding: this.props.theme.editor['padding']
                     }}>
            {this.props.defaultValue}
          </pre>
        </div>
      </div>
    );
  }

  componentDidMount () {
    cledit(this.preContent, this.divWarapper, editor => {
      this.editor = editor;
      this.editor.on('contentChanged', (a, b, sectionList) => {
        this.sectionList = sectionList;
        this.props.onChange();
      });
    });
  }

  componentWillReceiveProps (nextProps) {
    this.setStyles(nextProps.theme);
  }

  setStyles (theme) {
    /*
    this.cmDiv.style.height = '100%';
    this.cmDiv.style.background = theme.editor['background'];
    this.cmDiv.style.color = theme.editor['color'];
    this.cmDiv.style.fontSize = theme.editor['font-size'];
    this.cmDiv.style.fontFamily = theme.editor['font-family'];
    this.cmDiv.style.lineHeight = theme.editor['line-height'];
    this.cm.refresh();
    */
  }

  bindEvents () {
    // this.cm.on('change', this.props.onChange);
  }
});
