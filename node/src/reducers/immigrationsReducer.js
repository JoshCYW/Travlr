import { UPDATE_TRAVEL_HISTORY, RETRIEVE_TRAVEL_HISTORY } from "../constants";

const initialState = {
  travelHistories: [],
  travelHistory: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRAVEL_HISTORY:
      return {
        ...state,
        //tbd
      };
    case RETRIEVE_TRAVEL_HISTORY:
      return {
        ...state,
        travelHistories: action.payload.travelHistories,
      };

    default:
      return state;
  }
}
