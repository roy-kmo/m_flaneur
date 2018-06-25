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
      <div className="color-section">
        <div className="row-20 w-row">
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div current"></div>
          </div>
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div current"></div>
          </div>
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div current"></div>
          </div>
          <div className="progress-bar w-col w-col-2">
            <div className="progress-bar-div"></div>
          </div>
          <div className="progress-bar w-col w-col-1">
            <div className="progress-bar-div"></div>
          </div>
        </div>
        <div className="div-block-39">
          <div className="container-2 w-container">
            <div>
              <div className="div-block-17 w-clearfix">
                  <h1 className="heading-3-no-tooltip-2">Upload an Image</h1>

              </div>
              <div className="div-block-19">
                <div className="text-block-15">You can refine it on the next page</div>
              </div>
            </div>
            <div>
              <div className="div-block-9co">
                <div className="div-block-15"><div className="image-uploader">
                  <input type="file" onChange={onImageChange} />
                </div></div>
                <div>

                </div>
              </div>
            </div>
            <div className="row-21 w-row">
              <div className="w-col w-col-1"></div>
              <div className="w-col w-col-10"><a href="#" className="link-back">Start over</a></div>
              <div className="w-col w-col-1"></div>
            </div>
          </div>
        </div>
      </div>
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
