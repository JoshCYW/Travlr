import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class TravelHistoryTableBody extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      selected: {},
    };
  }

  handleClick = (event, n) => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ selected: n });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ selected: {} });
  };

  render() {
    const {
      travelHistories, rowsPerPage, order, orderBy, page,
    } = this.props;
    const { anchorEl, selected } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, travelHistories.length - page * rowsPerPage);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;

    return (
      <TableBody>
        {stableSort(travelHistories, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(n => (
            <TableRow hover tabIndex={0} key={n.travelHistoryId} style={{ width: '100%' }}>
              <TableCell padding="checkbox" style={{ paddingLeft: 15 }}>{n.travelHistoryId}</TableCell>
              <TableCell padding="checkbox" style={{ width: '17.5%', paddingLeft: 15 }}>{n.country}</TableCell>
              <TableCell padding="checkbox" style={{ width: '17.5%', paddingLeft: 15 }}>{n.name}</TableCell>
              <TableCell padding="checkbox" style={{ width: '17.5%', paddingLeft: 15 }}>
                {n.date}
              </TableCell>
              <TableCell style={{ width: '17.5%', paddingLeft: 15 }}>
                <IconButton
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : null}
                  aria-haspopup="true"
                  onClick={e => this.handleClick(e, n)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 200,
                    },
                  }}
                >
                  <MenuItem>
                    TBD
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }
}

export default connect(
  null,
)(TravelHistoryTableBody);
