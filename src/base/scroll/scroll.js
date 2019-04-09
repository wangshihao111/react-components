import React, { Component } from 'react';
import BScroll from 'better-scroll';
import PT from 'prop-types';

class Scroll extends Component {
  refresh() {
    this.scroll.refresh();
  }

  componentDidMount() {
    this.scroll = new BScroll(this.el, {
      click: this.props.click || false,
      bounce: this.props.bounce === undefined ? true : this.props.bounce
    });
    setTimeout(() => this.scroll.refresh());
  }

  render() {
    return (
      <div
        ref={el => (this.el = el)}
        style={s}
        className={this.props.className || ''}
      >
        {this.props.children}
      </div>
    );
  }
}

Scroll.propTypes = {
  click: PT.bool,
  bounce: PT.bool
};

const s = {
  width: '100%',
  height: '100%'
};

export default Scroll;
