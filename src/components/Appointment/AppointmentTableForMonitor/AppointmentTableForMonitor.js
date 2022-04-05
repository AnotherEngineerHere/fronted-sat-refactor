import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const AppointmentTableForMonitor = () => {
  function createData(student, supportCenter, emailMonitor, date, time, place) {
    return { student, supportCenter, emailMonitor, date, time, place };
  }

  const rows = [
    createData(
      "Nelson Quiñones",
      "CAMBAS",
      "leslie.alexander@example.com",
      "10/10/2021",
      "09:15-09:45am",
      "CAMBAS - Edificio A"
    ),
    createData(
      "Cristian Lasso",
      "LEO",
      "ronald.richards@example.com",
      "10/12/2021",
      "12:00-12:45pm",
      "Centro LEO - Edificio B"
    ),
    createData(
      "Daniel Fernandez",
      "Ing. Software",
      "jane.cooper@example.com",
      "10/13/2021",
      "01:15-01:45pm",
      "ZOOM"
    ),
    createData(
      "Juan Puerta",
      "E.L. Center",
      "robert.fox@example.com",
      "10/14/2021",
      "02:00-02:45pm",
      "ZOOM"
    ),
    createData(
      "Oscar Riascos",
      "Psicologia",
      "jenny.wilson@example.com",
      "10/15/2021",
      "12:00-12:45pm",
      "CAMBAS - Edificio A"
    ),
  ];
  return (
    <TableContainer component={Paper}>
      <Table
        className="table-appointments"
        size="big"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Estudiante</TableCell>
            <TableCell align="center">Centro de Apoyo</TableCell>
            <TableCell align="center">Email del Monitor</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Hora</TableCell>
            <TableCell align="center">Lugar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.student}>
              <TableCell component="th" scope="row">
                {row.student}
              </TableCell>
              <TableCell align="center">{row.supportCenter}</TableCell>
              <TableCell align="center">{row.emailMonitor}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center">{row.place}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentTableForMonitor;
