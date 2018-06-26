import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';

export default class EnterPantoneView extends Component {

  static propTypes = {
    onPantoneCodeChange: PropTypes.func.isRequired,
    onPantoneCodeFormSubmit: PropTypes.func.isRequired
  }

  render () {
    const {
      pantoneCode,
      onPantoneCodeChange,
      onPantoneCodeFormSubmit
    } = this.props;

    return (
      <div className="view">
      <div className="color-section">
      <div className="progressbarrow w-row">
        <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
          <div className="progress-bar-div current"></div>
        </div>
        <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
          <div className="progress-bar-div current"></div>
        </div>
        <div className="progress-bar w-col w-col-3 w-col-medium-3 w-col-small-3 w-col-tiny-3">
          <div className="progress-bar-div current"></div>
        </div>
        <div className="progress-bar w-col w-col-2 w-col-medium-2 w-col-small-2 w-col-tiny-2">
          <div className="progress-bar-div current"></div>
        </div>
        <div className="progress-bar w-col w-col-1 w-col-medium-1 w-col-small-1 w-col-tiny-1">
          <div className="progress-bar-div"></div>
        </div>
      </div>
        <div className="div-block-39">
          <div className="container-2 w-container">
            <div>
              <div className="div-block-17 w-clearfix">
                <h1 className="heading-4">Pick a Pantone</h1><img src="/images/question-mark-1question-mark.png" width="19" className="image-7"/></div>
              <div className="div-block-19">
                <div className="text-block-15">Enter a TCX code.</div>
              </div>
            </div>
            <div>
              <div className="pantone-block">
                <div className="form-block-4 w-form">
                <div className="pantone-input">
                  <form onSubmit={onPantoneCodeFormSubmit}>
                    <input
                      type="text"
                      placeholder="12-3456 TCX"
                      onChange={onPantoneCodeChange}
                      value={pantoneCode}
                    /><br></br>
                    <input type="submit" className="button panton w-button" value="Submit" />
                  </form>
                </div>
                </div>
                  <BackLink {...this.props} />
              </div>
            </div></div>
        </div>
      </div>

      </div>
    );
  }
}
