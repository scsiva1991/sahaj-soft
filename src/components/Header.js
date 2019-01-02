import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const Header = (props) => (
  <Navbar className="header" expand="md">
    <i
      className="fa fa-bars pointer"
      aria-hidden="true"
      onClick={props.toggleSideMenu}
    />
    <span className="m-l-15">Search for something...</span>
    <Nav className="ml-auto">
      <NavItem>
        <NavLink>
          <span>
            <i className="fa fa-envelope" aria-hidden="true">
            </i>
            <Badge color="secondary" className="count">{props.unreadCount}</Badge>
          </span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          <span>
            <i className="fa fa-bell" aria-hidden="true">
            </i>
            <Badge color="secondary" className="count">{5}</Badge>
          </span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="d-flex" onClick={props.logout}>
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

Header.propTypes = {
  toggleSideMenu: PropTypes.func.isRequired,
  unreadCount: PropTypes.number
}

Header.defaultProps = {
  unreadCount: 0
}

export default Header;