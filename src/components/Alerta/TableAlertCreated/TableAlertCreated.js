import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

function createData(studentName, risk, category, reason) {
  return { studentName, risk, category, reason };
}

const rows = [
  createData('In irure labore consectetur ad.','Cupidatat','Cillum voluptate sit aliqua.','Cillum officia fugiat eu nostrud sit incididunt voluptate tempor.'),
  createData('In irure labore consectetur ad.','Cupidatat','Cillum voluptate sit aliqua.','Cillum officia fugiat eu nostrud sit incididunt voluptate tempor.'),
  createData('In irure labore consectetur ad.','Cupidatat','Cillum voluptate sit aliqua.','Cillum officia fugiat eu nostrud sit incididunt voluptate tempor.'),
  createData('In irure labore consectetur ad.','Cupidatat','Cillum voluptate sit aliqua.','Cillum officia fugiat eu nostrud sit incididunt voluptate tempor.'),
];

export default function TableAlertCreated() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Estudiante</TableCell>
            <TableCell align="center">Riesgo</TableCell>
            <TableCell align="center">Categoria</TableCell>
            <TableCell align="center">Motivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.studentName}>
              <TableCell component="th" scope="row">
                {row.studentName}
              </TableCell>
              <TableCell align="center">{row.risk}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
