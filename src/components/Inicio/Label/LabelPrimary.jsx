import React from 'react';
import './LabelPrimary.css';

const LabelPrimary = ( {text} ) =>{
    return(
        <div className='label-container'>
            <label className='label-label'> {text} </label>
        </div>
    )
};

export default LabelPrimary;