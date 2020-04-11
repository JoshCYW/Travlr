import {
    REQUEST_SORT, CHANGE_PAGE, CHANGE_ROWS_PER_PAGE, CHANGE_ORDER_BY,
  } from '../actions/table';
  
  const INITIAL_STATE = {
    order: 'asc',
    orderBy: 'id',
    page: 0,
    rowsPerPage: 10,
  };
  
  function tableReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case REQUEST_SORT: {
        return {
          ...state,
          order: action.order,
        };
      }
      case CHANGE_PAGE: {
        return {
          ...state,
          page: action.page,
        };
      }
      case CHANGE_ROWS_PER_PAGE: {
        return {
          ...state,
          rowsPerPage: action.rows,
        };
      }
      case CHANGE_ORDER_BY: {
        return {
          ...state,
          orderBy: action.property,
        };
      }
      default: return state;
    }
  }
  
  export default tableReducer;
  