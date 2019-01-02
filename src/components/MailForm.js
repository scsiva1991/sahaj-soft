import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      cc: '',
      subject: '',
      body: ''
    }
  }

  static getDerivedStateFromProps = (props) => {
    console.log('***', props);
    if (props.email && props.email.to) {
      return {
        to: props.email.to,
        cc: props.email.cc,
        subject: props.email.subject,
        body: props.email.body
      }
    }
    return null;
  }

  handleChange = (key, e) => {
    this.setState({ [key]: e.target.value });
  }

  sendEmail = () => {
    const { to, cc, subject, body } = this.state;
    this.props.sendEmail({ to, cc, subject, body });
  }

  render() {
    const { to, cc, subject, body } = this.state;
    const { showModal, isCompose, closeModal, currentUser } = this.props;
    return (
      <Modal isOpen={showModal} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Email</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-12">
                <FormGroup className="mg-t-20">
                  <Label for="from">From</Label>
                  <Input
                    type="email"
                    name="to"
                    id="to"
                    value={currentUser}
                    disabled
                  />
                </FormGroup>
                <FormGroup className="mg-t-20">
                  <Label for="to">To</Label>
                  <Input
                    type="email"
                    name="to"
                    id="to"
                    value={to}
                    onChange={(e) => this.handleChange('to', e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cc">Cc</Label>
                  <Input
                    type="email"
                    name="cc"
                    id="cc"
                    value={cc}
                    onChange={(e) => this.handleChange('cc', e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="subject">Subject</Label>
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                    value={subject}
                    onChange={(e) => this.handleChange('subject', e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cc">Body</Label>
                  <Input
                    type="textarea"
                    name="body"
                    id="body"
                    value={body}
                    onChange={(e) => this.handleChange('body', e)}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </ModalBody>
        {
          isCompose &&
          <ModalFooter>
            <Button color="success" onClick={this.sendEmail}>Send</Button>{' '}
            <Button color="secondary" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        }
      </Modal>
    )
  }
}

export default MailForm;