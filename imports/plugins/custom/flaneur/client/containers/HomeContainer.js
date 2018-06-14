import React, { Component } from 'react';
import { setMeta } from '/imports/plugins/custom/flaneur/client/lib/seo';
import HomepageInfo from '../components/HomepageInfo';

export default class HomeContainer extends Component {

  state = {
    homepageInfo: {}
  }

  componentDidMount () {
    Meteor.call('Flaneur.getHomepageInfo', (err, homepageInfo) => {
      this.setState({ homepageInfo });
      setMeta('Contemporary Luxury Bedding Company. Custom color, dyed-to-order.');
      // Tell prerender.io that our page is ready
      window.prerenderReady = true;
    });
  }

  render () {
    const { homepageInfo } = this.state;

    return (
      <div id="home-container">
        {homepageInfo.title && <HomepageInfo info={homepageInfo} />}
      </div>
    )
  }
}
