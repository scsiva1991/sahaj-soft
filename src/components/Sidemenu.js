import React, { Fragment } from 'react';
import { Badge, Nav, NavItem, NavLink } from 'reactstrap';
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

const staticMenu = (options, isToggled) => {
  return options.map(menu => (
    <NavItem key={menu.name} className="static-menu">
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
    {
      staticMenu(menus.slice(0, 2), props.isToggled)
    }
    <NavItem>
      <NavLink className="active">
        <i className="fa fa-envelope" aria-hidden="true">
        </i>
        {!props.isToggled && 
          <Fragment>
            <span>
              Mailbox
              <span className="pull-right">
                <Badge className="count">{props.unreadCount}/{props.totalCount}</Badge>
              </span>
            </span>
            <ul className="sub-menu">
              <li className="active">Inbox</li>
              <li>Email View</li>
              <li>Compose Email</li>
              <li>Email Templates</li>
            </ul>
          </Fragment>
        } 
      </NavLink>
    </NavItem>
    {
      staticMenu(menus.slice(2), props.isToggled)
    }

  </Nav>
);

Sidemenu.propTypes = {
  isToggled: PropTypes.bool.isRequired
};

export default Sidemenu;