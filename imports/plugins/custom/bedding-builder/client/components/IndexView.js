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
        <h1>Bedding Builder</h1>
        <p className="title-desc">Select one.</p>
        <div className="options-container">
          <div className="option have-color" onClick={onHaveClick}>
            <h3>I have a color in mind</h3>
          </div>
          <div className="option need-help" onClick={onHelpClick}>
            <h3>I need help finding a color</h3>
          </div>
        </div>
      </div>
    );
  }
}
