import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ColorLink extends Component {

  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hexCode: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    pantoneCode: PropTypes.string.isRequired,
    pdpURL: PropTypes.string.isRequired,
  };

  handleColorClick = (e, pdpURL) => {
    e.preventDefault();
    ReactionRouter.go(pdpURL);
  };

  render () {
    const { _id, name, hexCode, slug, pantoneCode, pdpURL } = this.props;
    return (
      <a
        key={_id}
        className="color"
        href={pdpURL}
        onClick={(e) => this.handleColorClick(e, pdpURL)}>
        <div className="color-sample" style={{backgroundColor: `#${hexCode}`}}>
          {pantoneCode}
        </div>
        <span className="color-name">{name}</span>
      </a>
    )
  }
}
