import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as combine from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import {
  requestSort, changePage, changeRowsPerPage, changeOrderBy,
} from '../../actions/table';
import { getTravelHistory } from '../../actions/immigrations'
import TravelHistoryTableHead from '../components/TravelHistoryTableHead';
import TravelHistoryTableBody from '../components/TravelHistoryTableBody';
import TravelHistoryTableFoot from '../components/TravelHistoryTableFoot';

class TravelHistoryPage extends Component {
  componentDidMount() {
    this.props.getTravelHistory();
  }

  render() {
    const {
      travelHistories,
      classes,
      order,
      orderBy,
      page,
      rowsPerPage,
      handleSortChange,
      handlePageChange,
      handleRowChange,
      handleOrderByChange,
    } = this.props;

    return (
      <Paper className={classes.root} elevation={3}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TravelHistoryTableHead
              order={order}
              orderBy={orderBy}
              rowCount={travelHistories.length}
              handleSortChange={handleSortChange}
              handleOrderByChange={handleOrderByChange}
            />
            <TravelHistoryTableBody
              travelHistories={travelHistories}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Table>
          <TravelHistoryTableFoot
            numTravelHistories={travelHistories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            handlePageChange={handlePageChange}
            handleRowChange={handleRowChange}
          />
        </div>
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    backgroundColor: 'whitesmoke',
  },
});

const mapStateToProps = state => ({
  travelHistories: state.immigrations.travelHistories,
  order: state.table.order,
  orderBy: state.table.orderBy,
  page: state.table.page,
  rowsPerPage: state.table.rowsPerPage,
});

const mapDispatchToProps = dispatch => ({
  handleSortChange: order => dispatch(requestSort(order)),
  handlePageChange: page => dispatch(changePage(page)),
  handleRowChange: rows => dispatch(changeRowsPerPage(rows)),
  handleOrderByChange: order => dispatch(changeOrderBy(order)),
  getTravelHistory: () => dispatch(getTravelHistory()),
});

export default combine(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TravelHistoryPage);
