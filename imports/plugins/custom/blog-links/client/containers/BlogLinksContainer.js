import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { BlogLinksTable } from '../../lib/tables';
import BlogLinkForm from '../components/BlogLinkForm';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Reaction, Logger } from "/client/api";
import { Media } from "/imports/plugins/core/files/client";

export default class BlogLinksContainer extends Component {

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      title: '',
      imageFileId: '',
      imageFileName: '',
      description: '',
      url: '',
    };

    this.state = {
      view: 'list', // list, add, edit
      formFields: {}
    };
  }

  componentDidMount () {
    setTimeout(this.initTrackers, 0);
  }

  initTrackers = () => {
    // Watch for edit button click
    this.editTracker = Tracker.autorun(() => {
      const blogLink = Session.get('BlogLinks.editBlogLink');
      if (blogLink) {
        this.setState({
          view: 'edit',
          formFields: blogLink
        });
      }
    });

    // Watch for delete button click
    this.deleteTracker = Tracker.autorun(() => {
      const _id = Session.get('BlogLinks.deleteId');
      if (_id) {
        Session.set('BlogLinks.deleteId', undefined);
        if (confirm('Are you sure you want to delete this blog post link?')) {
          Meteor.call('BlogLinks.delete', _id, (err) => {
            if (err) {
              alert(err.reason);
            } else {
              this.setState({
                view: 'list'
              });
            }
          });
        }
      }
    });
  };

  componentWillUnmount () {
    this.editTracker.stop();
    this.deleteTracker.stop();
  }

  handleAddClick = e => {
    this.setState({
      view: 'add',
      formFields: { ... this.newFormFields }
    });
  };

  handleInputChange = e => {
    const { formFields } = this.state;
    formFields[e.target.name] = e.target.value;
    this.setState({ formFields });
  };

  handleDescriptionChange = description => {
    const { formFields } = this.state;
    formFields.description = description;
    this.setState({ formFields });
  };

  handleNewBlogLinkSave = e => {
    e.preventDefault();
    Meteor.call('BlogLinks.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditBlogLinkSave = e => {
    e.preventDefault();
    Meteor.call('BlogLinks.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
        Session.set('BlogLinks.editBlogLink', undefined);
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
    Session.set('BlogLinks.editBlogLink', undefined);
  }

  handleImageUpload = (imageFileId, imageFileName) => {
    const { formFields } = this.state;
    formFields.imageFileId = imageFileId;
    formFields.imageFileName = imageFileName;
    this.setState({ formFields });
  };

  handleImageRemove = () => {
    const { formFields } = this.state;
    formFields.imageFileId = '';
    formFields.imageFileName = '';
    this.setState({ formFields });
  };

  render () {
    const { view, formFields } = this.state;
    const isListView = view === 'list';
    const isAddView = view === 'add';
    const isEditView = view === 'edit';
    const saveFunc = isAddView && this.handleNewBlogLinkSave || this.handleEditBlogLinkSave;

    return (
      <div id="blog-links-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Blog Link</button>
            <TabularTable
              table={BlogLinksTable}
              id="blog-links-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <BlogLinkForm
            formFields={formFields}
            onInputChange={this.handleInputChange}
            onDescriptionChange={this.handleDescriptionChange}
            onSave={saveFunc}
            onBack={this.handleBack}
            onImageUpload={this.handleImageUpload}
            onImageRemove={this.handleImageRemove}
          />
        )}
      </div>
    );
  }
}
