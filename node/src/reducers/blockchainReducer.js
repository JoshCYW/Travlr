import actions from '../actions/blockchain';
import { LOAD_BLOCKCHAIN_DATA } from '../constants';

const initialState = {
  travelHistories: [],
  travelHistory: {},
  accounts: [],
  travlrTruffleInstance: {},
  govtTruffleInstance: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_BLOCKCHAIN_DATA:
      return {
        ...state,
        accounts: action.payload.accounts,
        travlrTruffleInstance: action.payload.travlrTruffleInstance,
        govtTruffleInstance: action.payload.govtTruffleInstance,
      };

    default:
      return state;
  }
}
