import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';
import ColorHousesOption from './ColorHousesOption';

export default class HelpView extends Component {

  static propTypes = {
    onColorTipsClick: PropTypes.func.isRequired,
    onCapsulesClick: PropTypes.func.isRequired
  }

  render () {
    const { onColorTipsClick, onCapsulesClick } = this.props;

    return (
      <div className="view">
      <div className="color-section">
        <div className="div-block-39">
          <div className="div-block-9">
            <div className="div-block-17-no-tooltip">
              <h1 className="heading-3-no-tooltip-2">I need inspiration.</h1>
            </div>
            <div className="div-block-19">
              <div className="text-block-15">Select one.</div>
            </div>
          </div>
          <div className="w-container">
            <div className="div-block-40">
              <div className="row-11 w-row">
                <div className="w-col w-col-1"></div>
                <div className="column-center-2 w-col w-col-3 option color-tips" onClick={onColorTipsClick}><a href="#" className="link-2">Get Color Tips</a><img src="/images/question-mark_1question-mark.png" width="19" className="question-centered"/></div>
                <div data-w-id="38f658d3-bdab-30c1-6a3d-777d0556dc52" className="column-center-2 w-col w-col-4 option capsules" onClick={onCapsulesClick}><a href="#" className="link-2 column_center_link">See Designer Capsules</a><img src="/images/question-mark_1question-mark.png" width="19" className="question-centered"/></div>
                <div className="column-right-3 w-col w-col-3"><a href="/color-houses" className="link-2">See Color Houses</a><img src="/images/question-mark_1question-mark.png" width="19" className="question-centered"/></div>
                <div className="w-col w-col-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <h1>I need inspiration.</h1>
        <p className="title-desc">Select one.</p>
        <div className="options-container">
          <div className="option color-tips" onClick={onColorTipsClick}>
            <h3>Get Color Tips</h3>
          </div>
          <div className="option capsules" onClick={onCapsulesClick}>
            <h3>See Designer Capsules</h3>
          </div>
          <ColorHousesOption {...this.props} />
        </div>
        <BackLink {...this.props} />
      </div>
    );
  }
}
