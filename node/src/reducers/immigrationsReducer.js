import { UPDATE_TRAVEL_HISTORY, RETRIEVE_TRAVEL_HISTORY, CREATE_IMMIGRATION_PORT } from "../constants";

const initialState = {
  travelHistories: [],
  travelHistory: {},
  immigrationList: []
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
    case CREATE_IMMIGRATION_PORT:
      const { immigrationAddress } = action.payload
      state.immigrationList.push(immigrationAddress)
      state = {
        ...state
      }
      console.log(state)
      return state
    default:
      return state;
  }
}
