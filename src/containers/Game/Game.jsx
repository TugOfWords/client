import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Form } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

class Game extends Component {
  state = {
    'input': '',
    'word': 'hello',
    'wrong': false
  }

  updateInput = input => {
    this.setState({ input });
  }


  checkWord = () => {
    if(this.state.word === this.state.input){
      this.setState({ wrong: false });
      return false;
    }else{
      this.setState({ wrong: true });
      return true;
    }
  }

  updateWord = word => {
    this.setState({ word });
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log(this.state.input);
      
      if(!this.checkWord()){
        this.updateInput('');
        this.getWord();
        this.forceUpdate();
        this.setState({ wrong: false });
      }
    }
  }

  getWord = () => {
    let dict = ['rock', 'paper', 'scissor', 'jump', 'run', 'hello', 'goodbye'];
    let word = dict[Math.floor(Math.random()*dict.length)];
    this.updateWord(word);
  }

  render() {
    console.log(this.state.input);
    return (
      <div align="center" style={{ marginTop: '15%' }} >
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 style={{color:this.state.wrong? 'red':'black'}}>{this.state.word}</h1>
      <Input value={this.state.input} onKeyPress={this.handleKeyPress} onChange={e => this.updateInput(e.target.value)}/>
      </div>
        
    );
  }
}

export default connect(null, null)(Game);
