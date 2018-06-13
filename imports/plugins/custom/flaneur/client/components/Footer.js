import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import MailchimpSubscribe from "react-mailchimp-subscribe"

export default class Footer extends Component {

  render () {
    return (
      <Fragment>
        <div id="footer-container">
          <div id="footer">
            <div id="footer-newsletter-signup">
              <h4>Newsletter</h4>
              <p>Nullam luctus sem eu purus placerat semper. Duis tincidunt, augue non tincidunt rutrum, nunc ex ultricies erat.</p>
               <MailchimpSubscribe url={Meteor.settings.public.mailchimpFormURL || ''} />
            </div>
          </div>
        </div>
        <div id="copyright-container">
          <div id="copyright">
            <p>&copy; {new Date().getFullYear()} Flaneur. All rights reserved. <a href="javascript:void(0)">Legal</a></p>
          </div>
        </div>
      </Fragment>
    )
  }
}
