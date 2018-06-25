import React from "react";
import PropTypes from "prop-types";
import { $ } from "meteor/jquery";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";

function handleKeepShopping(event) {
  event.stopPropagation();
  event.preventDefault();
  return $("#cart-drawer-container").fadeOut(100, () => Reaction.toggleSession("displayCart"));
}

const EmptyCartDrawer = () => (
  <div className="cart-drawer" id="cart-drawer">
    <div className="cart-drawer-empty">
      <div className="row cart-drawer-empty-msg">
        <p className="text-align">
            Your shopping bag is empty.
        </p>
      </div>
      <div className="row">
        <Components.Button
          id="btn-keep-shopping"
          bezelStyle="solid"
          className="btn-lg btn-block"
          i18nKeyLabel="cartDrawer.keepShopping"
          label="Continue Shopping"
          onClick={handleKeepShopping}
          status="cta"
        />
      </div>
    </div>
  </div>
);

EmptyCartDrawer.propTypes = {
  keepShopping: PropTypes.func
};

registerComponent("EmptyCartDrawer", EmptyCartDrawer);

export default EmptyCartDrawer;
