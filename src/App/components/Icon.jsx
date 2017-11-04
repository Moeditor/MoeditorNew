import React from 'react';
import Radium from 'radium';

export default Radium(class Icon extends React.Component {
  render () {
    if (this.props.wrapped) {
      let divStyle = Object.assign({
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
        width: this.props.size
      }, this.props.style);

      let iconStyle = Object.assign({
        fontSize: this.props.size,
        display: 'block'
      }, this.props.style);
      return (
        <div style={divStyle}>
          <i className={`fa fa-${this.props.name}`} style={iconStyle} aria-hidden='true' />
        </div>
      );
    } else {
      let style = Object.assign({
        fontSize: this.props.size
      }, this.props.style);
      return <i className={`fa fa-${this.props.name}`} style={style} aria-hidden='true' />;
    }
  }
});
