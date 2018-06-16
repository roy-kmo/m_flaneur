import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class SwatchbookLinkContainer extends Component {

  static propTypes = {
    colorCount: PropTypes.number.isRequired
  }

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
    const { colorCount } = this.props;
    return (
      <Fragment>
        &nbsp;
        <a
          href="javascript:void(0)"
          className="swatchbook-link"
          onClick={this.handleClick}>Swatchbook ({colorCount})</a>
      </Fragment>

    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();
  let { swatchbookColorIds } = user.profile;
  if (!swatchbookColorIds) {
    swatchbookColorIds = [];
  }

  return {
    colorCount: swatchbookColorIds.length
  };
})(SwatchbookLinkContainer);
