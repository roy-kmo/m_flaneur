import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackLink from './BackLink';

export default class EnterPantoneView extends Component {

  static propTypes = {
    onPantoneCodeEnter: PropTypes.func.isRequired
  }

  render () {
    const { onPantoneCodeEnter } = this.props;

    return (
      <div className="view">
        <h1>Enter a Pantone Code</h1>
        <p className="title-desc">Enter any TCX Pantone code to view our products in that color.</p>
        <div className="pantone-input">
          <input
            type="text"
            placeholder="12-3456 TCX"
            onKeyPress={onPantoneCodeEnter}
          />
        </div>
        <BackLink {...this.props} />
      </div>
    );
  }
}
