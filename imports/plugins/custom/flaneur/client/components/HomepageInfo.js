import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageURL } from '../../lib/helpers';

export default class HomepageInfo extends Component {

  static propTypes = {
    info: PropTypes.object.isRequired
  }

  render () {
    const {
      title,
      description,
      buttonText,
      linkUrl,
      imageFileId,
      imageFileName
    } = this.props.info;

    let imageUrl = '';
    if (imageFileId) {
      imageUrl = getImageURL(imageFileId, imageFileName);
    }
    return (
      <div id="home-info">
        {imageUrl && <img id="home-info-image" src={imageUrl} />}
        <h2>{title}</h2>
        <div id="home-info-content" dangerouslySetInnerHTML={{__html: description}} />
        {buttonText && <a id="home-info-button" className="btn btn-default" href={linkUrl}>{buttonText}</a>}
      </div>
    );
  }
}
