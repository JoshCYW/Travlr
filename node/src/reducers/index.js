import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import tableReducer from './tableReducer';
import immigrationsReducer from './immigrationsReducer';
import blockchainReducer from './blockchainReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  table: tableReducer,
  immigrations: immigrationsReducer,
  blockchain: blockchainReducer,
});

export default createRootReducer;
