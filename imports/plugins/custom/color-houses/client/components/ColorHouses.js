import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageURL } from '../../../flaneur/lib/helpers';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';

export default class ColorHouses extends Component {

  static propTypes = {
    colorHouses: PropTypes.array,
    swatchbookColorIds: PropTypes.array.isRequired,
    onSwatchbookAddClick: PropTypes.func.isRequired,
    onSwatchbookRemoveClick: PropTypes.func.isRequired
  };

  render () {
    const {
      colorHouses,
      onColorClick,
      swatchbookColorIds,
      onSwatchbookRemoveClick,
      onSwatchbookAddClick
    } = this.props;
    return (
<div className="color-house-container-box w-container">
        <h1>Color Houses</h1>
        {colorHouses.length && colorHouses.map(colorHouse => {
          const {
            title,
            imageFileId,
            imageFileName,
            description,
            colors
          } = colorHouse;
          const imageURL = getImageURL(imageFileId, imageFileName);

          return (
        <div className="color-house-box" key={colorHouse._id}>
          <div className="colorhouse-view">
      <div className="color-house-block w-row">
        <div className="color-house-image-column w-col w-col-8"> <img src={imageURL} alt={title} />
        </div>
        <div className="color-house-detail-column w-col w-col-4">
          <div className="cr-block">
            <div className="static-title image-block">{title}</div>
          <p className="color-house-description" dangerouslySetInnerHTML={{__html: description}} />
          </div>
        </div>
      </div>

      <div className="colors-container-box">
        <div className="color-box w-inline-block">
        {colors.map(color => {
          const { _id, name, hexCode, slug, pantoneCode, pdpURL } = color;
          return (
            <ColorLink
              key={_id}
              _id={_id}
              name={name}
              hexCode={hexCode}
              slug={slug}
              pantoneCode={pantoneCode}
              pdpURL={pdpURL}
              isInSwatchbook={swatchbookColorIds.includes(_id)}
              onSwatchbookRemoveClick={onSwatchbookRemoveClick}
              onSwatchbookAddClick={onSwatchbookAddClick}
            />
          );
        })}
        </div>
</div>
      </div>
    </div>

          );
        }) || null}
</div>
    );
  }
}
