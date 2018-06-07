import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ColorHouses from '../components/ColorHouses';

export default class ColorHousesContainer extends Component {

  state = {
    colorHouses: []
  };

  componentDidMount () {
    Meteor.call('ColorHouses.get', (err, colorHouses) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ colorHouses });
      }
    });
  }

  handleColorClick = (e, pdpURL) => {
    e.preventDefault();
    ReactionRouter.go(pdpURL);
  };

  render () {
    const { colorHouses } = this.state;
    return (
      <ColorHouses
        colorHouses={colorHouses}
        onColorClick={this.handleColorClick}
      />
    );
  }
}
