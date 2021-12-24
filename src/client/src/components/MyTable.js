import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function MyTable({myFlights}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Flight Number</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Flight Date</TableCell>
            <TableCell align="right">Cabin</TableCell>
            <TableCell align="right">Available Seats</TableCell>
            <TableCell align="right" ></TableCell>
            <TableCell align="right" ></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {myFlights.map((f) => (
            <TableRow
              key={f.FlightNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {f.FlightNo}
              </TableCell>
              <TableCell align="right">{f.From}</TableCell>
              <TableCell align="right">{f.To}</TableCell>
              <TableCell align="right">{f.FlightDate}</TableCell>
              <TableCell align="right">{f.Cabin}</TableCell>
              <TableCell align="right">{f.SeatsAvailable}</TableCell>
              <TableCell align="right"> <Button variant="contained">Update</Button> </TableCell>
              <TableCell align="right"> <Button variant="contained" color="error" > Delete</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}