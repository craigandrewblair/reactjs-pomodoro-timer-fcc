import React, { Component } from 'react';
import Chime from '../../sounds/chime.mp3';
import Display from '../Display/Display';
import SquareBtn from '../SquareBtn/SquareBtn';
import SquareDsp from '../SquareDsp/SquareDsp';
import RecBtn from '../RecBtn/RecBtn';
import PlayPauseIcon from '../../images/PlayPauseIcon.png';
import RefreshIcon from '../../images/RefreshIcon.png';
import UpIcon from '../../images/UpIcon.png';
import DownIcon from '../../images/DownIcon.png';

class cdTimer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      timer: 0, // subtract time from length
      sessionLength: 25, // stores value of session input value
      breakLength: 5, // stores value of break input value
      time: 0, // time calculation
      start: 0, // date on click
      running: false, // running interval
      chime: false, // flag play audio
      lap: 0, // phase counter
      phase: 'session', // phase identifier
      started: false // needed for pause condition
    }
  }

  //----------------------------- cdTimer Control -----------------------------//

  playPauseHandler = () => {

  }

  //----------------------------- Full State Reinitialization -----------------------------//

  resetHandler = () => {

  }

  //----------------------------- Input Handlers -----------------------------//

  sessionInputHandler = (event) => {
    this.setState({
      sessionLength: event.target.value,
      timer: event.target.value,
    });
  }

  breakInputHandler = (event) => {
    this.setState({
      breakLength: event.target.value
    });
  }

  //----------------------------- Input Controls -----------------------------//

  incrementSessionHandler = () => {
    if(this.state.sessionLength >= 1 && this.state.sessionLength < 60){
      this.setState({
        sessionLength: this.state.sessionLength + 1
      });
    }
  }
  
  decrementSessionHandler = () => {
    if(this.state.sessionLength > 1){
      this.setState({
        sessionLength: this.state.sessionLength - 1
      });
    }
  }
  
  incrementBreakHandler = () => {
    if(this.state.breakLength >= 1 && this.state.breakLength < 60){
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }
  
  decrementBreakHandler = () => {
    if(this.state.breakLength > 1){
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  render() {
    return(
      <div id='Device'>
      <Display />
      <div id='Row2'>
        <SquareDsp id='session-label' title='Session Length' numId='session-length' sessionLength={this.state.sessionLength}/>
        <SquareBtn id='start_stop' onclick={this.playPauseHandler} src={PlayPauseIcon}/>
        <SquareDsp id='break-label' title='Break Length' numId='break-length' breakLength={this.state.breakLength}/>
      </div>
      <div id='Row3'>
        <div id='UpDownBtnDiv'>
          <RecBtn id='session-increment' src={UpIcon} onclick={this.incrementSessionHandler}/>
          <RecBtn id='session-decrement' src={DownIcon} onclick={this.decrementSessionHandler}/>
        </div>
        <SquareBtn id='reset' onclick={this.resetHandler} src={RefreshIcon}/>
        <div id='UpDownBtnDiv'>
          <RecBtn id='break-increment' src={UpIcon} onclick={this.incrementBreakHandler}/>
          <RecBtn id='break-decrement' src={DownIcon} onclick={this.decrementBreakHandler}/>
        </div>
      </div>
    </div>
    )
  }
}
export default cdTimer