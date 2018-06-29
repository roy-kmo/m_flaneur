import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { getPDPColorSlug } from '../../lib/helpers';
import { isProductCapsule } from '../../lib/products';

class PDPColorTitle extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  state = {
    slug: '',
    name: ''
  };

  componentDidMount () {
    if (!isProductCapsule(this.props.product)) {
      this.getColorName();
    }
  }

  getColorName = () => {
    const { handle } = this.props.product;
    const slug = getPDPColorSlug(handle);
    if (slug && slug !== this.state.slug) {
      Meteor.call('Colors.getNameBySlug', slug, (err, name) => {
        if (err) {
          alert(err.reason);
        } else {
          this.setState({ name, slug });
        }
      });
    }
  };

  componentDidUpdate (prevProps) {
    if (this.props.product._id !== prevProps.product._id) {
      // Changed product
      this.setState({ name: '', slug: '' });
    }
    if (!isProductCapsule(this.props.product)) {
      this.getColorName();
    }
  }

  render () {
    const { name } = this.state;
    return (
      <div>
        {name && (
<<<<<<< HEAD
          <h3 className="pdp-color-name"><div className="pdp-color-name-background">{name}</div></h3>
=======
          <h3 className="pdp-color-name"><div id="pdp-color-name-background">{name}</div></h3>
>>>>>>> 3ef3ec4a22f92145d4ae0058d7d284681646ee7c
        )}
      </div>
    );
  }
}

registerComponent('PDPColorTitle', PDPColorTitle);

export default PDPColorTitle;
