import { CREATE_IMMIGRATION_PORT } from "../constants";

const initialState = {
  immigrationList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
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
