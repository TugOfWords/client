import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import socket from '../../socket';

class Game extends Component {
  state = {
    input: '',
    word: 'hello',
    wrong: false,
    wpm: 1,
    wpmt: Date.now(),
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        wpm: (9 * this.state.wpm) / 10,
      });
    }, 200);
  }

  onInputChange = (input) => {
    const te = (Date.now() - this.state.wpmt) / 1000;
    this.setState({
      wpm: (((60 / 8) * (1 / te)) + (9 * this.state.wpm)) / 10,
      wpmt: Date.now(),
    });

    this.updateInput(input);
  }

  getWord = () => {
    const dict = ['rock', 'paper', 'scissor', 'jump', 'run', 'hello', 'goodbye'];
    const word = dict[Math.floor(Math.random() * dict.length)];
    this.updateWord(word);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log(this.state.input);

      if (!this.checkWord()) {
        this.updateInput('');
        this.getWord();
        this.forceUpdate();
        this.setState({ wrong: false });
      }
    }
  }

  checkWord = () => {
    if (this.state.word === this.state.input) {
      this.setState({ wrong: false });
      return false;
    }
    this.setState({ wrong: true });
    return true;
  }

  updateWord = (word) => {
    this.setState({ word });
  }

  updateInput = (input) => {
    this.setState({ input });
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
        <h1 style={{ color: this.state.wrong ? 'red' : 'black' }}>{this.state.word}</h1>
        <Input
          value={this.state.input}
          onKeyPress={this.handleKeyPress}
          onChange={e => this.onInputChange(e.target.value)}
        />
        <br />
        <br />
        <small>{Math.round(this.state.wpm * 100) / 100} WPM (Average Instantaneous)</small>
      </div>

    );
  }
}

export default connect(null, null)(Game);
