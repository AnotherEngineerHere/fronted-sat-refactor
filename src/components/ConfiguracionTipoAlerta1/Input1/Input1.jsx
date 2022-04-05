import React from "react";

import './Input1.css';

const Input1 = ({ attribute, handleChange}) =>{
    return(
        <input
                id={attribute.id}
                name={attribute.name}
                placeholder={attribute.placeholder}
                type={attribute.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="regular-style"
            />
    )
};
export default Input1;