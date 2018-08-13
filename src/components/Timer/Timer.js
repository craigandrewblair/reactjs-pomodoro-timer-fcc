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
      lap: 0,
      started: false
    }
  }

  //----------------------------- Timer Control -----------------------------//

  playPauseHandler = () => {
    if(this.state.running === false && this.state.started === false){
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
        console.log('this.state.running === false && this.state.started === false');
      }
      // play/pause control after midway through session
      else if(this.state.running) {
        this.setState({
          running: false
        });
        clearInterval(this.state.cdTimer);
        console.log('this.state.running');
        console.log(this.state.timer);
      }
      // play/pause control after midway through session
      else if(this.state.running === false && this.state.started === true) {
        this.setState({
          running: true,
          cdTimer: setInterval(() => {
            this.timerControl();
            this.phaseControl();
           }, 1000)
        })
        console.log('this.state.running === false && this.state.started === true');
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
      console.log('phase executed');
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
      lap: 0,
      started: false
    });
    clearInterval(this.state.cdTimer);
  }

  //----------------------------- Input Handlers -----------------------------//

  sessionInputHandler = (event) => {
    this.setState({
      sessionLength: event.target.value,
      timer: event.target.value
    });
    console.log('session input changed');
  }

  breakInputHandler = (event) => {
    this.setState({
      breakLength: event.target.value
    });
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

  audioHandler = (url) => {
    let audio = new Audio(url);
    audio.play();
  }

  //----------------------------- Formatting -----------------------------//


  convertMinToMilli = (min) => {
    const milli = min * 60000
    return milli;
  }

  timeFormatter = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  render() {
    this.state.chime === true ? this.audioHandler(Chime) : null;
    return(
      <div id='Device'>
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

