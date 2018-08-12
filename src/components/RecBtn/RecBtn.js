import React from 'react';
import './RecBtn.css';

const recBtn = (props) => {

    return (
      <div className='RecBtn' id={props.id} onClick={props.onclick}>
        <img className='IncDecIcon' src={props.src}/>
      </div>
    );
}
export default recBtn;