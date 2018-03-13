import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Grid, Input } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import socket from '../../socket';

class Game extends Component {
  state = {
    input: '',
    word: 'hello',
    wcolor: 'black',
    wpm: 1,
    wpmt: Date.now(),
    score1: 0,
    score2: 0,
    uscore: 0,
    idle: false,
    end: false,
    winner: 0,
    team: 0,
    leaderboard1: [],
    leaderboard2: [],
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        wpm: (9 * this.state.wpm) / 10,
      });
    }, 200);

    socket.onScore((score1, score2) => this.setState({ score1, score2 }));
    socket.onUserScore(uscore => this.setState({ uscore }));

    socket.onSendWord((word) => {
      this.setState({ idle: false });
      this.setState({ wcolor: 'black' });
      this.updateWord(word);
    });

    socket.onEnd((data) => {
      console.log(data);
      console.log(this.props.username);
      const t1l = [];
      const entries1 = Object.entries(data.t1);
      for (let i = 0; i < entries1.length; i += 1) {
        t1l.push({
          username: entries1[i][0],
          score: entries1[i][1],
        });
      }

      const t2l = [];

      const entries2 = Object.entries(data.t2);
      for (let i = 0; i < entries2.length; i += 1) {
        t2l.push({
          username: entries2[i][0],
          score: entries2[i][1],
        });
      }

      t1l.sort((a, b) => b.score - a.score);
      t2l.sort((a, b) => b.score - a.score);

      this.setState({
        leaderboard1: t1l,
        leaderboard2: t2l,
      });

      if (data.t1[this.props.username]) {
        this.setState({ team: 1 });
      }
      if (data.t2[this.props.username]) {
        this.setState({ team: 2 });
      }
      this.setState({
        end: true,
        winner: data.winner,
      });
    });

    socket.newWord();
  }

  onInputChange = (input) => {
    const te = (Date.now() - this.state.wpmt) / 1000;
    this.setState({
      wpm: (((60 / 8) * (1 / te)) + (9 * this.state.wpm)) / 10,
      wpmt: Date.now(),
    });

    this.updateInput(input);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && !this.state.idle) {
      if (this.state.word !== this.state.input) {
        this.setState({ wcolor: 'red' });
        setTimeout(() => {
          socket.submitWord(this.state.input);
          this.updateInput('');
          this.setState({ idle: true });
        }, 150);
      } else {
        this.setState({ wcolor: 'green' });
        setTimeout(() => {
          socket.submitWord(this.state.input);
          this.updateInput('');
          this.setState({ idle: true });
        }, 150);
      }
    }
  }

  updateWord = (word) => {
    this.setState({ word });
  }

  updateInput = (input) => {
    this.setState({ input });
  }

  updateScore1 = (score1) => {
    this.setState({ score1 });
  }

  updateScore2 = (score2) => {
    this.setState({ score2 });
  }

  render() {
    if (this.state.end) {
      let message = '';
      if (this.state.team === this.state.winner) {
        message = `Congratulations! Team ${this.state.team} has won the game!`;
      } else {
        message = `Sorry! Better luck next time Team ${this.state.team}.`;
      }

      const l1 = this.state.leaderboard1.map(l => (
        <List.Item>{`${l.username} - ${l.score}`}</List.Item>
      ));
      const l2 = this.state.leaderboard2.map(l => (
        <List.Item>{`${l.username} - ${l.score}`}</List.Item>
      ));
      return (
        <div align="center" style={{ marginTop: '15%' }} >
          <h1>{message}</h1>
          <h3>Your Score: {this.state.uscore}</h3>
          <small>{Math.round(this.state.wpm * 100) / 100} WPM (Average Instantaneous)</small>
          <br />
          <br />
          <br />
          <br />
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <h3>Team 1 Score: {this.state.score1}</h3>
              </Grid.Column>
              <Grid.Column>
                <h3>Team 2 Score: {this.state.score2}</h3>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <h5>Leaderboard</h5>
                <List ordered>{l1}</List>
              </Grid.Column>
              <Grid.Column>
                <h5>Leaderboard</h5>
                <List ordered>{l2}</List>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </div>
      );
    }
    return (
      <div align="center" style={{ marginTop: '15%' }} >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 style={{ color: this.state.wcolor }}>{this.state.word}</h1>
        <Input
          value={this.state.input}
          onKeyPress={this.handleKeyPress}
          onChange={e => this.onInputChange(e.target.value)}
        />
        <br />
        <br />
        <small>{Math.round(this.state.wpm * 100) / 100} WPM (Average Instantaneous)</small>
        <br />
        <br />
        <h3>Pesonal Score: {this.state.uscore}</h3>
        <h4>Team 1 Score: {this.state.score1}</h4>
        <h4>Team 2 Score: {this.state.score2}</h4>
      </div>

    );
  }
}

Game.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  username: state.user.username,
});

export default connect(mapStateToProps, null)(Game);
