import React, { useState } from "react";
import ButtonG from '../Button/ButtonG';

export default function Buttonbox({ items, onItemClick }) {

   
    return (
        <div>
            {items.map((item, index) => (
               <div>
                <ButtonG onItemClick = {onItemClick} text={item} pressed={false}></ButtonG>
                </div>
            ))}
        </div>
    );
}
