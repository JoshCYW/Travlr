import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers/index';
import history from '../history';

const store = createStore(
  createRootReducer(history),
  applyMiddleware(
    routerMiddleware(history),
    thunk,
  ),
);

export default store;
