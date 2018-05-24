import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from '@reactioncommerce/reaction-components';

class PDPInfoTabs extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  };

  state = {
    activeTab: 'description'
  };

  handleTabClick = (e, activeTab) => {
    e.preventDefault();
    this.setState({ activeTab });
  };

  render () {
    const { product } = this.props;
    const { description, dimensions, careInstructions } = product;

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

    const content = product[this.state.activeTab];

    return (
      <div>
        <ul className="nav nav-tabs">
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
          <div role="tabpanel" class="tab-pane active" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }
}

registerComponent('PDPInfoTabs', PDPInfoTabs);

export default PDPInfoTabs;
