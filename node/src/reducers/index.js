import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import tableReducer from './tableReducer';
import immigrationsReducer from './immigrationsReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  table: tableReducer,
  immigrations: immigrationsReducer,
});

export default createRootReducer;
