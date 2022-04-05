import React from "react";
import { Link } from "react-router-dom";
import NavbarLO from "../../commons/NavBarLO/NavbarLO";
import Options from "../../commons/Options/Options";
import LabelPrimary from "../../commons/components/Inicio/Label/LabelPrimary";
import ButtonPrimary from "../../commons/components/Alerta/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../commons/components/Alerta/ButtonSecondary/ButtonSecondary";
import "./StudentAppointment.css";

const StudentAppointment = () => {
  return (
    <div className="studentAppointment">
      <div className="navbarLO-container">
        <NavbarLO></NavbarLO>
        <div className="general-container">
          <Options></Options>
          <div className="information-container">
            <div className="label-container">
              <LabelPrimary text="Student appointment"></LabelPrimary>
            </div>
            <div className="button-container">
              <Link to="/appointment/byStudent/myAppointments">
                <ButtonPrimary
                  text="My Appointments"
                  //onClick={console.log("wenas")}
                ></ButtonPrimary>
              </Link>
              <Link to="/appointment/byStudent/createAppointmentsStudents">
                <ButtonSecondary
                  text="Create Appointment"
                  //onClick={toAlertCreated}
                ></ButtonSecondary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAppointment;
