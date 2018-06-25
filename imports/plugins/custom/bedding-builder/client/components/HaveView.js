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
      <div className="color-section">
        <div className="row-20 w-row">
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div current"></div>
          </div>
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div current"></div>
          </div>
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div"></div>
          </div>
          <div className="progress-bar w-col w-col-2">
            <div className="progress-bar-div"></div>
          </div>
          <div className="progress-bar w-col w-col-1">
            <div className="progress-bar-div"></div>
          </div>
        </div>
        <div className="div-block-39">
          <div className="div-block-9">
            <div className="div-block-17-no-tooltip">
              <h1 className="heading-3-no-tooltip-2">I have a color in mind.</h1>
            </div>
            <div className="div-block-19">
              <div className="text-block-15">Select one.</div>
            </div>
          </div>
          <div className="w-container">
            <div className="div-block-40">
              <div className="row-11 w-row">
                <div className="w-col w-col-1"></div>
                <div className="column-center-2 w-col w-col-3 option upload-image" onClick={onUploadClick}><a href="#" className="link-2">Upload an Image</a>
                  <div data-hover="1" data-delay="0" className="dropdown-10 w-dropdown">
                    <div className="dropdown-toggle-7 w-dropdown-toggle"><img src="/images/question-mark-1question-mark.png" className="question-centered" width="19"/></div>
                    <nav className="dropdown-list-10 w-dropdown-list">
                      <div className="text-block-41">Already have an image in mind? Upload and start with that.</div>
                    </nav>
                  </div>
                </div>
                <div data-w-id="752a8a1c-d23e-4816-c8bd-fce5379942c9" className="column-center-2 w-col w-col-4 option enter-pantone" onClick={onEnterPantoneClick}><a href="#" className="link-2 column_center_link">Enter Pantone Code</a>
                  <div data-hover="1" data-delay="0" className="dropdown-10 w-dropdown">
                    <div className="dropdown-toggle-7 w-dropdown-toggle"><img src="/images/question-mark-1question-mark.png" className="question-centered" width="19"/></div>
                    <nav className="dropdown-list-10 w-dropdown-list">
                      <div className="text-block-41">The standard has already been set. Add the Pantone number here.</div>
                    </nav>
                  </div>
                </div>
                <div className="column-right-3 w-col w-col-3"><a href="/color-houses" className="link-2">See Color Houses</a>
                  <div data-hover="1" data-delay="0" className="dropdown-10 w-dropdown">
                    <div className="dropdown-toggle-7 w-dropdown-toggle"><img src="/images/question-mark-1question-mark.png" width="19" className="question-centered"/></div>
                    <nav className="dropdown-list-10 w-dropdown-list">
                      <div className="text-block-41">The stories of our color palettes live here. Get inspired.</div>
                    </nav>
                  </div>
                </div>
                <div className="w-col w-col-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
