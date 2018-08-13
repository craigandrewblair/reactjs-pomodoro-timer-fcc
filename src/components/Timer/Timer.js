import React, { Component } from 'react';
import Display from '../Display/Display';
import SquareBtn from '../SquareBtn/SquareBtn';
import SquareDsp from '../SquareDsp/SquareDsp';
import RecBtn from '../RecBtn/RecBtn';
import PlayPauseIcon from '../../images/PlayPauseIcon.png';
import RefreshIcon from '../../images/RefreshIcon.png';
import UpIcon from '../../images/UpIcon.png';
import DownIcon from '../../images/DownIcon.png';
import Alarm from '../../sounds/alarm.mp3'

class PomodoroTimer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      timer: 25 * 60,
      sessionLength: 25,
      breakLength: 5,
      running: false,
      chime: false,
      phase: 'Session',
      started: false
    }
  }

  //----------------------------- Timer Control -----------------------------//

  playPauseHandler = () => {
    if(this.state.running === false && this.state.started === false){
      clearInterval(this.state.cdTimer);
      this.setState((prevState, props) => {
        return{
          timer: this.state.phase === 'Session' ? this.state.sessionLength * 60 : this.state.breakLength * 60,
          running: true,
          started: true,
          cdTimer: setInterval(() => {
            this.timerControl();
            this.phaseControl();
           }, 1000)
        }
        });
      }
      else if(this.state.running) {
        this.setState({
          running: false
        });
        clearInterval(this.state.cdTimer);
      }
      else if(this.state.running === false && this.state.started === true) {
        this.setState({
          running: true,
          cdTimer: setInterval(() => {
            this.timerControl();
            this.phaseControl();
           }, 1000)
        })
      }
  }

  timerControl = () => {
    if(this.state.running === true){
      this.setState({
        timer: this.state.timer - 1
      });
    }
  }

  phaseControl = () => {
    if(this.state.timer < 0){
      this.audioHandler();
      this.state.phase === 'Session' 
      ? 
      this.setState({
        phase: 'Break',
        running: false,
        started: false
      }) 
      : 
      this.setState({
        phase: 'Session',
        running: false,
        started: false
      })
      this.playPauseHandler();
    }
  }
  //----------------------------- Full State Reinitialization -----------------------------//

  resetHandler = () => {
    this.setState({
      timer: 25 * 60,
      sessionLength: 25,
      breakLength: 5,
      running: false,
      chime: false,
      phase: 'Session',
      started: false
    });
    clearInterval(this.state.cdTimer);
    this.chime.pause();
    this.chime.currentTime = 0
  }

  //----------------------------- Input Controls -----------------------------//

  incrementSessionHandler = () => {
    if(this.state.sessionLength > 1 && this.state.sessionLength < 60){
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timer: this.state.timer + 60
      });
    }
  }
  
  decrementSessionHandler = () => {
    if(this.state.sessionLength > 1){
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timer: this.state.timer - 60
      });
    }
  }
  
  incrementBreakHandler = () => {
    if(this.state.breakLength > 1 && this.state.breakLength < 60){
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

  //----------------------------- Audio -----------------------------//

  audioHandler = () => {
    this.chime.play();
  }

  //----------------------------- Formatting -----------------------------//

  timeFormatter = () => {
    let m = Math.floor(this.state.timer / 60);
    let s = this.state.timer - m * 60;
    s = s < 10 ? '0' + s : s;
    m = m < 10 ? '0' + m : m;
    return m + ':' + s;
  }

  render() {
    return(
      <div id='Device'>
      <audio id="beep" preload="auto" src={Alarm} ref={(audio) => { this.chime = audio; }} />
      <Display timerLabel={this.state.phase} timer={this.timeFormatter()}/>
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
export default PomodoroTimer

