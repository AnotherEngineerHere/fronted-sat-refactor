import React from "react";
import './Navbar.css';
import logo from '../../assets/images/image.png';

const Navbar=() =>{

    return(
        <div className='navbarNavbar'>
            <img src={logo} alt=""/>
            <label className='tituloAppointmentByStudent'>SISTEMA DE ALERTAS TEMPRANA</label>
        </div>

        
    )

};
export default Navbar;