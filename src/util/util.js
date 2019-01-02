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

module.exports = {
  constants,
  checkIsLoggedIn,
  saveItem,
  getItem,
  getInboxEmails,
  deleteItem,
  getSentEmails
}