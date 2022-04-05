import React from "react";
import AppointmentsContainer from "../../components/AppointmentsContainer/AppointmentsContainer";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";

const MyAppointments = () => {
  //const [isOpen, setIsOpen] = useState(false);

  // const togglePopup = () => {
  //  setIsOpen(!isOpen);
  //};

  return (
    <SectionTitle title="Citas del Estudiante">
      <AppointmentsContainer />
    </SectionTitle>
    /** 
    <AppContextWrapperAppointment>
      <div className="navbarLO-container">
        <NavbarLO></NavbarLO>
        <div className="general-container">
          <Options></Options>
          <div className="information-container">
            <AppointmentsContainer></AppointmentsContainer>
          </div>
        </div>
      </div>
    </AppContextWrapperAppointment>
    */
  );
};

export default MyAppointments;
