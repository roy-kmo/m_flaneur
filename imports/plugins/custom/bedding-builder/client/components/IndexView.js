import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IndexView extends Component {

  static propTypes = {
    onHaveClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired
  }

  render () {
    const { onHaveClick, onHelpClick } = this.props;

    return (
      <div className="view">
      <div className="color-section">
        <div className="row-20 w-row">
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div current"></div>
          </div>
          <div className="progress-bar w-col w-col-3">
            <div className="progress-bar-div"></div>
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
              <h1 className="heading-3-no-tooltip-2">Create Your Custom Color Bedding</h1>
              <div className="div-block-19">
                <div className="text-block-15">Select one.</div>
              </div>
            </div>
          </div>
          <div className="w-container">
            <div className="div-block-40">
              <div className="w-row">
                <div className="w-col w-col-1"></div>
                <div className="column beddingbuilder_column-left w-col w-col-5 option have-color" onClick={onHaveClick}><a href="#" className="link-2 beddingbuilder">I know what (color) I want</a></div>
                <div data-w-id="107033c9-249c-b8cd-65d5-d577f77cb898" className="column-right-4 bedding_builder_column_right w-col w-col-5 option need-help" onClick={onHelpClick}><a href="#" className="link-2 beddingbuilder">I need help finding a color</a></div>
                <div className="w-col w-col-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-7-copy w-container">
          <div className="row-28 w-row">
            <div className="column-22 w-col w-col-4">
              <div>
                <h1 className="heading-7">Chat with us</h1>
                <p className="paragraph-3">Our concierge is available to assist you with color selections and more. </p><a href="#" className="side-button">Chat</a></div>
            </div>
            <div className="column-22 w-col w-col-4">
              <div>
                <h1 className="heading-7">Get color tips</h1>
                <p className="paragraph-3">Get practical expert color advice from interior design insiders.</p>
              </div><a href="#" className="side-button">See Color Tips</a></div>
            <div className="column-22 w-col w-col-4">
              <div>
                <h1 className="heading-7">Explore the blog</h1>
                <p className="paragraph-3">Read our blog for color inspiration, how-to guides, and much more. </p><a href="#" className="side-button">Go to Salon</a></div>
            </div>
          </div>
          <div className="row-21 w-row">
            <div className="w-col w-col-1"></div>
            <div className="w-col w-col-10"></div>
            <div className="w-col w-col-1"></div>
          </div>
        </div>
      </div>
      
      </div>
    );
  }
}
