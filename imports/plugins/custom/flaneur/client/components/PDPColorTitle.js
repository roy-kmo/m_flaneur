import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';
import { getPDPColorSlug } from '../../lib/helpers';

class PDPColorTitle extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  state = {
    slug: '',
    name: ''
  };

  componentDidMount () {
    this.getColorName();
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
    this.getColorName();
  }

  render () {
    const { name } = this.state;
    return (
      <div>
        {name && (
          <h3 className="pdp-color-name">{name}</h3>
        )}
      </div>
    );
  }
}

registerComponent('PDPColorTitle', PDPColorTitle);

export default PDPColorTitle;
