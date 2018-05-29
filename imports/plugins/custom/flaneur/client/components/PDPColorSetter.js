import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { getPDPColorSlug } from '../../lib/helpers';

class PDPColorSetter extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  async componentDidMount () {
    const { handle } = this.props.product;
    const slug = getPDPColorSlug(handle);
    if (slug) {
      // Viewing PDP in a certain color.
      // Load color and set hex background on various elements
      await this.setPDPColor(slug);
    }
  }

  componentDidUpdate (prevProps) {
    const { handle } = this.props.product;
    this.setPDPColor(getPDPColorSlug(handle));
  }

  componentWillUnmount () {
    this.clearStyles();
  }

  setPDPColor = slug => {
    return new Promise((resolve, reject) => {
      Meteor.call('Colors.getHexBySlug', slug, (err, hex) => {
        if (err) reject(err);
        this.clearStyles();
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
        resolve();
      });
    });
  };

  clearStyles = () => {
    const existingStyles = document.querySelector('.pdp-color-styles');
    if (existingStyles) {
      existingStyles.parentNode.removeChild(existingStyles);
    }
  };

  render () {
    return (
      <div style={{ display: 'none' }}></div>
    );
  }
}

registerComponent('PDPColorSetter', PDPColorSetter);