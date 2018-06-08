import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageURL } from '../../../flaneur/lib/helpers';

export default class ColorHouses extends Component {

  static propTypes = {
    colorHouses: PropTypes.array,
    onColorClick: PropTypes.func.isRequired
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
                const { name, hexCode, slug, pantoneCode, pdpURL } = color;
                return (
                  <a
                    key={color._id}
                    className="color"
                    href={pdpURL}
                    onClick={(e) => onColorClick(e, pdpURL)}>
                    <div className="color-sample" style={{backgroundColor: `#${hexCode}`}}>
                      {pantoneCode}
                    </div>
                    <span className="color-name">{name}</span>
                  </a>
                )
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
