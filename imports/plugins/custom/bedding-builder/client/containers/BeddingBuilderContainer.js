import React, { Component } from 'react';
import BeddingBuilder from '../components/BeddingBuilder';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';

export default class BeddingBuilderContainer extends Component {

  state = {
    view: 'index', // or 'have', 'help'
  };

  componentDidMount () {
    setMeta('Bedding Builder');
    window.prerenderReady = true;
  }

  handleHaveClick = () => {
    this.setState({ view: 'have' });
  };

  handleHelpClick = () => {
    this.setState({ view: 'help' });
  };

  handleUploadClick = () => {
    console.log('Upload clicked');
  }

  handleEnterPantoneClick = () => {
    console.log('Enter Pantone clicked');
  };

  handleColorHousesClick = () => {
    ReactionRouter.go('/color-houses');
  };

  handleBackClick = () => {
    this.setState({ view: 'index' });
  };

  handleColorTipsClick = () => {
    alert('TBD');
  };

  handleCapsulesClick = () => {
    alert('TBD, go to first Capsule PDP by alphabetical order?');
  };

  render () {
    const { view } = this.state;

    return (
      <BeddingBuilder
        view={view}
        onHaveClick={this.handleHaveClick}
        onHelpClick={this.handleHelpClick}
        onUploadClick={this.handleUploadClick}
        onEnterPantoneClick={this.handleEnterPantoneClick}
        onColorHousesClick={this.handleColorHousesClick}
        onBackClick={this.handleBackClick}
        onColorTipsClick={this.handleColorTipsClick}
        onCapsulesClick={this.handleCapsulesClick}
      />
    );
  }
}
