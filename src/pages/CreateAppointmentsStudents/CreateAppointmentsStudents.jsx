import React, { useState } from "react";
import NavbarLO from "../../commons/NavBarLO/NavbarLO";
import Options from "../../commons/Options/Options";
import GeneralComboBox from "../../commons/components/GeneralComboBox/GeneralComboBox";
import GeneralInput from "../../commons/components/GeneralInput/GeneralInput";
import GeneralCheckBox from "../../commons/components/GeneralCheckBox/GeneralCheckBox";
import Button from "@material-ui/core/Button";
import "./CreateAppointmentsStudents.css";

const CreateAppointmentsStudents = () => {
  const [dias, setDias] = useState("");

  return (
    <div className="studentAppointment">
      <div className="navbarLO-container">
        <NavbarLO></NavbarLO>
        <div className="general-container">
          <Options></Options>
          <div className="information-container">
            <GeneralComboBox
              one="Centros de apoyo"
              arraysOptions={["CAMBAS", "LEO", "I.E CENTER"]}
            >
              {" "}
            </GeneralComboBox>
            <GeneralInput one="Motivo"></GeneralInput>
            <GeneralInput one="Horarios Disponibles"></GeneralInput>
            <Button className="enviar" variant="contained" size="medium">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentsStudents;
