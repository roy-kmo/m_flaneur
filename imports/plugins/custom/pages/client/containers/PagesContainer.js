import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { PagesTable } from '../../lib/tables';
import { PagesForm } from '../components';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class PagesContainer extends Component {

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      title: '',
      body: '',
      path: '',
      isPublished: false
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
      const page = Session.get('Pages.editPage');
      if (page) {
        this.setState({
          view: 'edit',
          formFields: page
        });
      }
    });

    // Watch for delete button click
    this.deleteTracker = Tracker.autorun(() => {
      const _id = Session.get('Pages.deleteId');
      if (_id && confirm('Are you sure you want to delete this page?')) {
        Meteor.call('Pages.delete', _id, (err) => {
          if (err) {
            alert(err.reason);
          } else {
            this.setState({
              view: 'list'
            });
          }
        })
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

  handleBodyChange = body => {
    const { formFields } = this.state;
    formFields.body = body;
    this.setState({ formFields });
  };

  handlePublishedChange = e => {
    const { formFields } = this.state;
    formFields.isPublished = e.target.checked;
    this.setState({ formFields });
  };

  handleNewPageSave = e => {
    e.preventDefault();
    Meteor.call('Pages.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditPageSave = e => {
    e.preventDefault();
    Meteor.call('Pages.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
  }

  render () {
    const { view, formFields } = this.state;
    const isListView = view === 'list';
    const isAddView = view === 'add';
    const isEditView = view === 'edit';
    const pageSaveFunc = isAddView && this.handleNewPageSave || this.handleEditPageSave;

    return (
      <div id="pages-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Page</button>
            <TabularTable
              table={PagesTable}
              id="pages-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <PagesForm
            formFields={formFields}
            onInputChange={this.handleInputChange}
            onBodyChange={this.handleBodyChange}
            onPublishedChange={this.handlePublishedChange}
            onSave={pageSaveFunc}
            onBack={this.handleBack}
          />
        )}
      </div>
    );
  }
}
