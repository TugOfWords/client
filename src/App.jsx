import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import * as actions from './store/actions/index';

// containers
import Menu from './containers/MainMenu/MainMenu';
import Lobby from './containers/Lobby/Lobby';
// import Game from './containers/Game/Game';

class App extends Component {
  state = {}

  componentDidMount() {
    this.props.onCreateUserAuto(); // check for valid credentials in local storage
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.lid === '' ?
          <Switch>
            <Route exact path="/" component={Menu} />
            <Redirect to="/" />
          </Switch>
          :
          <Switch>
            <Route exact path="/lobby/:id" component={Lobby} />
            <Redirect to={`/lobby/${this.props.lid}`} />
          </Switch>
        }
      </BrowserRouter >
    );
  }
}

App.propTypes = {
  lid: PropTypes.string.isRequired,
  onCreateUserAuto: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lid: state.lobby.lid || '',
});

const mapDispatchToProps = dispatch => ({
  onCreateUserAuto: () => dispatch(actions.createUserAuto()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
