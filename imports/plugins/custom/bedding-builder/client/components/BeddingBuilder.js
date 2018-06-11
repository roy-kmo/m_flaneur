import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initImageColorPicker } from '../lib/ImageColorPicker';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';

export default class BeddingBuilder extends Component {

  static propTypes = {
    view: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageColors: PropTypes.array,
    onHaveClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired,
    onUploadClick: PropTypes.func.isRequired,
    onEnterPantoneClick: PropTypes.func.isRequired,
    onColorHousesClick: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onColorTipsClick: PropTypes.func.isRequired,
    onCapsulesClick: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
    onReplaceImageClick: PropTypes.func.isRequired,
    onColorPick: PropTypes.func.isRequired
  };

  componentDidUpdate (prevProps) {
    const { view, onColorPick } = this.props;
    if (view === 'pickImageColor' && prevProps.view !== 'pickImageColor') {
      initImageColorPicker('#picker-image', '#image-canvas', onColorPick);
    }
  }

  renderBackLink = () => {
    const { onBackClick } = this.props;
    return (
      <p className="back-link">
        <a href="javascript:void(0)" onClick={onBackClick}>Go Back</a>
      </p>
    );
  };

  renderColorHousesOption = () => {
    const { onColorHousesClick } = this.props;
    return (
      <div className="option color-houses" onClick={onColorHousesClick}>
        <h3>See Color Houses</h3>
      </div>
    );
  };

  render () {
    const {
      view,
      image,
      imageColors,
      onHaveClick,
      onHelpClick,
      onUploadClick,
      onEnterPantoneClick,
      onColorHousesClick,
      onColorTipsClick,
      onCapsulesClick,
      onImageChange,
      onBackClick,
      onReplaceImageClick
    } = this.props;

    return (
      <div id="bedding-builder-container">
        {view === 'index' && (
          <div className="view">
            <h1>Bedding Builder</h1>
            <p className="title-desc">Select one.</p>
            <div className="options-container">
              <div className="option have-color" onClick={onHaveClick}>
                <h3>I have a color in mind</h3>
              </div>
              <div className="option need-help" onClick={onHelpClick}>
                <h3>I need help finding a color</h3>
              </div>
            </div>
          </div>
        )}
        {view === 'have' && (
          <div className="view">
            <h1>I have a color in mind.</h1>
            <p className="title-desc">Select one.</p>
            <div className="options-container">
              <div className="option upload-image" onClick={onUploadClick}>
                <h3>Upload an Image</h3>
              </div>
              <div className="option enter-pantone" onClick={onEnterPantoneClick}>
                <h3>Enter Pantone Code</h3>
              </div>
              {this.renderColorHousesOption()}
            </div>
            {this.renderBackLink()}
          </div>
        )}
        {view === 'help' && (
          <div className="view">
            <h1>I need inspiration.</h1>
            <p className="title-desc">Select one.</p>
            <div className="options-container">
              <div className="option color-tips" onClick={onColorTipsClick}>
                <h3>Get Color Tips</h3>
              </div>
              <div className="option capsules" onClick={onCapsulesClick}>
                <h3>See Designer Capsules</h3>
              </div>
              {this.renderColorHousesOption()}
            </div>
            {this.renderBackLink()}
          </div>
        )}
        {view === 'uploadImage' && (
          <div className="view">
            <h1>Upload an Image</h1>
            <p className="title-desc">You can refine it on the next page.</p>
            <div className="image-uploader">
              <input type="file" onChange={onImageChange} />
            </div>
          </div>
        )}
        {view === 'pickImageColor' && (
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
        )}
      </div>
    )
  }
}
