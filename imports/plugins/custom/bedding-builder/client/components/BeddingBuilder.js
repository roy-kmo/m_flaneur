import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BeddingBuilder extends Component {

  static propTypes = {
    view: PropTypes.string.isRequired,
    onHaveClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired,
    onUploadClick: PropTypes.func.isRequired,
    onEnterPantoneClick: PropTypes.func.isRequired,
    onColorHousesClick: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
  };

  renderBackLink = () => {
    const { onBackClick } = this.props;
    return (
      <p className="back-link">
        <a href="javascript:void(0)" onClick={onBackClick}>Go Back</a>
      </p>
    );
  };

  render () {
    const {
      view,
      onHaveClick,
      onHelpClick,
      onUploadClick,
      onEnterPantoneClick,
      onColorHousesClick
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
                <h3>I need help choosing a color</h3>
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
              <div className="option color-houses" onClick={onColorHousesClick}>
                <h3>See Color Houses</h3>
              </div>
            </div>
            {this.renderBackLink()}
          </div>
        )}
        {view === 'help' && (
          <div className="view">
            <h1>I need help choosing a color.</h1>
            <p className="title-desc">Select one.</p>
            <div className="options-container">
              <div className="option todo">
                <h3>TODO</h3>
              </div>
            </div>
            {this.renderBackLink()}
          </div>
        )}
      </div>
    )
  }
}
