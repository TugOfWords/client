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
    this.props.onCreateUserAuto();
  }

  componentWillReceiveProps() {
    this.props.onJoinLobbyAuto();
  }

  render() {
    let view = null;
    if (this.props.uid === '' || this.props.lid === '') { // main menu
      const Child = ({ match }) => {
        localStorage.setItem('lid', match.params.id);
        return <Redirect to="/" />;
      };
      view = (
        <Switch>
          <Route exact path="/" component={Menu} />
          <Route
            exact
            path="/lobby/:id"
            component={Child}
          />
          <Route exact path="/game/:id" component={Game} />
          <Redirect to="/" />
        </Switch>
      );
    } else { // lobby
      view = (
        <Switch>
          <Route exact path="/lobby/:id" component={Lobby} />
          <Route exact path="/game/:id" component={Game} />
          <Redirect to={`/lobby/${this.props.lid}`} />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        {view}
      </BrowserRouter>

    );
  }
}

App.propTypes = {
  lid: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  onCreateUserAuto: PropTypes.func.isRequired,
  onJoinLobbyAuto: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  uid: state.user.uid || '',
  lid: state.lobby.lid || '',
});

const mapDispatchToProps = dispatch => ({
  onCreateUserAuto: () => dispatch(actions.createUserAuto()),
  onJoinLobbyAuto: uid => dispatch(actions.joinLobbyAuto(uid)),
  onJoinLobbyOnly: lid => dispatch(actions.joinLobbyOnly(lid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
