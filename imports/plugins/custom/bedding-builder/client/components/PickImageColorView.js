import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';

export default class PickImageColorView extends Component {

  static propTypes = {
    image: PropTypes.string,
    imageColors: PropTypes.array,
    onReplaceImageClick: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
  }

  render () {
    const { image, imageColors, onReplaceImageClick, onBackClick } = this.props;

    return (
      <div className="view">
        <h1>Pick a Color</h1>
        <p className="title-desc">Use your cursor to pick a color from the image.</p>
        <div className="btn-group image-buttons">
          <button className="btn btn-default" onClick={onReplaceImageClick}>Replace Image</button>
          <button className="btn btn-default" onClick={onBackClick}>Cancel</button>
        </div>
        <div className="uploaded-image">
          <img src={image} id="picker-image" style={{cursor: 'crosshair'}} />
          <canvas id="image-canvas" style={{display: 'none'}}></canvas>
        </div>
        <div className="image-colors">
          {imageColors.map(color => {
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
      </div>
    );
  }
}
