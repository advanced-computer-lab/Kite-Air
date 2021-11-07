import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import FormDialog from './UpdateDialog';
import DeleteDialog from './DeleteDialog';
import { GridColumnsPanel } from '@mui/x-data-grid';
import AlertDialog from './AlertDialog';

var toBeDeleted = [];

 



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function handleRegionClick(id) {
  console.log(id);
  <FormDialog/>
};

function openComponent(id){
  <FormDialog/>
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'FlightNo',
    numeric: true,
    disablePadding: true,
    label: 'Flight No.',
  },
  {
    id: 'From',
    numeric: false,
    disablePadding: false,
    label: 'From',
  },
  {
    id: 'To',
    numeric: false,
    disablePadding: false,
    label: 'To',
  },
  {
    id: 'Terminal',
    numeric: true,
    disablePadding: true,
    label: 'Terminal #',
  },
  {
    id: 'FlightDate',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },

  {
    id: 'DepartureTime',
    numeric: false,
    disablePadding: false,
    label: 'Departure',
  },
  {
    id: 'ArrivalTime',
    numeric: false,
    disablePadding: false,
    label: 'Arrival',
  },

  {
    id: 'fseatsAvailabe',
    numeric: true,
    disablePadding: false,
    label: 'First Class Seats #',
  },
  {
    id: 'bseatsAvailabe',
    numeric: true,
    disablePadding: false,
    label: 'Economy Class Seats #',
  },
  {
    id: 'eseatsAvailabe',
    numeric: true,
    disablePadding: false,
    label: 'Economy Class Seats #',
  },
  {},

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {

  const openDialog = () => {
  
    <DeleteDialog rows = {toBeDeleted} />
  };
  const { numSelected } = props;

  return (
    // <AlertDialog rows = {toBeDeleted} />
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
     >
       {/* <DeleteDialog rows = {toBeDeleted} /> */}
       {/* <Button variant = "contained" color = "error" onClick={openDialog}> Delete </Button> */}

    {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Flights
        </Typography>
      )}

        {numSelected > 0 ? (
            <Tooltip title="Delete">
              <AlertDialog rows = {toBeDeleted} />

            {/* <IconButton> */}
              {/* <Button  variant="contained" color="error" onClick={openDialog()}>Delete</Button> */}
              {/* <DeleteDialog rows = {toBeDeleted} /> */}
              {/* <AlertDialog /> */}
            {/* </IconButton> */}
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
                {/* <FilterListIcon /> */}
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ rows }) {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('FlightNo');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds)
      toBeDeleted = newSelecteds;
      console.log('will delete: '+toBeDeleted);
      return;
    }
    setSelected([]);
    toBeDeleted = [];
    console.log('will delete: '+toBeDeleted);

  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name); //selected one or more
     // console.log('just selected: '+newSelected);
     
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1)); //unselected all
     // console.log('just unselected all ');
     // toBeDeleted = [];
      //console.log('will delete: '+toBeDeleted);
    } else if (selectedIndex === selected.length - 1) { //deletes the last record that has been selected
      newSelected = newSelected.concat(selected.slice(0, -1));
     // toBeDeleted = toBeDeleted.pop(name);
      console.log('passed here');
      //console.log('hena: '+ toBeDeleted);
    } else if (selectedIndex > 0) {  //deletes record mn el nos
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );

      console.log('7asal 7aga');
    }

    setSelected(newSelected);
    toBeDeleted=  newSelected;
    console.log('will delete: '+toBeDeleted);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(rows).length) : 0;

  return (


    <Box sx={{ width: '100%' }}>
     
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={Object.keys(rows).length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover

                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row._id)}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        {row.FlightNo}
                      </TableCell>

                      <TableCell align="right">{row.From}</TableCell>
                      <TableCell align="right">{row.To}</TableCell>
                      <TableCell align="right">{row.Terminal}</TableCell>
                      <TableCell align="right">{row.FlightDate}</TableCell>
                      <TableCell align="right">{row.DepartureTime}</TableCell>
                      <TableCell align="right">{row.ArrivalTime}</TableCell>

                      <TableCell align="right">{row.fseatsAvailable}</TableCell>
                      <TableCell align="right">{row.bseatsAvailable}</TableCell>
                      <TableCell align="right">{row.eseatsAvailable}</TableCell>
                      {/* <TableCell align="right">{row.From}</TableCell>
                      <TableCell align="right">{row.To}</TableCell>
                      <TableCell align="right">{row.FlightDate}</TableCell>
                      <TableCell align="right">{row.Cabin}</TableCell>
                      <TableCell align="right">{row.SeatsAvailable}</TableCell>
                      <TableCell align="right">{row.SeatsAvailable}</TableCell> */}
                      <TableCell align="right"><FormDialog row={row} />
                         {/* <Button variant="contained" onClick={() => { handleRegionClick(row._id); }}> Update</Button>  */}
                         </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Object.keys(rows).length}


          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}