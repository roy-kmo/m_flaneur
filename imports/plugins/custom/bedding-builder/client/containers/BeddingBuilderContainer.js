import React, { Component } from 'react';
import BeddingBuilder from '../components/BeddingBuilder';

export default class BeddingBuilderContainer extends Component {

  state = {
    view: 'index', // or 'have', 'help'
  };

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
      />
    );
  }
}
