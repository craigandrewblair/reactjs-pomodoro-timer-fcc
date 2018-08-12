import React from 'react';
import './Display.css';

const display = (props) => {
    
    return (
      <div id='ClockRec'>
        <div id='timer-label' className='DspTitle'>
          Session
        </div>
        <div id='time-left'>

        </div>
      </div>
    );
}
export default display;