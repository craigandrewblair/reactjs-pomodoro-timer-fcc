import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer/Timer';


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       breakLength: 5,
       sessionLength: 25,
       timing: false
    }
  }

  resetHandler = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timing: false
    });
  }

  playPauseHandler = () => {
    console.log('play pause clicked');
  }
  
  render() {
    return (
      <div className="App">        
          <h1 id="App-title"> React Pomodoro Clock</h1>
          <Timer />
        <div id='FooterNote'>Craig Blair &copy; 2018</div>
      </div>
    );
  }
}

export default App;
