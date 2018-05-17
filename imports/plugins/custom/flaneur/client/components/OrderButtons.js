import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrderButtons extends Component {

  static propTypes = {
    order: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
  }

  handleAcknowledgeClick = e => {
    Meteor.call('FlaneurOrders.acknowledge', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      } else {
        Alerts.toast('Acknowledgement email sent');
      }
    });
  };

  handleToggleException = e => {
    Meteor.call('FlaneurOrders.toggleException', this.props.order._id, err => {
      if (err) {
        alert(err.reason);
      }
    });
  };

  render () {
    const { order } = this.props;
    const { status } = order.workflow;
    return (
      <div style={{ marginTop: 20 }}>
        {status === 'coreOrderWorkflow/processing' && (
          <button
            style={{ width: '100%' }}
            className="btn btn-primary"
            onClick={this.handleAcknowledgeClick}
          >
            Acknowledge Order
          </button>
        )}
        {(status !== 'coreOrderWorkflow/processing' &&
          status !== 'exception') && (
          <button
            className="btn btn-default"
            style={{width: '100%'}}
            onClick={this.handleAcknowledgeClick}
          >
            Resend acknowledgement email
          </button>
        )}

        {status !== 'exception' && (
          <button
            style={{ width: '100%', marginTop: 20 }}
            className="btn btn-danger"
            onClick={this.handleToggleException}
          >
            Mark Exception
          </button>
        )}
        {status === 'exception' && (
          <button
            style={{ width: '100%', border: '1px solid #eb4d5c', marginTop: 20 }}
            className="btn btn-default"
            onClick={this.handleToggleException}
          >
            Clear Exception
          </button>
        )}
      </div>
    );
  }
}
