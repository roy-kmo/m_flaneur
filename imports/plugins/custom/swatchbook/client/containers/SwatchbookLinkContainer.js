import React, { Component, Fragment } from 'react';
import Velocity from 'velocity-animate';

export default class SwatchbookLinkContainer extends Component {

  state = {
    isOpen: false
  };

  handleClick = e => {
    e.preventDefault();
    const { isOpen } = this.state;
    const swatchbookDrawer = $('.swatchbook-drawer-container');

    if (isOpen) {
      swatchbookDrawer.fadeOut();
    } else {
      swatchbookDrawer.fadeIn();
    }

    this.setState({ isOpen: !isOpen });
  };

  render () {
    return (
      <Fragment>
        &nbsp;
        <a href="javascript:void(0)" onClick={this.handleClick}>Swatchbook (3)</a>
      </Fragment>

    );
  }
}
