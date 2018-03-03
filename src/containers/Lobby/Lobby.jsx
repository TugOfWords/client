import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import { Card } from 'semantic-ui-react';
import TeamCard from '../../components/TeamCard/TeamCard';

// actions
import * as actions from '../../store/actions/index';

class Lobby extends Component {
  state = {
    private: true,
  }

  joinTeam = (teamNumber) => {
    this.props.onJoinTeam(this.props.lid, teamNumber, this.props.uid);
  }

  render() {
    return (
      <div align="center" style={{ marginTop: '25px' }}>
        <h1>Pregame Lobby</h1>

        {/* Team 1 */}
        <Card.Group itemsPerRow={2} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '30px' }}>
          <TeamCard
            joinTeam={() => this.joinTeam(1)}
            players={this.props.teamOne}
            teamNumber={1}
            private={this.state.private}
          />

          {/* Team 2 */}
          <TeamCard
            joinTeam={() => this.joinTeam(2)}
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
  uid: PropTypes.string.isRequired,
  lid: PropTypes.string.isRequired,
  teamOne: PropTypes.arrayOf(PropTypes.string),
  teamTwo: PropTypes.arrayOf(PropTypes.string),
  onJoinTeam: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  teamNumber: state.lobby.teamNumber,
  uid: state.user.uid,
  lid: state.lobby.lid,
});

const mapDispatchToProps = dispatch => ({
  onJoinTeam: (lid, teamNumber, uid) => dispatch(actions.joinTeam(lid, teamNumber, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
