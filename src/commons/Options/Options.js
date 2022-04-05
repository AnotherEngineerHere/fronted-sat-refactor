import React from "react";
import { useHistory } from "react-router";
import "../styles/styles.css";
import Label from "../../pages/onboarding/Login/Components/Label/Label";
import home from "../../assets/images/home.png";
import alerts from "../../assets/images/alerts.png";
import user from "../../assets/images/user.png";


const Options = () =>{
    const history = useHistory();
    function toAlerta(){
        return(
            history.push("/alert")
        )
    }

    return (
        <div className='general'>
                <div className='option-container'>
                    <img src={home}/>
                    <Label text='Inicio'></Label>
                    <img src={alerts} onClick={toAlerta}/>
                    <Label text='Alertas'></Label>
                    <img src={user}/>
                    <Label text='Perfil'></Label>
                </div>
        </div>    
    )
};

export default Options;
