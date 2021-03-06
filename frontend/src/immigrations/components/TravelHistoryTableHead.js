import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const columnData = [
  {
    id: 'direction',
    label: 'Direction',
  },
  {
    id: 'temp',
    label: 'Temp',
  },
  {
    id: 'timestamp',
    label: 'Timestamp',
  },
  {
    id: 'updatedBy',
    label: 'UpdatedBy',
  },
];

const TravelHistoryTableHead = ({
  order, orderBy, handleOrderByChange, handleSortChange,
}) => {
  const createSortHandler = (property) => {
    handleOrderByChange(property);
    if (order === 'desc') {
      handleSortChange('asc');
    } else {
      handleSortChange('desc');
    }
  };

  return (
    <TableHead style={{ backgroundColor: 'white' }}>
      <TableRow>
        {columnData.map(
          column => (
            <TableCell
              key={column.id}
              padding="checkbox"
              sortDirection={orderBy === column.id ? order : false}
              style={{ width: '17.5%', paddingLeft: 15, height: 48 }}
            >
              <Tooltip
                title="Sort"
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={() => {
                    createSortHandler(column.id);
                  }}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ),
          this,
        )}
      </TableRow>
    </TableHead>
  );
};

export default TravelHistoryTableHead;
