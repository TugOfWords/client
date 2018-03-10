import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Button, Form } from 'semantic-ui-react';
import TextInput from '../../components/TextInput/TextInput';
import NewLobbyModal from './NewLobbyDialog';

import * as actions from '../../store/actions/index';


export class MainMenu extends Component {
  state = {
    username: '',
  }

  joinPublicLobby = (uid) => {
    this.props.onJoinPublicLobby(uid);
  }

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  }

  submitUsername = () => {
    this.props.onCreateUser(this.state.username);
  }

  resetUser = () => {
    this.props.onRemoveUser();
    window.location.href = '/';
  }

  createLobby = () => {
    this.props.onCreateLobby(this.props.uid);
  }

  renderButton = (text, color, action, top, disabled) => (
    <Button basic color={color} disabled={disabled || false} onClick={action} style={{ marginTop: top || '10px' }}>
      {text}
    </Button>
  );

  render() {
    let form;
    if (this.props.isNewUser) {
      // main menu for users who have not created a username
      form = (
        <Form>
          <h1> Enter a username to start playing </h1>
          <TextInput
            placeholder="Enter your username"
            onChange={e => this.updateUsername(e.target.value)}
          />
          {this.renderButton('Submit Name', 'green', this.submitUsername, '0px', this.state.username.trim() === '')}
          <br />
        </Form>
      );
    } else {
      // main menu for the users who already have a username & uid
      form = (
        <Form>
          <h1> Hello, {this.props.username}! </h1>
          {this.renderButton('Play Now', 'green', () => this.joinPublicLobby(this.props.uid))}

          <br />
          <NewLobbyModal
            trigger={this.renderButton}
            content={<h1> Are you sure you want to create a lobby? </h1>}
            confirm={this.createLobby}
          />

          <br />
          {this.renderButton('Reset', 'red', this.resetUser)}
        </Form>
      );
    }

    return (
      <div align="center" style={{ marginTop: '15%' }} >
        {form}
      </div>
    );
  }
}

MainMenu.defaultProps = {
  uid: null,
};

MainMenu.propTypes = {
  isNewUser: PropTypes.bool.isRequired,
  uid: PropTypes.string,
  username: PropTypes.string.isRequired,
  onCreateUser: PropTypes.func.isRequired,
  onCreateLobby: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
  onJoinPublicLobby: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isNewUser: state.user.uid === null || state.user.username === null,
  username: state.user.username || '',
  uid: state.user.uid || '',
});

const mapDispatchToProps = dispatch => ({
  onCreateUser: username => dispatch(actions.createUser(username)),
  onCreateLobby: uid => dispatch(actions.createLobby(uid)),
  onRemoveUser: () => dispatch(actions.removeUser()),
  onJoinPublicLobby: uid => dispatch(actions.joinPublicLobby(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
