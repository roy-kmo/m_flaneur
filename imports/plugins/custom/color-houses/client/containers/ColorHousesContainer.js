import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ColorHouses from '../components/ColorHouses';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';

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
        setMeta('Color Houses');
        // Tell prerender.io that our page is ready
        window.prerenderReady = true;
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
