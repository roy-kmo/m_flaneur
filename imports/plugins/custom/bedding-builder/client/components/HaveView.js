import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorHousesOption from './ColorHousesOption';
import BackLink from './BackLink';

export default class HaveView extends Component {

  static propTypes = {
    onUploadClick: PropTypes.func.isRequired,
    onEnterPantoneClick: PropTypes.func.isRequired
  }

  render () {
    const { onUploadClick, onEnterPantoneClick } = this.props;

    return (
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
          <ColorHousesOption {...this.props} />
        </div>
        <BackLink {...this.props} />
      </div>
    );
  }
}
