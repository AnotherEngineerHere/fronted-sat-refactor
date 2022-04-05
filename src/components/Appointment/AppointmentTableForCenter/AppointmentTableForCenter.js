import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './AppointmentTableForCenter.css'

function createData(monitor, emailMonitor, date, time, place) {
  return { monitor, emailMonitor, date, time, place };
}

const rows = [
  createData('Nelson Quiñones','leslie.alexander@example.com','10/10/2021', '09:15-09:45am', 'CAMBAS - Edificio A'),
  createData('Cristian Lasso','ronald.richards@example.com','10/12/2021', '12:00-12:45pm', 'Centro LEO - Edificio B'),
  createData('Daniel Fernandez','jane.cooper@example.com','10/13/2021', '01:15-01:45pm', 'ZOOM'),
  createData('Juan Puerta','robert.fox@example.com','10/14/2021', '02:00-02:45pm', 'ZOOM'),
  createData('Oscar Riascos','jenny.wilson@example.com','10/15/2021', '12:00-12:45pm', 'CAMBAS - Edificio A'),
  
];

export default function TableAlertCreated() {

  return (
    <TableContainer component={Paper}>
      <Table className="table-appointments" size="big" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Monitor</TableCell>
            <TableCell align="center">Email del Monitor</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Hora</TableCell>
            <TableCell align="center">Lugar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.monitor}>
              <TableCell component="th" scope="row">
                {row.monitor}
              </TableCell>
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
}
