import actions from '../actions/blockchain';

const initialState = {
  travelHistories: [],
  travelHistory: {},
  accounts: [],
  travlrTruffleInstance: {},
  govtTruffleInstance: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.LOAD_BLOCKCHAIN_DATA:
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
