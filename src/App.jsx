import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import * as actions from './store/actions/index';

// containers
import MainMenu from './containers/MainMenu/MainMenu';


class App extends Component {
  state = {}

  componentDidMount() {
    this.props.onCreateUserAuto(); // check for valid credentials in local storage
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainMenu} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  onCreateUserAuto: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCreateUserAuto: () => dispatch(actions.createUserAuto()),
});

export default connect(null, mapDispatchToProps)(App);
