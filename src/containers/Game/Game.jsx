import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
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
    console.log(this.state.input);
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
        <h3>Your Score: {this.state.uscore}</h3>
        <h4>Team 1 Score: {this.state.score1}</h4>
        <h4>Team 2 Score: {this.state.score2}</h4>
      </div>

    );
  }
}

export default connect(null, null)(Game);
