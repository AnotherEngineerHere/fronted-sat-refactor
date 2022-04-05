import React, { useContext } from "react";
import "./AppointmentsList.css";
import AppContext from "../../../store/AppContextAppointment";
import AppointmentItem from "../AppointmentItem/AppointmentItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const AppointmentsList = () => {
  const state = useContext(AppContext);

  const renderAppointments = () => {
    return state.appointments.map((appointment) => (
      <AppointmentItem key={appointment.id} appointment={appointment} />
    ));
  };

  return (
    <div className="appointmentsList">
      <Table aria-label="customized table">
        <TableHead className="header">
          <TableRow className="row">
            <TableCell className="cell">Support Center</TableCell>
            <TableCell className="cell">Observation</TableCell>
            <TableCell className="cell">Place</TableCell>
            <TableCell className="cell">Date</TableCell>
            <TableCell className="cell">Monitor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderAppointments()}</TableBody>
      </Table>
    </div>
  );
};

export default AppointmentsList;
