import React from "react";
import "./AppointmentItem.css";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const AppointmentItem = ({ appointment }) => {
  //const [isAccepted, setIsAccepted] = useState(false);

  return (
    <TableRow className="appointmentItem">
      <TableCell>{appointment.supportCenter}</TableCell>
      <TableCell>{appointment.observation}</TableCell>
      <TableCell>{appointment.place}</TableCell>
      <TableCell>{appointment.date}</TableCell>
      <TableCell>{appointment.monitor}</TableCell>
    </TableRow>
  );
};

export default AppointmentItem;
