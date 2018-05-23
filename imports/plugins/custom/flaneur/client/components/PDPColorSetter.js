import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';

class PDPColorSetter extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  async componentDidMount () {
    const slug = this.getSlug();
    if (slug) {
      // Viewing PDP in a certain color.
      // Load color and set hex background on various elements
      Meteor.setTimeout(async () => {
        await this.setPDPColor(slug);
      });
    }
  }

  getSlug = () => {
    const { handle } = this.props.product;
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const lastPathArg = pathParts[pathParts.length - 1];
    return lastPathArg !== handle && lastPathArg || '';
  };

  componentDidUpdate (prevProps) {
    if (prevProps.product._id !== this.props.product._id) {
      // Changed product
      Meteor.setTimeout(() => {
        this.setPDPColor(this.getSlug());
      });
    }
  }

  setPDPColor = slug => {
    return new Promise((resolve, reject) => {
      Meteor.call('Colors.getHexBySlug', slug, (err, hex) => {
        if (err) reject(err);
        this.hex = hex;
        const bgStyle = `background: #${hex}`;
        document.querySelector('.main-navbar').style = bgStyle;
        document.querySelector('.pdp.header').style = bgStyle;
        document.querySelectorAll('.media-gallery .gallery-image img').forEach(element => {
          element.style = bgStyle;
        });
        resolve();
      });
    });

  };

  render () {
    return (
      <div style={{ display: 'none' }}></div>
    );
  }
}

registerComponent('PDPColorSetter', PDPColorSetter);
