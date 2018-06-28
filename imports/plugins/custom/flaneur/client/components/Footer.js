import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import MailchimpSubscribe from "react-mailchimp-subscribe"

export default class Footer extends Component {

  render () {
    return (
      <Fragment> <div className="primary-footer-section">
    <div className="w-container">
      <div className="w-row">
        <div className="w-col w-col-2">
          <div className="footer-column">
            <h5 className="row-title inverted">Color Services</h5>
            <ul className="footer-list w-list-unstyled">
              <li className="footer_list_item"><a href="/color-house" className="footer_link">Color House</a></li>
              <li className="footer_list_item"><a href="/capsule" className="footer_link">Shop the Look</a></li>
              <li className="footer_list_item"><a href="/design-your-bedding" className="footer_link">Upload Image</a></li>
              <li className="footer_list_item"><a href="/swatchbox" className="footer_link">Swatch Box</a></li>
              <li className="footer_list_item"><a href="/contact-us" className="footer_link">Concierge</a></li>
            </ul>
          </div>
        </div>
        <div className="w-col w-col-2">
          <div className="footer-column">
            <h5 className="row-title inverted">World of Flaneur</h5>
            <ul className="footer-list w-list-unstyled">
              <li className="footer_list_item"><a href="/press" className="footer_link">Press Kit</a></li>
              <li className="footer_list_item"><a href="/press" className="footer_link">Media Coverage</a></li>
              <li className="footer_list_item"><a href="/Supply-Chain" className="footer_link">Supply Chain</a></li>
              <li className="footer_list_item"><a href="/about-us" className="footer_link">About Us</a></li>
              <li className="footer_list_item"><a href="/blog" className="footer_link">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="w-col w-col-2">
          <div className="footer-column">
            <h5 className="row-title inverted">Support</h5>
            <ul className="footer-list w-list-unstyled">
              <li className="footer_list_item"><a href="/FAQ" className="footer_link">FAQ</a></li>
              <li className="footer_list_item"><a href="/Contact-Us" className="footer_link">Contact Us</a></li>
              <li className="footer_list_item"><a href="/FAQ#shipping" className="footer_link">Shipping and Return</a></li>
              <li className="footer_list_item"><a href="/contact-us" className="footer_link">212-FLANEUR </a></li>
              <li className="footer_list_item"><a href="/contact-us" className="footer_link">support@hiflaneur.com</a></li>
            </ul>
          </div>
        </div>
        <div className="w-col w-col-2">
          <div className="footer-column">
            <h5 className="row-title inverted">Connect</h5>
            <ul className="footer-list w-list-unstyled">
              <li className="footer_list_item"><a href="http://www.instagram.com/flaneurnyc" className="footer_link">Instagram</a></li>
              <li className="footer_list_item"><a href="http://www.facebook.com/hiflaneur" className="footer_link">Facebook</a></li>
              <li className="footer_list_item"><a href="http://www.pinterest.com/flaneurnyc" className="footer_link">Pinterest</a></li>
              <li className="footer_list_item"><a href="http://www.vimeo.com/flaneurnyc" className="footer_link">Vimeo</a></li>
              <li className="footer_list_item"><a href="http://www.twitter.com/flaneurnyc" className="footer_link">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="w-col w-col-4">
          <div className="footer-column">
            <h5 className="row-title inverted">Newsletter</h5>
            <div className="footer-newsletter-block">
              <div className="text-block footer">Receive exclusive access to promotions, collection announcements, tips, designer interviews, and more.</div>
              <div className="w-form">

                  <div className="w-row"><div className="mailchimpe-container">
                   <MailchimpSubscribe url={Meteor.settings.public.mailchimpFormURL || ''} /></div>
                  </div>


              </div>
            </div>
          </div>
        </div>
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
