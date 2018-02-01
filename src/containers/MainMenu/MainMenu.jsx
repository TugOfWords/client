import React, { Component } from 'react';

// components
import { Button, Form, Icon } from 'semantic-ui-react';
import TextInput from '../../components/TextInput/TextInput';

class MainMenu extends Component {
  state = {}
  render() {
    return (
      <div align="center" style={{ marginTop: '50px' }} >
        <h1> Enter a username to start playing </h1>

        <Form>
          <TextInput
            placeholder="Enter your username"
            onChange={e => console.log(e.target.value)}
          />
          <Button animated>
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

export default MainMenu;
