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
    isInSwatchbook: PropTypes.bool,
    onSwatchbookRemoveClick: PropTypes.func,
    onSwatchbookAddClick: PropTypes.func
  };

  handleColorClick = (e, pdpURL) => {
    e.preventDefault();
    ReactionRouter.go(pdpURL);
  };

  render () {
    const {
      _id,
      name,
      hexCode,
      slug,
      pantoneCode,
      pdpURL,
      isInSwatchbook,
      onSwatchbookRemoveClick,
      onSwatchbookAddClick
    } = this.props;

    return (
      <a
        key={_id}
        className="color"
        href={pdpURL}
        onClick={(e) => this.handleColorClick(e, pdpURL)}>
        {isInSwatchbook && (
          <button
            className="rui btn btn-default flat button swatchbook-remove-button"
            onClick={e => onSwatchbookRemoveClick(e, _id)}>
            <i className="rui font-icon fa fa-times fa-lg"></i>
          </button>
        )}
        {!isInSwatchbook && (
          <button
            className="rui btn btn-default flat button swatchbook-add-button"
            onClick={e => onSwatchbookAddClick(e, _id)}>
            <i className="rui font-icon fa fa-bookmark fa-lg"></i>
          </button>
        )}
        <div className="color-sample" style={{backgroundColor: `#${hexCode}`}}>
          {pantoneCode}
        </div>
        <span className="color-name">{name}</span>
      </a>
    )
  }
}
