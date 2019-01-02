import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

it('header renders without crashing', () => {
  const toggleSideMenu = jest.fn();
  shallow(<Header
    toggleSideMenu={toggleSideMenu}
    unreadCount={0}
  />);
});