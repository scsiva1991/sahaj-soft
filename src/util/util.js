const constants = {
  'password': 'admin'
};

const checkIsLoggedIn = () => {
  let isLoggedIn = false;
  if (localStorage) {
    isLoggedIn = getItem('isLoggedIn');
  }
  return isLoggedIn;
}

const saveItem = (key, value) => {
  if (localStorage) {
    localStorage.setItem(key, value);
  }
}

const getItem = key => {
  if (localStorage) {
    return localStorage.getItem(key);
  }
}

const deleteItem = key => {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}

const getMockMails = () => {
  let emails = [];
  const uuidv4 = require('uuid/v4');
  for (let i=0; i<5; i++) {
    emails.push({
      from: 'sivakumar@gmail.com',
      to: ['manigandan@sahaj.com'],
      cc: [],
      subject: `Mock Email - ${i + 1}`,
      body: 'Lorem ipsem ...',
      isRead: false,
      deliveredAt: Date.now(),
      isMockEmail: true,
      id: uuidv4()
    });
  }
  return emails;
}

const getInboxEmails = () => {
  let emails = localStorage.getItem('emails');
  if (emails) {
    return JSON.parse(emails);
  }
  emails = [];
  for (let i=0; i<5; i++) {
    emails.push({
      from: 'sivakumar@gmail.com',
      to: 'manigandan@sahaj.com',
      cc: '',
      subject: 'Test Email',
      body: 'Lorem ipsem ...',
      isRead: false,
      deliveredAt: Date.now(),
      isMockEmail: true,
      id: 'email_'+i
    });
  }
  saveItem('emails', JSON.stringify(emails));
  return emails;
}

const getSentEmails = () => {
  let emails = localStorage.getItem('sentEmails');
  if (emails) {
    return JSON.parse(emails);
  }
  return [];
}

const isValidEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = {
  constants,
  checkIsLoggedIn,
  saveItem,
  getItem,
  getInboxEmails,
  deleteItem,
  getSentEmails,
  getMockMails,
  isValidEmail
}