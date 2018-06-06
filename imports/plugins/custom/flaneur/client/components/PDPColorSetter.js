/**
 * @file
 * React component that sets the color on the PDP
 */

import { Session } from 'meteor/session'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { getPDPColorSlug } from '../../lib/helpers';
import { isProductCapsule } from '../../lib/products';

class PDPColorSetter extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  async componentDidMount () {
    const { product } = this.props;

    // If product has a hexColor defined by admin, set that color.
    if (isProductCapsule(product) && product.hexColor) {
      this.clearStyles();
      this.setHexColor(product.hexColor);
      return;
    }

    // Otherwise, set color based on URL
    const { handle } = product;
    const slug = getPDPColorSlug(handle);
    if (slug) {
      // Viewing PDP in a certain color.
      // Load color and set hex background on various elements
      await this.setPDPColor(slug);
    }
  }

  componentDidUpdate (prevProps) {
    const { product } = this.props;
    if (product.hexColor) {
      this.clearStyles();
      this.setHexColor(product.hexColor);
      return;
    }

    const { handle } = product;
    this.setPDPColor(getPDPColorSlug(handle));
  }

  componentWillUnmount () {
    this.clearStyles();
  }

  setPDPColor = slug => {
    return new Promise((resolve, reject) => {
      Meteor.call('Colors.getBySlug', slug, (err, { _id, hexCode }) => {
        if (err) reject(err);
        this.clearStyles();
        this.setHexColor(hexCode);
        Session.set('PDPColorId', _id)
        resolve();
      });
    });
  };

  clearStyles = () => {
    const existingStyles = document.querySelector('.pdp-color-styles');
    if (existingStyles) {
      existingStyles.parentNode.removeChild(existingStyles);
    }

    Session.set('PDPColorId', undefined);
  };

  setHexColor = hex => {
    this.hex = hex;
    const bgStyle = `background-color: #${hex} !important`;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.className = 'pdp-color-styles';
    styles.appendChild(document.createTextNode(`
      .zoomed-image-container img { ${bgStyle} }
      .main-navbar { ${bgStyle} }
      .pdp.header { ${bgStyle} }
      .media-gallery .gallery-image img { ${bgStyle} }
    `));
    document.head.appendChild(styles);
  };

  render () {
    return (
      <div style={{ display: 'none' }}></div>
    );
  }
}

registerComponent('PDPColorSetter', PDPColorSetter);
