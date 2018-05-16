import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Reaction, Router } from '/client/api';
import Blaze from "meteor/gadicc:blaze-react-component";

export default class PageContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      isNotFound: false
    }
  }

  componentDidMount () {
    Meteor.call('Pages.get', Router.getParam('path'), (err, page) => {
      if (err) {
        alert(err.reason);
      } else if (page) {
        this.setState(page);
        // Add meta description
        Reaction.DOM.setMetaTag({
          name: 'description',
          content: page.description
        });
        // Set page title
        document.title = page.title;
        // Tell prerender.io that our page is ready
        window.prerenderReady = true;
      } else {
        this.setState({ isNotFound: true });
      }
    });
  }

  render () {
    const { title, body, isNotFound } = this.state;
    return (
      <div className="page-container">
        {title && (
          <h1 className="page-title">{title}</h1>
        )}
        {body && (
          <div className="page-body" dangerouslySetInnerHTML={{__html: body}} />
        )}
        {isNotFound && (
          <Blaze template={Template.notFound} />
        )}
      </div>
    )
  }
}
