import React from "react";
import './Navbar.css';
import logo from '../../assets/images/image.png';

const Navbar=() =>{

    return(
        <div className='navbar'>
            <img src={logo} alt=""/>
            <label className='titulo'>SISTEMA DE ALERTAS TEMPRANA</label>
        </div>
    )

};
export default Navbar;