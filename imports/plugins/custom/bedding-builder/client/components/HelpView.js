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
