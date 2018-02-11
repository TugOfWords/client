import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Lobby extends Component {
  
  render() {
    return (
      <h1>Lobby Page</h1>
    );
  }
}

export default connect(null, null)(Lobby);
