import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import tableReducer from './tableReducer';
import immigrationsReducer from './immigrationsReducer';
import blockchainReducer from './blockchainReducer';
import governmentReducer from './governmentReducer';
import hotelReducer from './hotelsReducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  table: tableReducer,
  immigrations: immigrationsReducer,
  blockchain: blockchainReducer,
  government: governmentReducer,
  hotels: hotelReducer
});

export default createRootReducer;
