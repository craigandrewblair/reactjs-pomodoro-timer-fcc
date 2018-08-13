import React, { Component } from 'react';
import './Display.css';

class display extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }    
  }

  milliFormater = () => {
    let minutes = Math.floor(this.state.timer / 60000);
    let seconds = (this.state.timer - minutes * 60000);
    seconds = Math.round(seconds/1000);
    seconds = seconds < 10 ? '0' + seconds : seconds === 60 ? '00' : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //return this.state.started === true ? minutes + ':' + seconds : this.state.sessionLength + ':' + '00';
    return minutes + ':' + seconds;
  }

  render() {
    return (
      <div id='ClockRec'>
        <div id='timer-label' className='DspTitle'>
          {this.props.timerLabel}
        </div>
        <div id='time-left'>
          {this.props.timer}
        </div>
      </div>
    );
  }
}
export default display;