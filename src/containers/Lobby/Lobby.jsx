import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Card } from 'semantic-ui-react';
import TeamCard from '../../components/TeamCard/TeamCard';

class Lobby extends Component {
  state = {
    private: true,
  }

  render() {
    return (
      <div align="center" style={{ marginTop: '25px' }}>
        <h1>Pregame Lobby</h1>

        {/* Team 1 */}
        <Card.Group itemsPerRow={2} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '30px' }}>
          <TeamCard
            players={this.props.teamOne}
            teamNumber={1}
            private={this.state.private}
          />

          {/* Team 2 */}
          <TeamCard
            players={this.props.teamTwo}
            teamNumber={2}
            private={this.state.private}
          />
        </Card.Group>
      </div>
    );
  }
}

Lobby.defaultProps = {
  teamOne: [],
  teamTwo: [],
};

Lobby.propTypes = {
  teamOne: PropTypes.arrayOf(PropTypes.string),
  teamTwo: PropTypes.arrayOf(PropTypes.string),
};

export default connect(null, null)(Lobby);
