import React from 'react';
import './SquareBtn.css';

const squareBtn = (props) => {

    return (
      <div className='SquareBtn' onClick={props.onclick} id={props.id}>
        <img src={props.src} />
      </div>
    );
}
export default squareBtn;