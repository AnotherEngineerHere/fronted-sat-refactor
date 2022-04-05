import React from "react";

import './ButtonSecondary.css';

const ButtonSecondary = ({text}) =>{
    return(
        <div>
            <button className="button-second">{text}</button>
        </div>
    )
};
export default ButtonSecondary;