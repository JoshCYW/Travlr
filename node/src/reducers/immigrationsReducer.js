import actions from '../actions/immigrations';

const initialState = {
  travelHistories: [],
  travelHistory: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_TRAVEL_HISTORY:
      return {
        ...state,
        //tbd
      };
    case actions.RETRIEVE_TRAVEL_HISTORY:
      return {
        ...state,
        travelHistories: action.payload.travelHistories,
      };

    default:
      return state;
  }
}
