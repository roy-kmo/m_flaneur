import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShareCartLink extends Component {

  handleShareClick = e => {
    const confirmMsg = 'Click "OK" to generate a cart link that adds your current cart\'s items to the cart of anyone who clicks it.';
    if (confirm(confirmMsg)) {
      Meteor.call('Flaneur.generateCartLink', (err, id) => {
        if (err) {
          alert(err);
        } else {
          alert(`Share this URL: ${Meteor.absoluteUrl()}cart-link/${id}`);
        }
      });
    }
  };

  render () {
    return (
      <a
        href="javascript:void(0)"
        className="share-cart-link button rui btn btn-primary solid btn-block"
        onClick={this.handleShareClick}
      >Share this cart</a>
    );
  }
}
