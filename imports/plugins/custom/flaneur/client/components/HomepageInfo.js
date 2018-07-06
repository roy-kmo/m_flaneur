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
        <div className="intro"> Welcome to a world of color.</div>
        <div className="start-block">Start here:</div>
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
                  <a href="/pages/supply-chain"><li>Supply Chain</li></a>
                  <a href="/pages/using-color"><li>Using Color</li></a>
                  <a href="/pages/FAQ"><li>FAQ</li></a>
                  <a href="/color-houses"><li>Color Houses</li></a>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className="landing-row w-row">
    <div className="landing-row-column w-col w-col-4">
      <div className="landing-row-interaction"><img src="https://fr-assets.com/images/landingimage3.jpg" width="1287" srcSet="https://fr-assets.com/images/landingimage3.jpeg 500w, https://fr-assets.com/images/landingimage31080.jpeg 1080w" sizes="(max-width: 767px) 100vw, 33vw" className="landing-row-image"/>
        <div data-w-id="d7a49c34-64a9-3599-cf62-a11f2cebe54b" className="landing-row-link">
          <a href="https://hiflaneur.com/blogs/salon/hermes-first-female-perfumers-shares-her-favorite-sheet-color-and-the-perfect-gift" className="blog-title-link landing-version">Hermès Christine Nagel Shares Her Favorite Sheet Color</a>

        </div>
      </div>
    </div>
    <div className="landing-row-column w-col w-col-4">
      <div className="landing-row-interaction"><img src="https://fr-assets.com/images/landingimage1LR.jpg" width="1287" srcSet="https://fr-assets.com/images/BA_0079460_LR-p-500.jpeg 500w, https://fr-assets.com/images/BA_0079460_LR-p-1080.jpeg 1080w, https://fr-assets.com/images/BA_0079460_LR.jpg 1500w" sizes="(max-width: 767px) 100vw, 33vw" data-w-id="464b7a49-1938-b3c0-cdfe-bd8b79612abd" className="landing-row-image"/>
        <div data-w-id="464b7a49-1938-b3c0-cdfe-bd8b79612abe" className="landing-row-link">
          <a href="https://hiflaneur.com/blogs/salon/flaneur-exclusive-color-trend-summer-2018" className="blog-title-link landing-version">Flaneur Color Trends: Summer 2018</a>

        </div>
      </div>
    </div>
    <div className="landing-row-column w-col w-col-4">
      <div className="landing-row-interaction"><img src="https://fr-assets.com/images/landingimage2.jpg" width="1287" srcSet="https://fr-assets.com/images/landingimage21080.jpeg 1080w" sizes="(max-width: 767px) 100vw, 33vw" className="landing-row-image"/>
        <div className="landing-row-link">
          <a href="/pages/supply-chain" div className="blog-title-link landing-version">An Inside Look at Flaneur&#x27;s LA Dye House</a>

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
