import React from "react";

export default function SelectedInvolved(props) {
    const handleClick = ({ target }) => {
        let num = parseInt(target.nextElementSibling.textContent, 10);
        props.removeInvolved(num);
        console.log(target.nextElementSibling.textContent);
    };
 
    return (
        <ul>
            {props.involvedP.map((item, index) => (
               <div>
                    <li onClick={handleClick} key={index}>
                            {item}
                            
                    </li>
                    <button hidden>{index}</button>
                </div>
            ))}
        </ul>

    );
}
