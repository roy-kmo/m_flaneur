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
            <div className="progress-bar-div current"></div>
          </div>
          <div className="progress-bar w-col w-col-1">
            <div className="progress-bar-div"></div>
          </div>
        </div>
        <div className="div-block-39">
          <div className="container-2 w-container">
            <div>
              <div className="div-block-17 w-clearfix">
                <h1 className="heading-4">Pick a Pantone</h1><img src="/images/question-mark_1question-mark.png" width="19" className="image-7"/></div>
              <div className="div-block-19">
                <div className="text-block-15">Enter a TXC code.</div>
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
                    />
                    <input type="submit" className="btn btn-primary" value="Submit" />
                  </form>
                </div>
                </div>
              </div>
            </div><a href="#" className="button panton w-button">View</a></div>
        </div>
      </div>
        <h1>Enter a Pantone Code</h1>
        <p className="title-desc">Enter any TCX Pantone code to view our products in that color.</p>
        <div className="pantone-input">
          <form onSubmit={onPantoneCodeFormSubmit}>
            <input
              type="text"
              placeholder="12-3456 TCX"
              onChange={onPantoneCodeChange}
              value={pantoneCode}
            />
            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </div>
        <BackLink {...this.props} />
      </div>
    );
  }
}
