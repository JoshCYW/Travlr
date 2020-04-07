import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const TravelHistoryTableFoot = ({
  numTravelHistories,
  rowsPerPage,
  page,
  handlePageChange,
  handleRowChange,
}) => {
  const doPageChange = (event, newPage) => {
    handlePageChange(newPage);
  };
  const doRowChange = (event) => {
    handleRowChange(event.target.value);
  };
  return (
    <TablePagination
      component="div"
      count={numTravelHistories}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={doPageChange}
      onChangeRowsPerPage={doRowChange}
    />
  );
};

export default TravelHistoryTableFoot;
