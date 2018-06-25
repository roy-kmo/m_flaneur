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
      <div className="content-section landing">
    <div className="container-8 w-container">
      <div className="div-landing w-clearfix">
        <div className="landing-drops">
        <ul className="landing">
<li>
  <input type="checkbox" id="list-item-1"/>
  <label htmlFor="list-item-1" className="heading-2-nav">Design</label>
  <ul>
    <a href="/design-your-bedding"><li>Design Your Bedding</li></a>
  </ul>
</li>
<li>
  <input type="checkbox" id="list-item-2"/>
  <label htmlFor="list-item-2" className="heading-2-nav">Capsule</label>
  <ul>
    <a href="/product/sasha-bikoff"><li>Sasha Bikoff</li></a>
    <a href="/product/estee-stanley"><li>Estee Stanley</li></a>
     <a href="/product/sophie-donelson"><li>Sophie Donelson</li></a>
  </ul>
</li>
<li>
  <input type="checkbox" id="list-item-3"/>
  <label htmlFor="list-item-3" className="heading-2-nav">Explore</label>
  <ul>
    <a href="/supply-chain"><li>Supply Chain</li></a>
    <a href="/using-color"><li>Using Color</li></a>
    <a href="/FAQ"><li>FAQ</li></a>
  </ul>
</li>
</ul>
        </div>

      </div>
      </div>
  </div>
        {imageUrl && <img id="home-info-image" src={imageUrl} />}
        <h2>{title}</h2>
        <div id="home-info-content" dangerouslySetInnerHTML={{__html: description}} />
        {buttonText && <a id="home-info-button" className="btn btn-default" href={linkUrl}>{buttonText}</a>}
      </div>
    );
  }
}
