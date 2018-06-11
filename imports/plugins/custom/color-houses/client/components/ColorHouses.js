import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageURL } from '../../../flaneur/lib/helpers';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';

export default class ColorHouses extends Component {

  static propTypes = {
    colorHouses: PropTypes.array
  };

  render () {
    const { colorHouses, onColorClick } = this.props;
    return (
      <div id="color-houses-container">
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
            <div className="color-container" key={colorHouse._id}>
              <h3>{title}</h3>
              <img src={imageURL} alt={title} />
              <div className="description" dangerouslySetInnerHTML={{__html: description}} />
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
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
