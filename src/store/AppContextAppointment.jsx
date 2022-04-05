import React, { useState } from "react";
//import * as uuid from "uuid";
import {
  SORT_TYPE_SUPPORT_CENTER,
  SORT_TYPE_DATE,
} from "../constants/sortAppointments";

//Va a ser nuestro manejador de estados
const AppContext = React.createContext();

export const AppContextWrapperAppointment = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  
  /** 
  const saveAppointmentNoComfirm = (supportcenter, reason, days) => {
    const newAppointment = {
      id: uuid.v1(),
      date: "To define",
      observation: reason,
      comment: days,
      place: "To define",
      modality: "To define",
      state: false,
      supportCenter: supportcenter,
    };
    const newAppointments = [...appointments, newAppointment];
    setAppointments(newAppointments);
  };
  */

  const sortAppointmentsTable = (sortType) => {
    const appointmentsCopy = appointments.map((appointment) => appointment);
    if (sortType === SORT_TYPE_SUPPORT_CENTER) {
      appointmentsCopy.sort((a, b) =>
        a.supportCenter > b.supportCenter ? 1 : -1
      );
    } else if (sortType === SORT_TYPE_DATE) {
      appointmentsCopy.sort((a, b) => (a.date < b.date ? 1 : -1));
    }
    setAppointments(appointmentsCopy);
  };

  const state = {
    appointments,
    setAppointments,
    sortAppointmentsTable,
  };
  return (
    //En value metemos state para que pueda ser llamado por cualquier componente
    <AppContext.Provider value={state} displayName="AppContext">
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
