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
