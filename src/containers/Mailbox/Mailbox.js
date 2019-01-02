import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Alert } from "reactstrap";
import {v4 as uuidv4} from 'uuid';

import Header from '../../components/Header';
import Sidemenu from '../../components/Sidemenu';
import Mailmenu from '../../components/Mailmenu';
import Mail from '../../components/Mail';
import { getItem, saveItem, deleteItem, getSentEmails } from '../../util/util';
import MailForm from '../../components/MailForm';

class Mailbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false,
      inboxEmails: [],
      sentEmails: [],
      unreadCount: 0,
      showModal: false,
      isCompose: false,
      currentUser: '',
      selectedEmail: null,
      toDeleteEmails: [],
      currentMenu: 'inbox',
      showAlert: false
    }
  }

  componentDidMount = () => {
    const emails = JSON.parse(getItem('emails'));
    const currentUser = getItem('currentUser');

    // To filter out all mock emails and emails sent to current user
    const inboxEmails = emails[currentUser].inbox;

    // To filter out emails sent by current user
    const outEmails = emails[currentUser].sent;

    this.setState({ inboxEmails, currentUser, sentEmails: outEmails }, () => {
      this.getUnreadCount()
    });
  }

  getUnreadCount = () => {
    const { inboxEmails } = this.state;
    const unreadEmails = inboxEmails.filter(email => !email.isRead);
    this.setState({ unreadCount: unreadEmails.length });
  }

  toggleSideMenu = () => {
    this.setState({ isToggled: !this.state.isToggled });
  }

  closeModal = () => {
    this.setState({ showModal: false, isCompose: false });
  }

  openModal = () => {
    this.setState({ showModal: true, isCompose: true });
  }

  sendEmail = email => {
    let { currentUser, sentEmails } = this.state;
    const emails = JSON.parse(getItem('emails'));
    const currentUserEmails = emails[currentUser];
    const newEmail = {...email, isRead: false, deliveredAt: Date.now(), from: currentUser, id: uuidv4() };

    currentUserEmails['sent'] = [newEmail, ...sentEmails];

    // Create an email list for emails in to and cc
    for (let e of [...email.to, ...email.cc]) {
      let userEmails = emails[e] || {};
      let userInboxEmails = userEmails['inbox'] ? userEmails['inbox'] : [];
      userEmails['inbox'] = [newEmail, ...userInboxEmails];
      emails[e] = userEmails;
    }

    saveItem('emails', JSON.stringify(emails));
    this.setState({ sentEmails: [...currentUserEmails['sent']] });
    this.closeModal();
    this.showSuccessMessage();
  }

  readEmail = email => {
    const { inboxEmails, currentUser } = this.state;
    const emails = JSON.parse(getItem('emails'));
    const markUnreadEmails = inboxEmails.map(inboxEmail => {
      if (email.id === inboxEmail.id) {
        return { ...inboxEmail, isRead: true }
      }
      return inboxEmail;
    });
    this.setState({ inboxEmails: markUnreadEmails, selectedEmail: email, showModal: true }, () => {
      this.getUnreadCount();
      emails[currentUser]['inbox'] = markUnreadEmails; 
      saveItem('emails', JSON.stringify(emails));
    });
  }

  logout = () => {
    deleteItem('isLoggedIn');
    deleteItem('currentUser');
    this.props.history.push('/'); 
  }

  handleSelect = (e, email) => {
    const { toDeleteEmails } = this.state;
    const checkIdExists = toDeleteEmails.find(id => email.id === id);
    let filteredIds = [];
    if (checkIdExists) {
      filteredIds = toDeleteEmails.filter(id => email.id);
    } else {
      filteredIds = [...toDeleteEmails, email.id];
    }
    this.setState({ toDeleteEmails: filteredIds });
    e.stopPropagation();
  }

  deleteEmails = () => {
    const { toDeleteEmails, inboxEmails, currentUser } = this.state;
    const emails = JSON.parse(getItem('emails'));

    const filteredEmails = inboxEmails.filter(email => toDeleteEmails.indexOf(email.id) === -1);
    this.setState({ inboxEmails: filteredEmails }, () => {
      this.getUnreadCount();
      emails[currentUser]['inbox'] = filteredEmails; 
      saveItem('emails', JSON.stringify(emails));
    });
  }

  setCurrentMenu = menu => {
    this.setState({ currentMenu: menu });
  }

  showSuccessMessage = () => {
    this.setState({ showAlert: true });
    setTimeout(() => { this.setState({ showAlert: false})}, 2000);
  }

  render() {
    const {
      isToggled,
      inboxEmails,
      unreadCount,
      showModal,
      isCompose,
      currentUser,
      selectedEmail,
      currentMenu,
      sentEmails,
      showAlert
    } = this.state;
    return (
      <div>
        <div className={`sidemenu-container ${isToggled ? 'sidemenu-toggled' : ''}`}>
          <Sidemenu
            isToggled={isToggled}
            unreadCount={unreadCount}
            totalCount={inboxEmails.length}
          />
        </div>
        <div className={`header-container ${isToggled ? 'header-toggled' : ''}`}>
          <Header
            toggleSideMenu={this.toggleSideMenu}
            unreadCount={unreadCount}
            currentUser={currentUser}
            logout={this.logout}
          />
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <Mailmenu
                  unreadCount={unreadCount}
                  openModal={this.openModal}
                  setCurrentMenu={this.setCurrentMenu}
                />
              </div>
              <div className="col-9">
                <div className="main-container">
                  {
                    showAlert &&
                    <Alert color="success">Email sent successfully!!!</Alert>
                  }
                  <div className="row">
                    <div className="col">
                      {
                        currentMenu === 'inbox' ?
                        <h2 className="menu-title">
                          Inbox ({inboxEmails.length})
                        </h2> :
                        <h2 className="menu-title">
                          Sent Mail ({sentEmails.length})
                        </h2>
                      }
                      {
                        currentMenu === 'inbox' &&
                        <Button
                          color="secondary"
                          className="delete"
                          onClick={this.deleteEmails}
                          outline
                        >
                          <i className="fa fa-trash-o" />
                        </Button>
                      }                      
                    </div>
                  </div>
                  {
                    currentMenu === 'inbox' &&
                    inboxEmails.map(email => (
                      <Mail
                        key={email.id}
                        email={email}
                        readEmail={this.readEmail}
                        handleSelect={this.handleSelect}
                      />
                    ))
                  }
                  {
                    currentMenu === 'sent' &&
                    sentEmails.map(email => (
                      <Mail
                        key={email.id}
                        email={email}
                        readEmail={this.readEmail}
                        isSent={true}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          {
            showModal && 
            <MailForm
              isCompose={isCompose}
              showModal={showModal}
              closeModal={this.closeModal}
              sendEmail={this.sendEmail}
              currentUser={currentUser}
              email={selectedEmail}
            />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Mailbox);