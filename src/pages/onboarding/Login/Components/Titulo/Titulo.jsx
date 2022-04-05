import React from 'react';
import './Titulo.css';

const Titulo = ({ text }) => {
    return (
        <div className='title-container'>
            <label className='title-label'> {text} </label>
        </div>
    )
};
export default Titulo;