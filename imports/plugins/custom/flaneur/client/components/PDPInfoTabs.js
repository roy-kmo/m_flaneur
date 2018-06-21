import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { registerComponent } from '@reactioncommerce/reaction-components';

class PDPInfoTabs extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    colorId: PropTypes.string
  };

  state = {
    activeTab: 'description',
    colorDescription: '',
  };

  componentDidMount () {
    this.loadColorDescription();
  }

  componentDidUpdate (prevProps) {
    const { product, colorId } = this.props;
    const hasProductChanged = product._id !== prevProps.product._id;
    const hasColorIdChanged = colorId !== prevProps.colorId;
    if (hasProductChanged || hasColorIdChanged) {
      this.loadColorDescription();
    }
  }

  loadColorDescription = () => {
    const { colorId } = this.props;
    if (!colorId) {
      return;
    }

    Meteor.call('Colors.getDescription', colorId, (err, colorDescription) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ colorDescription });
      }
    });
  };

  handleTabClick = (e, activeTab) => {
    e.preventDefault();
    this.setState({ activeTab });
  };

  render () {
    const { product } = this.props;
    const { description, dimensions, careInstructions } = product;
    const { activeTab, colorDescription } = this.state;

    const tabs = [{
      field: 'description',
      label: 'Description'
    }];
    if (dimensions) {
      tabs.push({
        field: 'dimensions',
        label: 'Dimensions'
      });
    }
    if (careInstructions) {
      tabs.push({
        field: 'careInstructions',
        label: 'Care Instructions'
      });
    }

    let content = product[this.state.activeTab];

    // Add color description if on description tab & product is in color
    if (activeTab === 'description' && colorDescription) {
      content += colorDescription;
    }

    return (
      <div>
        <ul className="nav nav-tabs-info">
          {tabs.map(tab => {
            const { field, label } = tab;
            const isActive = field === this.state.activeTab;
            return (
              <li key={field} role="presentation" className={isActive && 'active' || ''}>
                <a href="javascript:void(0)" onClick={(e) => this.handleTabClick(e, field)}>{label}</a>
              </li>
            );
          })}
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

registerComponent('PDPInfoTabs',
  withTracker(props => {
    const colorId = Session.get('PDPColorId');
    return {
      colorId
    }
  })(PDPInfoTabs)
);
