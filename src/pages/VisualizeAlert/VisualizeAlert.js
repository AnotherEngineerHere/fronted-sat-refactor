import React from "react";
import "./VisualizeAlert.css";
import NavbarLO from "../../commons/NavBarLO/NavbarLO";
import LabelPrimary from "../../commons/components/Inicio/Label/LabelPrimary";
import Options from "../../commons/Options/Options";
import TableAlertCreated from "../../commons/components/Alerta/TableAlertCreated/TableAlertCreated";
import LabelSecondary from "../../commons/Label/LabelSecondary";
import FormComboBox from "../../commons/ComboBox/FormComboBox";


const VisualizeAlert = () => {
    document.title = "Visualizar Alertas";
    return (
        <div className="navbarLO-container">
            <NavbarLO></NavbarLO>
            <div className="general-container">
                <Options></Options>
                <div className="information-container">
                    <div className="label-container">
                        <LabelPrimary text="Visualizar Alertas"></LabelPrimary>
                    </div>
                    <div className="table-alerts">
                        <div className="inside-box">
                            <LabelSecondary text='Filtrar por:'></LabelSecondary>
                            <FormComboBox></FormComboBox>
                        </div>

                        <TableAlertCreated></TableAlertCreated>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default VisualizeAlert;
