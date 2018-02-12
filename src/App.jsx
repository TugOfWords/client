import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import * as actions from './store/actions/index';

// containers
import Menu from './containers/MainMenu/MainMenu';
import Lobby from './containers/Lobby/Lobby';
import Game from './containers/Game/Game';

class App extends Component {
  state = {}

  componentDidMount() {
    this.props.onCreateUserAuto(); // check for valid credentials in local storage
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route path="/lobby/:id" component={Lobby} />
          <Route path="/game/:id" component={Game} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  // isNewUser: PropTypes.bool.isRequired,
  onCreateUserAuto: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isNewUser: state.createUser.uid === null,
});

const mapDispatchToProps = dispatch => ({
  onCreateUserAuto: () => dispatch(actions.createUserAuto()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
