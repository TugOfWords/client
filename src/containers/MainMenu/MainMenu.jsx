import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Button, Form, Icon } from 'semantic-ui-react';
import TextInput from '../../components/TextInput/TextInput';

import * as actions from '../../store/actions/index';


class MainMenu extends Component {
  state = {
    username: '',
  }

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  }

  submitUsername = () => {
    this.props.onCreateUser(this.state.username);
  }

  render() {
    return (
      <div align="center" style={{ marginTop: '50px' }} >
        <h1> Enter a username to start playing </h1>

        <Form>
          <TextInput
            placeholder="Enter your username"
            onChange={e => this.updateUsername(e.target.value)}
          />
          <Button animated onClick={() => this.submitUsername()}>
            <Button.Content visible> Play </Button.Content>
            <Button.Content hidden>
              <Icon name="right arrow" />
            </Button.Content>
          </Button>
        </Form>
      </div>
    );
  }
}

MainMenu.propTypes = {
  onCreateUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCreateUser: username => dispatch(actions.createUser(username)),
});

export default connect(null, mapDispatchToProps)(MainMenu);
