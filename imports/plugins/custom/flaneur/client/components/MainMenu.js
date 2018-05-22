import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MainMenu extends Component {
  static propTypes = {
    mainMenu: PropTypes.array,
    onMenuItemClick: PropTypes.func.isRequired
  };

  render () {
    const { mainMenu, onMenuItemClick } = this.props;
    return (
      <header className="menu" role="banner">
        <ul className="nav navbar-nav" id="main-menu">
          {mainMenu.map((menuItem, index) => {
            const { label, path, children } = menuItem;
            if (children && children.length) {
              return (
                <li className="dropdown" key={`top-item-${index}`}>
                  <a
                    className="dropdown-toggle"
                    onClick={(e) => onMenuItemClick(e, path)}
                    href={path}
                  >
                    {label} <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    {children.map((child, childIndex) => {
                      return (
                        <li key={`child-item-${index}-${childIndex}`}>
                          <a
                            onClick={(e) => onMenuItemClick(e, child.path)}
                            href={child.path}
                          >
                            {child.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            } else {
              return (
                <li key={`top-item-${index}`}>
                  <a
                    onClick={(e) => onMenuItemClick(e, path)}
                    href={path}
                  >
                    {label}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </header>
    );
  }
}
