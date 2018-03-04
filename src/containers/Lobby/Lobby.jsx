import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Card } from 'semantic-ui-react';
import TeamCard from '../../components/TeamCard/TeamCard';

import * as actions from '../../store/actions/lobby';

class Lobby extends Component {
  state = {
    private: true,
  }

  joinTeam = (teamNumber) => {
    this.props.onJoinTeam(teamNumber);
  };

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
            joinTeam={() => this.joinTeam(1)}
          />

          {/* Team 2 */}
          <TeamCard
            players={this.props.teamTwo}
            teamNumber={2}
            private={this.state.private}
            joinTeam={() => this.joinTeam(2)}
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
  onJoinTeam: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  username: state.user.username || '',
});

const mapDispatchToProps = dispatch => ({
  onJoinTeam: teamNumber => dispatch(actions.joinTeam(teamNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
