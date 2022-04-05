import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from '../../../axios';
import "./TableConfigAlert.css";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function TableConfigAlert(props) {
  const classes = useStyles();

  const handleDelClick = (event) => {
    props.deleteAlertType(event.target.value);
  }

  const renderOptions = (data) => {
    if (data) {
      return data.map(item => {
        const keys = Object.keys(item);
          return (
            <TableRow key={item[keys[1]]}>
              <TableCell component="th" scope="row">{item[keys[1]]}</TableCell>
              <TableCell align="center">{item[keys[2]]}</TableCell>
              <TableCell align="center">
                <button class="primary" value={(item[keys[0]])} onClick={handleDelClick}>Eliminar</button>
                <button class="danger">Editar</button>
              </TableCell>
            </TableRow>
          );
      });
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">Permiso</TableCell>
            <TableCell align="center">Operación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderOptions(props.options)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
