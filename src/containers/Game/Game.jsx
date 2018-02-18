import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../../socket';
// import { Link } from 'react-router-dom';

class Game extends Component {
  state = {}

  render() {
    console.log(this.props.match.params.id);
    socket.connect(this.props.match.params.id);
    return (
      <h1>Game Page</h1>
    );
  }
}

Game.defaultProps = {
  match: {},
};

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired(),
    }).isRequired(),
  }).isRequired(), // eslint
};

export default connect(null, null)(Game);
