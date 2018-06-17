import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import BackLink from './BackLink';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';
import handleSwatchbookAddClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookAddClick';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';

class PickImageColorView extends Component {

  static propTypes = {
    image: PropTypes.string,
    imageColors: PropTypes.array,
    onReplaceImageClick: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    swatchbookColorIds: PropTypes.array.isRequired
  }

  render () {
    const {
      image,
      imageColors,
      onReplaceImageClick,
      onBackClick,
      swatchbookColorIds
    } = this.props;

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
                isInSwatchbook={swatchbookColorIds.includes(_id)}
                onSwatchbookAddClick={handleSwatchbookAddClick}
                onSwatchbookRemoveClick={handleSwatchbookRemoveClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();
  const { swatchbookColorIds } = user.profile;
  return {
    swatchbookColorIds: swatchbookColorIds || []
  };
})(PickImageColorView);
