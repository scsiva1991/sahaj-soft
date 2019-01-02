import React, { PureComponent } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withRouter } from "react-router-dom";

import './Login.css';
import { constants, saveItem, getMockMails, getItem } from '../../util/util';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (key, e) => {
    this.setState({ [key] : e.target.value });
  }

  handleSubmit = e => {
    const { email, password } = this.state;
    const { history } = this.props;
    const mockEmails = getMockMails();
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    if (password === constants.password) {
      saveItem('isLoggedIn', true);
      saveItem('currentUser', email);

      const emails = JSON.parse(getItem('emails')) || {};

      if (!emails[email] || !emails[email].isMockEmailAdded) {
        const inboxEmails = emails[email] ? emails[email].inbox : [];
        emails[email] = { isMockEmailAdded: true, inbox: [...inboxEmails, ...mockEmails], sent: [] }
      }

      saveItem('emails', JSON.stringify(emails));
      

      history.push('/');
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">          
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h2 className="text-center">Login to view your Inbox!!</h2>
            <FormGroup className="mg-t-20">
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => this.handleChange('email', e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => this.handleChange('password', e)}
              />
            </FormGroup>
            <FormText color="muted">
              Please enter any email address and password as 'admin'
            </FormText>
            <div className="text-center mg-t-20">
              <Button color="success" type="submit">Login</Button>
            </div>            
          </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);