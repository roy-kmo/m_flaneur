import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShareCartLink extends Component {

  handleShareClick = e => {
    const confirmMsg = 'Click "OK" to generate a cart link that adds your current cart\'s items to the cart of anyone who clicks it.';
    if (confirm(confirmMsg)) {
      Meteor.call('Flaneur.generateCartLink', (err, url) => {
        console.log('url:', url);
      });
    }
  };

  render () {
    return (
      <a
        href="javascript:void(0)"
        className="share-cart-link"
        onClick={this.handleShareClick}
      >Share this cart</a>
    );
  }
}
