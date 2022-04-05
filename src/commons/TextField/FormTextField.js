import React from 'react';
import '../styles/FormTextField.css;'

const FormTextField = ({ attribute}) => {
    return (
        <div className='input-container'>
            <input
                id={attribute.id}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                className='form-txt-field'
                onChange={attribute.onChange}
            />
        </div>
    )
};

export default FormTextField;
