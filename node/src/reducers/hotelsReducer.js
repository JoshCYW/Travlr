import { CREATE_HOTEL } from "../constants";

const initialState = {
    hotelList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_HOTEL:
            return {
                ...state,
                hotelList: state.hotelList.concat(action.payload),
            }
        default:
            return state;
    }
}
