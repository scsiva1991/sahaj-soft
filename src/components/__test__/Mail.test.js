import React from 'react';
import { mount } from 'enzyme';
import Mail from '../Mail';
import { getMockMails } from '../../util/util';

it('List emails', () => {
  const readEmail = jest.fn();
  const email = getMockMails()[0];
  const mailItem  = mount(<Mail
    email={email}
    readEmail={readEmail}
  />);

  const search = mailItem.find('.email-list-container');
  expect(search.simulate("click"));
  expect(readEmail).toHaveBeenCalledTimes(1);
});