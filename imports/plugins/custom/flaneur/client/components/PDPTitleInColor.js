import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { getPDPColorSlug } from '../../lib/helpers';

class PDPTitleInColor extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  state = {
    name: ''
  };

  componentDidMount () {
    const { handle } = this.props.product;
    const slug = getPDPColorSlug(handle);
    if (slug) {
      Meteor.call('Colors.getNameBySlug', slug, (err, name) => {
        if (err) {
          alert(err.reason);
        } else {
          this.setState({ name });
        }
      });
    }
  }

  render () {
    const { title } = this.props.product
    const { name } = this.state;
    return (
      <div>
        {name && (
          <h3 className="pdp-title-in-color">{title} in {name}</h3>
        )}
      </div>
    )
  }
}

registerComponent('PDPTitleInColor', PDPTitleInColor);

export default PDPTitleInColor;
