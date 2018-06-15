import React, { Component } from 'react';
import BeddingBuilder from '../components/BeddingBuilder';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';
import { hexToPantone } from '../lib/hexToPantone';

export default class BeddingBuilderContainer extends Component {

  state = {
    view: 'index', // or 'have', 'help', 'uploadImage', 'pickImageColor', 'enterPantone'
    image: '', // User uploaded image, for color picker
    imageColors: [], // Closest Pantone colors when color is picked from image
    pantoneCode: '' // User-entered Pantone code
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
    this.setState({ view: 'enterPantone' });
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
      view: 'uploadImage',
      imageColors: []
    }, () => {
      $('.image-uploader input').click();
    });
  };

  handleColorPick = hexCode => {
    const matches = new hexToPantone(hexCode, 3);
    const pantoneCodes = matches.map(match => `${match} TCX`);
    Meteor.call('Colors.getByPantoneCodes', pantoneCodes, (err, imageColors) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ imageColors });
      }
    });
  };

  handlePantoneCodeChange = e => {
    this.setState({ pantoneCode: e.target.value });
  };

  handlePantoneCodeFormSubmit = e => {
    e.preventDefault();
    const { pantoneCode } = this.state;
    if (!pantoneCode) {
      return alert('Enter a Pantone code to continue.');
    }
    Meteor.call('Colors.getByPantoneCodes', [this.state.pantoneCode], (err, colors) => {
      if (err) {
        alert(err.reason);
      } else if (!colors[0]) {
        alert(`We were unable find a Pantone with the code: ${this.state.pantoneCode}`);
      } else {
        ReactionRouter.go(colors[0].pdpURL);
      }
    });
  };

  render () {
    const { view, image, imageColors, pantoneCode } = this.state;

    return (
      <BeddingBuilder
        view={view}
        image={image}
        imageColors={imageColors}
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
        onColorPick={this.handleColorPick}
        pantoneCode={pantoneCode}
        onPantoneCodeChange={this.handlePantoneCodeChange}
        onPantoneCodeFormSubmit={this.handlePantoneCodeFormSubmit}
      />
    );
  }
}
