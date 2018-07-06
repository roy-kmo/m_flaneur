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
                <h1 className="heading-3-no-tooltip-2">Enter Your Pantone Code</h1>
            </div>
            <div className="div-block-19">
              <div className="text-block-15">Enter a TCX code and submit.</div>
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
              <div className="help-block w-container">
                <div className="row-28 w-row">
                  <div className="column-22 w-col w-col-4">
                  <div>
                    <h1 className="heading-7">Chat with us</h1>
                    <p className="paragraph-3">Our concierge is available to assist you with color selections and more. </p><a href="#" onClick={()=>{ Intercom('show'); }} className="side-button">Chat</a></div>
                </div>
                  <div className="column-22 w-col w-col-4">
                    <div>
                      <h1 className="heading-7">Get color tips</h1>
                      <p className="paragraph-3">Get practical expert color advice from interior design insiders.</p>
                    </div><a href="/pages/using-color" className="side-button">See Color Tips</a></div>
                  <div className="column-22 w-col w-col-4">
                    <div>
                      <h1 className="heading-7">Explore the blog</h1>
                      <p className="paragraph-3">Read our blog for color inspiration, how-to guides, and much more. </p><a href="www.hiflaneur.com/salon" className="side-button">Go to Salon</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    );
  }
}
