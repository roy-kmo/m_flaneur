import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';

class SwatchbookContainer extends Component {
  static propTypes = {
    colorIds: PropTypes.array.isRequired
  };

  state = {
    colors: []
  };

  componentDidMount () {
    this.getColors(this.props.colorIds);
  }

  componentDidUpdate (prevProps) {
    const currentColors = this.props.colorIds.toString();
    const prevColors = prevProps.colorIds.toString();
    if (currentColors !== prevColors) {
      this.getColors(this.props.colorIds);
    }
  }

  getColors = colorIds => {
    Meteor.call('Colors.getByIds', colorIds, (err, colors) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ colors });
      }
    });
  };

  handleAddClick = e => {
    e.preventDefault();
    ReactionRouter.go('/design-your-bedding');
  };

  render () {
    const { colors } = this.state;
    return (

      <div className="swatchbook-drawer-container" ref={ref => this.container = ref}>
    
          <div className="cart-drawer-swiper-slide swatch">

          {!colors.length && (
            <p className="no-colors-message">There are no colors in your swatchbook.</p>
          )}
          {colors.map(color => {
            const { _id, name, hexCode, slug, pantoneCode, pdpURL } = color;
            return (
                <div className="cart-items swatch">
                <ColorLink
                key={_id}
                _id={_id}
                name={name}
                hexCode={hexCode}
                slug={slug}
                pantoneCode={pantoneCode}
                pdpURL={pdpURL}
                isInSwatchbook={true}
                onSwatchbookRemoveClick={handleSwatchbookRemoveClick}
              /></div>
            );
          })}
          <button
            className="rui btn btn-default flat button swatchbook-add-button"
            onClick={this.handleAddClick}>
            <i className="rui font-icon fa fa-plus fa-3x"></i>
          </button>

      
      </div>
      </div>
    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();
  const { swatchbookColorIds } = user.profile;
  return {
    colorIds: swatchbookColorIds || []
  };
})(SwatchbookContainer);
