import React, { Component } from 'react';
import BeddingBuilder from '../components/BeddingBuilder';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';

export default class BeddingBuilderContainer extends Component {

  state = {
    view: 'index', // or 'have', 'help', 'uploadImage', 'pickImageColor'
    image: '' // User uploaded image, for color picker
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
    this.setState({ view: 'uploadImage' });
  };

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

  handleImageChange = e => {
    const files = e.target.files;
    if (files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          image: reader.result,
          view: 'pickImageColor'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  handleReplaceImageClick = e => {
    this.setState({
      image: '',
      view: 'uploadImage'
    });
  };

  render () {
    const { view, image } = this.state;

    return (
      <BeddingBuilder
        view={view}
        image={image}
        onHaveClick={this.handleHaveClick}
        onHelpClick={this.handleHelpClick}
        onUploadClick={this.handleUploadClick}
        onEnterPantoneClick={this.handleEnterPantoneClick}
        onColorHousesClick={this.handleColorHousesClick}
        onBackClick={this.handleBackClick}
        onColorTipsClick={this.handleColorTipsClick}
        onCapsulesClick={this.handleCapsulesClick}
        onImageChange={this.handleImageChange}
        onReplaceImageClick={this.handleReplaceImageClick}
      />
    );
  }
}
