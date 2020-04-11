import { CREATE_HOTEL } from "../constants";

const initialState = {
    hotelList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_HOTEL:
            const { hotelAddress } = action.payload
            state.hotelList.push(hotelAddress)
            state = {
                ...state
            }
            console.log(state)
            return state
        default:
            return state;
    }
}
