import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import { checkIsLoggedIn } from '../../util/util';
import Mailbox from '../Mailbox/Mailbox';
import Login from '../Login/Login';

const AuthRoute = ({ component: Component, ...props}) => (
  <Route
    {...props}
    render = { props => 
      checkIsLoggedIn() ? <Component {...props} /> :
      <Redirect to='/login' />
    }
  />
)

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <AuthRoute path="/" exact component={Mailbox} />
          <Route path="/login" component={Login} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
