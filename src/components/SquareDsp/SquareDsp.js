import React from 'react';
import './SquareDsp.css';

const squareDsp = (props) => {

  this.defaultProps = {
    breakLength: 5,
    sessionLength: 25
  };

    return (
      <div className='SquareDsp'>
        <div className='DspTitle' id={props.id}>
          {props.title}
        </div>
        <div id={props.numId}>
          {props.breakLength || props.sessionLength}
        </div>
      </div>
    );
}
export default squareDsp;