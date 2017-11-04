import React from 'react';
import Radium from 'radium';

export default Radium(class ViewSwitcher extends React.Component {
  switchTo (name) {
    if (!this.views[name]) {
      throw new Error(`No view named ${name}`);
    }

    let targetView = this.views[name];

    if (this.activeView) {
      if (this.activeView === targetView) return;
      this.activeView.style.display = 'none';
    }

    targetView.style.display = '';
    this.activeView = targetView;
  }

  render () {
    this.views = {};
    let items = this.props.children.map((item, i) => {
      return <div key={item.name}
                  name={item.name}
                  ref={obj => {
                    this.views[item.name] = obj;
                    if (item.name === this.props.defaultView) this.activeView = obj;
                  }}
                  style={{
                          display: item.name === this.props.defaultView ? '' : 'none',
                          width: '100%',
                          height: '100%'
                        }}>
               {item.view}
             </div>;
    });
    return <div style={this.props.style}>{items}</div>;
  }
});
