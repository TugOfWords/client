import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


// components
import { Button, Card, Modal } from 'semantic-ui-react';
import TeamCard from '../../components/TeamCard/TeamCard';

// actions
import * as actions from '../../store/actions/index';
import socket from '../../socket';

class Lobby extends Component {
  state = {
    t1: [],
    t2: [],
    seconds: 10,
    gameStart: false,
  }

  componentDidMount() {
    socket.getTeams({ lid: this.props.lid }, (res) => {
      const teams = this.getUsersOnTeams(res);
      this.setState({ t1: teams.t1, t2: teams.t2 });
    });

    socket.onJoinLobby({ lid: this.props.lid }, (res) => {
      const teams = this.getUsersOnTeams(res);
      this.setState({ t1: teams.t1, t2: teams.t2 });
    });

    socket.onJoinTeam({ lid: this.props.lid }, (res) => {
      const teams = this.getUsersOnTeams(res);
      this.setState({ t1: teams.t1, t2: teams.t2 });
    });

    socket.onLeaveLobby({ lid: this.props.lid }, (res) => {
      const teams = this.getUsersOnTeams(res);
      this.setState({ t1: teams.t1, t2: teams.t2 });
    });

    socket.onStartCountdown({ lid: this.props.lid }, (res) => {
      this.setState({ seconds: res.seconds });
    });

    socket.onCountdown({ lid: this.props.lid }, (res) => {
      this.setState({ seconds: res.seconds });
    });

    socket.onStopCountdown({ lid: this.props.lid }, () => {
      this.setState({ seconds: 120 });
    });

    socket.onFinishCountdown({ lid: this.props.lid }, () => {
      this.startGame();
    });

    socket.onStartGame(() => this.startGame());
  }

  getUsersOnTeams = (res) => {
    const t1 = Object.assign({}, ...Object.keys(res.t1).map((k, i) =>
      ({ [i]: res.t1[k].username })));
    const t2 = Object.assign({}, ...Object.keys(res.t2).map((k, i) =>
      ({ [i]: res.t2[k].username })));
    return { t1: Object.values(t1), t2: Object.values(t2) };
  }

  getCountdownTime = () => {
    if (this.state.seconds === 0) return 'Starting game...';
    const divForMinutes = this.state.seconds % (60 * 60);
    const minutes = Math.floor(divForMinutes / 60);
    const divForSeconds = divForMinutes % 60;
    const seconds = Math.ceil(divForSeconds);
    const formattedSeconds = seconds < 10 ?
      `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  }

  startGame = () => {
    console.log('Starting game!!!');
    this.setState({ gameStart: true });
  }

  leaveLobby = () => {
    this.props.onLeaveLobby(this.props.lid, this.props.uid);
    window.location.href = '/';
  }

  joinTeam = (teamNumber) => {
    this.props.onJoinTeam(this.props.lid, teamNumber, this.props.uid);
  }

  render() {
    let startButton = null;
    const disabled = this.state.t1.length < 1 || this.state.t2.length < 1;
    if (this.props.isPrivate) {
      startButton = (
        <Button
          basic
          color="green"
          content="Start Game"
          disabled={disabled}
          onClick={() => socket.startGame()}
          style={{ marginTop: '30px' }}
        />
      );
    } else if (!disabled) startButton = <h2> {this.getCountdownTime()} </h2>;

    return this.state.gameStart ?
      (<Redirect to={`/game/${this.props.lid}`} />) : (
        <div align="center" style={{ marginTop: '25px' }}>
          <h1>Pregame Lobby</h1>

          {/* Team 1 */}
          <Card.Group itemsPerRow={2} style={{ marginLeft: '10%', marginRight: '10%', marginTop: '30px' }}>
            <TeamCard
              joinTeam={() => this.joinTeam(1)}
              players={this.state.t1}
              teamNumber={1}
              isPrivate={this.props.isPrivate}
              disabled={this.props.teamNumber === 1}
            />

            {/* Team 2 */}
            <TeamCard
              joinTeam={() => this.joinTeam(2)}
              players={this.state.t2}
              teamNumber={2}
              isPrivate={this.props.isPrivate}
              disabled={this.props.teamNumber === 2}
            />
          </Card.Group>

          {/* Add start game button if the lobby is isPrivate */}
          {startButton}
          <br />

          {/* Leave Lobby */}
          <Button basic color="red" onClick={this.leaveLobby} style={{ marginTop: '10px' }}>
          Leave Lobby
          </Button>
          <Modal
            trigger={<Button>Share link!</Button>}
            header="Share Link"
            content={window.location.href}
            actions={[
          { key: 'done', content: 'Done', positive: true },
        ]}
          />
        </div>
      );
  }
}

Lobby.propTypes = {
  uid: PropTypes.string.isRequired,
  lid: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  onJoinTeam: PropTypes.func.isRequired,
  teamNumber: PropTypes.number.isRequired,
  onLeaveLobby: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  teamNumber: state.lobby.teamNumber,
  uid: state.user.uid,
  lid: state.lobby.lid,
  isPrivate: state.lobby.isPrivate,
});

const mapDispatchToProps = dispatch => ({
  onJoinTeam: (lid, teamNumber, uid) => dispatch(actions.joinTeam(lid, teamNumber, uid)),
  onLeaveLobby: (lid, uid) => dispatch(actions.leaveLobby(lid, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
