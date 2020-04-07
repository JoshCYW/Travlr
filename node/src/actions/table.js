export const REQUEST_SORT = 'REQUEST_SORT';

export function requestSort(order) {
  return {
    type: REQUEST_SORT,
    order,
  };
}

export const CHANGE_PAGE = 'RECHANGE_PAGEQUEST_SORT';

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}

export const CHANGE_ROWS_PER_PAGE = 'CHANGE_ROWS_PER_PAGE';

export function changeRowsPerPage(rows) {
  return {
    type: CHANGE_ROWS_PER_PAGE,
    rows,
  };
}

export const CHANGE_ORDER_BY = 'CHANGE_ORDER_BY';

export function changeOrderBy(property) {
  return {
    type: CHANGE_ORDER_BY,
    property,
  };
}
