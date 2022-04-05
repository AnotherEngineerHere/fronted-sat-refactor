import React, { useState } from "react";
import { useHistory } from "react-router";
import './NavbarLO.css';
import logo from '../../assets/images/image.png';
import logOut from '../../assets/images/logOut.png';

const NavbarLO=() =>{
    const history = useHistory();
    function toLogin(){
        return(
            history.push("/Login")
        )
    }

    return(
        <div className='navbar'>
            <img  className='logo-icesi' src={logo} />
            <label className='titulo'>SISTEMA DE ALERTAS TEMPRANAS</label>
            <div className='logOut'>
                <img width="30" height="30" src={logOut} onClick={toLogin}/>
            </div>
            
        </div>
    )

};
export default NavbarLO;
