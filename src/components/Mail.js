import React from 'react';
import moment from 'moment';

const Mail = (props) => (
  <div
    className="d-flex email-list-container align-items-center"
    onClick={() => props.readEmail(props.email)}
  >
    <div className="col-3 d-flex align-items-center">
      {
        !props.isSent &&
        <input
          type="checkbox"
          className="select-mail"
          onClick={(e) => props.handleSelect(e, props.email)}
        />
      }
      {props.email.from}
    </div>
    <div className="col-6">
      {props.email.subject}
    </div>
    <div className="col-2">
      {moment(props.email.deliveredAt).fromNow()}
    </div>
  </div>
)

export default Mail;