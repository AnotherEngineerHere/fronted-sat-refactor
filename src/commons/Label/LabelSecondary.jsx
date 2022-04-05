import React from 'react';
import '../styles/LabelSecondary.css';

const LabelSecondary = ( props ) =>{
    return(
        <div className='label-container-sec'>
            <label className='label-label'> {props.text} </label>
        </div>
    )
};

export default LabelSecondary;
