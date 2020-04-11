import { PRELOAD_GOVERNMENT, CREATE_PASSPORT, RETRIEVE_TRAVEL_HISTORY } from "../constants";

const initialState = {
    travelHistories: [],
    governments: [],
    passportBook: {},
    mapping: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRELOAD_GOVERNMENT:
            const { governments, mapping } = action.payload
            let ppb = {}
            for (let i = 0; i < governments.length; i++) {
                ppb[governments[i]] = []
            }
            state = {
                governments: action.payload.governments,
                passportBook: ppb,
                mapping
            }
            console.log(state)
            return state
        case CREATE_PASSPORT:
            const { passportAddress, government } = action.payload
            console.log(passportAddress, government)
            let passportBook = state.passportBook
            passportBook[government].push(passportAddress)
            state = {
                ...state,
                passportBook
            }
            console.log(state)
            return state
        case RETRIEVE_TRAVEL_HISTORY:
            return {
                ...state,
                travelHistories: action.payload
            }
        default:
            return state;
    }
}
