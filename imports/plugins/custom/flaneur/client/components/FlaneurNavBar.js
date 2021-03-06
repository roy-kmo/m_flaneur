/**
 * @file
 * Customized core Reaction Commerce NavBar component.
 * Separated out cart into own line + replaced tag-based nav w/ custom main menu (see main-menu plugin).
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, replaceComponent } from "@reactioncommerce/reaction-components";
import MainMenu from '/imports/plugins/custom/flaneur/client/components/MainMenu';
import SwatchbookContainer from '/imports/plugins/custom/swatchbook/client/containers/SwatchbookContainer';
import SwatchbookLinkContainer from '/imports/plugins/custom/swatchbook/client/containers/SwatchbookLinkContainer';

class FlaneurNavBar extends Component {
  static propTypes = {
    brandMedia: PropTypes.object,
    hasProperPermission: PropTypes.bool,
    searchEnabled: PropTypes.bool,
    shop: PropTypes.object,
    visibility: PropTypes.object.isRequired
  };

  static defaultProps = {
    visibility: {
      hamburger: true,
      brand: true,
      tags: true,
      search: true,
      notifications: true,
      languages: true,
      currency: true,
      mainDropdown: true,
      cartContainer: true
    }
  };

  state = {
    navBarVisible: false,
    searchModalOpen: false,
    // Customization
    mainMenu: [],
    featureLine: {}
  }

  componentDidMount () {
    // Customization - load and set main menu
    Meteor.call('MainMenu.get', (err, mainMenu) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ mainMenu });
      }
    });

    // Customization - load and set feature line
    Meteor.call('Flaneur.getFeatureLine', (err, featureLine) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({ featureLine });
      }
    });
  }

  toggleNavbarVisibility = () => {
    const isVisible = this.state.navBarVisible;
    this.setState({ navBarVisible: !isVisible });
  }

  handleCloseNavbar = () => {
    this.setState({ navBarVisible: false });
  }

  handleOpenSearchModal = () => {
    this.setState({ searchModalOpen: true });
  }

  handleCloseSearchModal = () => {
    this.setState({ searchModalOpen: false });
  }

  renderLanguage() {
    return (
      <div className="languages">
        <Components.LanguageDropdown />
      </div>
    );
  }

  renderCurrency() {
    return (
      <div className="currencies">
        <Components.CurrencyDropdown />
      </div>
    );
  }

  renderBrand() {
    const { brandMedia, shop } = this.props;

    const { name } = shop || {};
    const logo = brandMedia && brandMedia.url({ store: "large" });

    return (
      <Components.Brand
        logo={logo}
        title={name || ""}
      />
    );
  }

  renderSearchButton() {
    if (this.props.searchEnabled) {
      return (
        <div className="search">
          <Components.FlatButton
            icon="fa fa-search"
            kind="flat"
            onClick={this.handleOpenSearchModal}
          />
          <Components.SearchSubscription
            open={this.state.searchModalOpen}
            onClose={this.handleCloseSearchModal}
          />
        </div>
      );
    }
  }

  renderNotificationIcon() {
    if (this.props.hasProperPermission) {
      return (
        <div className="navbar-notification">
          <Components.Notification />
        </div>
      );
    }
  }

  renderCartContainerAndPanel() {
    // Customization - Added SwatchbookLinkContainer
    return (
      <div className="cart-container">
        <div className="cart">
          <Components.CartIcon />
          <SwatchbookLinkContainer />
        </div>
        <div className="cart-alert">
          <Components.CartPanel />
        </div>
      </div>
    );
  }

  renderMainDropdown() {
    return (
      <Components.MainDropdown />
    );
  }

  renderHamburgerButton() {
    return (
      <div className="showmenu"><Components.Button icon="bars" onClick={this.toggleNavbarVisibility} /></div>
    );
  }

  // Customization - Replaced tagNav with custom main menu
  handleMenuItemClick = (e, path) => {
    e.preventDefault();
    ReactionRouter.go(path);
  };
  renderTagNav() {
    const { mainMenu } = this.state;
    return (
      <MainMenu mainMenu={mainMenu} onMenuItemClick={this.handleMenuItemClick} />
    );
  }

  render() {
    // Customizations:
    //- split cart container into separate line + include header feature line
    //- Added SwatchbookContainer
    const { featureLine } = this.state;
    return (
      <div>
<div className="nav-container w-container">
  <div className="rui navbar cart-navbar">
    {this.props.visibility.cartContainer && this.renderCartContainerAndPanel()} {this.props.visibility.notifications && this.renderNotificationIcon()}
  </div>
  <div className="nav-div w-clearfix">
    <ul className="nav navbar-nav" id="main-menu">
      <li className="main-menu-top">
      <a href="/" className="w-inline-block w-clearfix">
          <img src="/images/Flaneur-logo-blue.png" width="127" className="image-50"/></a>
      </li>
    <li className="main-menu-top my-icon"><div id="my-icon">Menu</div></li>

<li id="menu-and-accounts-container">

      {this.props.visibility.tags && this.renderTagNav()} {this.props.visibility.mainDropdown && this.renderMainDropdown()}
    </li>
    </ul>
  </div>
</div>
{featureLine.isEnabled && (
  <div className="rui navbar feature-line" dangerouslySetInnerHTML={{__html: featureLine.content}} /> )}
  <SwatchbookContainer />
  </div>


    );
  }
}

replaceComponent('NavBar', FlaneurNavBar);

export default FlaneurNavBar;
