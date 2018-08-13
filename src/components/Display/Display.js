import React, { Component } from 'react';
import './Display.css';

const display = (props) => {

return (
  <div id='ClockRec'>
    <div id='timer-label' className='DspTitle'>
      {props.timerLabel}
    </div>
    <div id='time-left'>
      {props.timer}
    </div>
  </div>
)}

export default display;