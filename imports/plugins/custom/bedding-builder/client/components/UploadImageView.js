import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';

export default class UploadImageView extends Component {

  static propTypes = {
    onImageChange: PropTypes.func.isRequired
  }

  render () {
    const { onImageChange } = this.props;

    return (
      <div className="view">
        <h1>Upload an Image</h1>
        <p className="title-desc">You will be able to pull colors from the image on the next page.</p>
        <div className="image-uploader">
          <input type="file" onChange={onImageChange} />
        </div>
        <BackLink {...this.props} />
      </div>
    );
  }
}
