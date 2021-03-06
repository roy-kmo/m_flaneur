/**
 * @file
 * Customized core CartItems component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import { isProductCapsule } from '../../lib/products';

class FlaneurCartItems extends Component {
  static propTypes = {
    handleImage: PropTypes.func,
    handleLowInventory: PropTypes.func,
    handleRemoveItem: PropTypes.func,
    handleShowProduct: PropTypes.func,
    item: PropTypes.object,
    pdpPath: PropTypes.func
  }

  handleClick = (event) => {
    event.preventDefault();

    if (typeof this.props.handleShowProduct === "function") {
      this.props.handleShowProduct(this.props.item);
    }
  }

  removalClick = (event) => {
    event.preventDefault();

    if (typeof this.props.handleRemoveItem === "function") {
      this.props.handleRemoveItem(event, this.props.item);
    }
  }

  render() {
    const {
      handleLowInventory,
      pdpPath,
      handleImage,
      item
    } = this.props;

    const mediaUrl = handleImage(item);

    // Customization - include colorName and hexCode bg if applicable
    const productImageStyle = {
      backgroundImage: `url('${mediaUrl || ''}')`
    };
    if (item.colorHexCode) {
      productImageStyle.backgroundColor = `#${item.colorHexCode}`;
    }
    if (item.hexColor) {
      productImageStyle.backgroundColor = `#${item.hexColor}`;
    }

    return (
      <div
        className="cart-items"
        key={item._id}
        style={{ display: "inline-block" }}
      >
        {handleLowInventory(item) &&
          <div className="badge badge-top badge-low-inv-warning">
            <Components.Translation i18nKey="cartDrawerItems.limitedSupply" defaultValue="Limited supply" />
          </div>
        }
        <Components.IconButton
          icon="fa fa-times fa-lg remove-cart-item"
          onClick={this.removalClick}
          kind="removeItem"
        />
        <a href={pdpPath(item)}
          data-event-action="product-click"
          data-event-value={item.productId}
          onClick={this.handleClick}
        >
          {mediaUrl ?
            <div className="center-cropped" style={ productImageStyle }>
              <img src={mediaUrl} className="product-grid-item-images img-responsive" alt="" />
            </div> :
            <div className="center-cropped" style={{ backgroundImage: "url('/resources/placeholder.gif')" }}>
              <img src="/resources/placeholder.gif" className="product-grid-item-images img-responsive" alt="" />
            </div>
          }
        </a>
        <div className="cart-labels">
          <div>
            <span className="badge" style={{ marginRight: "3px" }}>{item.quantity}</span>
            <span className="cart-item-title">
              {item.title}
              <br />
              <small>{item.variants.title}{item.colorName && ` - ${item.colorName}` || ''}</small>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

replaceComponent("CartItems", FlaneurCartItems);

export default FlaneurCartItems;
