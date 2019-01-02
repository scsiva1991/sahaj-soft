import React from 'react';
import { Badge, Button } from 'reactstrap';

const folders = [
  {
    name: 'Drafts',
    icon: 'fa-file'
  },
  {
    name: 'Trash',
    icon: 'fa-trash'
  }
];

const categories = [
  {
    name: 'Work',
    color: 'success'
  },
  {
    name: 'Documents',
    color: 'danger'
  },
  {
    name: 'Social',
    color: 'info'
  },
  {
    name: 'Advertising',
    color: 'primary'
  },
  {
    name: 'Clients',
    color: 'success'
  }
]

const dummyFolders = () => (
  folders.map(folder => (
    <div key={folder.name} className="d-flex justify-content-between folders">
      <div>
        <i className={`fa ${folder.icon} m-r-5`} />
        {folder.name}
      </div>
    </div>
  ))
);

const dummyCategories = () => (
  categories.map(category => (
    <div key={category.name} className="d-flex category">
      <div>
        <Badge color={category.color} className="circle"> </Badge>{category.name}
      </div>
    </div>
  ))
);

const Mailmenu = (props) => (
  <div className="row mg-t-20">
    <div className="col">
      <div className="text-center">
        <Button color="success" block onClick={props.openModal}>Compose Email</Button>
      </div>
      <div className="mg-t-20">
        <label>Folders</label>
        <div
          className="pointer d-flex justify-content-between folders"
          onClick={() => props.setCurrentMenu('inbox')}>
          <div>
            <i className="fa fa-inbox m-r-5" />
            Inbox
          </div>
          <div>
            <Badge color="secondary" className="count">{props.unreadCount}</Badge>
          </div>
        </div>
        <div
          className="pointer d-flex justify-content-between folders"
          onClick={() => props.setCurrentMenu('sent')}
        >
          <div>
            <i className="fa fa-envelope-o m-r-5" />
            Sent Mail
          </div>
        </div>
        {dummyFolders()}
      </div>

      <div className="mg-t-20">
        <label>Categories</label>
        {dummyCategories()}
      </div>
    </div>
  </div>
);

export default Mailmenu;