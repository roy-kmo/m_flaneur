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
          <div className="div-block-81 w-clearfix">
            <div data-delay="0" data-w-id="4dc170f4-d696-303e-964f-fbc40f1b6d28" className="landing-dropdown w-dropdown">
              <div className="static-dropdown-a1 w-dropdown-toggle">
                <div className="heading-2-nav">Design</div>
              </div>
              <nav className="dropdown-list-2 w-clearfix w-dropdown-list"><a href="#" className="landing-link">Start a Color Journey</a></nav>
            </div>
            <div data-delay="0" className="landing-dropdown w-dropdown">
              <div className="static-dropdown-a1 w-dropdown-toggle">
                <div className="heading-2-nav">Capsule</div>
              </div>
              <nav className="dropdown-list-2 w-clearfix w-dropdown-list">
                <div className="w-clearfix"><a href="#" className="landing-link">Estee Stanley</a>
                  <div className="text-block-38">New</div>
                </div><a href="#" className="landing-link">View All Capsules</a></nav>
            </div>
            <div data-delay="0" className="landing-dropdown w-dropdown">
              <div className="static-dropdown-a1 w-dropdown-toggle">
                <div className="heading-2-nav">Explore</div>
              </div>
              <nav className="dropdown-list-2 w-clearfix w-dropdown-list"><a href="#" className="landing-link">Supply Chain</a><a href="#" className="landing-link">Press Coverage</a><a href="#" className="landing-link">FAQ</a><a href="#" className="landing-link"><em>Salon</em></a></nav>
            </div>
          </div>
        </div>
        <div className="div-block-84">
          <div className="text-c"><a href="#" className="link-4">Snow White</a></div>
          <div className="text-e"><a href="#" className="link-4">Rover Yellow</a></div>
          <div className="text-d"><a href="#" className="link-4">High Risk Red</a></div>
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
