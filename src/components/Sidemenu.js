import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import avatar from '../images/avatar.png';
import PropTypes from 'prop-types';

const menus = [
  {
    name: 'Dashboard',
    icon: 'fa-tachometer'
  },{
    name: 'Layouts',
    icon: 'fa-th-large'
  }, {
    name: 'Graph',
    icon: 'fa-line-chart'
  }, {
    name: 'Metrics',
    icon: 'fa-bar-chart'
  }, {
    name: 'Widgets',
    icon: 'fa-tachometer'
  }, {
    name: 'Forms',
    icon: 'fa-keyboard-o'
  }, {
    name: 'App Views',
    icon: 'fa-rocket'
  }];

const staticMenu = isToggled => {
  return menus.map(menu => (
    <NavItem key={menu.name}>
      <NavLink>
        <i className={`fa ${menu.icon}`} aria-hidden="true"></i>
        {!isToggled && menu.name}
      </NavLink>
    </NavItem>
  ))
}

const Sidemenu = (props) => (
  <Nav vertical className="sidemenu">
    <div className="text-center">
      <img
        src={avatar}
        alt="profile"
        className={`avatar ${props.isToggled ? 'avatar-toggled' : ''}`}
      />
    </div>
    <NavItem>
      <NavLink className="active">
        <i className="fa fa-envelope" aria-hidden="true">
        </i>
        {!props.isToggled && 'Mailbox'}
      </NavLink>
    </NavItem>
    {
      staticMenu(props.isToggled)
    }

  </Nav>
);

Sidemenu.propTypes = {
  isToggled: PropTypes.bool.isRequired
};

export default Sidemenu;