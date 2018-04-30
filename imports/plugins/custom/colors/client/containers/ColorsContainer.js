import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabularTable from '/imports/plugins/custom/flaneur/client/components/TabularTable';
import { ColorsTable } from '../../lib/tables';
import ColorForm from '../components/ColorForm';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Reaction, Logger } from "/client/api";

export default class ColorsContainer extends Component {

  constructor (props) {
    super(props);

    this.newFormFields = {
      _id: '',
      name: '',
      description: '',
      pantoneCode: '',
      hexCode: ''
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
      const color = Session.get('Colors.editColor');
      if (color) {
        this.setState({
          view: 'edit',
          formFields: color
        });
      }
    });

    // Watch for delete button click
    this.deleteTracker = Tracker.autorun(() => {
      const _id = Session.get('Colors.deleteId');
      if (_id) {
        Session.set('Colors.deleteId', undefined);
        if (confirm('Are you sure you want to delete this color?')) {
          Meteor.call('Colors.delete', _id, (err) => {
            if (err) {
              alert(err.reason);
            } else {
              this.setState({
                view: 'list'
              });
            }
          })
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

  handleNewColorSave = e => {
    e.preventDefault();
    Meteor.call('Colors.create', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
      }
    });
  };

  handleEditColorSave = e => {
    e.preventDefault();
    Meteor.call('Colors.update', this.state.formFields, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ view: 'list' });
        Session.set('Colors.editColor', undefined);
      }
    });
  };

  handleBack = e => {
    e.preventDefault();
    this.setState({ view: 'list' });
    Session.set('Colors.editColor', undefined);
  }

  render () {
    const { view, formFields } = this.state;
    const isListView = view === 'list';
    const isAddView = view === 'add';
    const isEditView = view === 'edit';
    const saveFunc = isAddView && this.handleNewColorSave || this.handleEditColorSave;

    return (
      <div id="colors-container">
        {isListView && (
          <div>
            <button className="btn btn-default add-btn" onClick={this.handleAddClick}>Add New Color</button>
            <TabularTable
              table={ColorsTable}
              id="colors-table"
            />
          </div>
        )}
        {(isAddView || isEditView) && (
          <ColorForm
            formFields={formFields}
            onInputChange={this.handleInputChange}
            onDescriptionChange={this.handleDescriptionChange}
            onSave={saveFunc}
            onBack={this.handleBack}
          />
        )}
      </div>
    );
  }
}
