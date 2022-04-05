import React from 'react';
import '../styles/BigTextField.css';

const BigTextField = ({ attribute}) => {
    return (
        <div className='input-container'>
            <textarea
                id={attribute.id}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                className='big-txt-field'
            />
        </div>
    )
};

export default BigTextField;
