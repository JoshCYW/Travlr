import { PRELOAD_GOVERNMENT, CREATE_PASSPORT, RETRIEVE_TRAVEL_HISTORY, CREATE_GOVERNMENT, CLEAR_TRAVEL_HISTORY, FILTER_TRAVEL_HISTORY } from "../constants";

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
            let ppb = [];
            for (let i = 0; i < governments.length; i++) {
                ppb[governments[i]] = []
            }
            state = {
                ...state,
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
            if (passportBook[government] == null) {
                passportBook[government] = []
            }
            passportBook[government].push(passportAddress)
            state = {
                ...state,
                passportBook
            }
            console.log(state)
            return state
        case CREATE_GOVERNMENT:
            const { govAddress, govEthMapping } = action.payload
            let pp = state.passportBook
            let map = state.mapping
            pp[govAddress] = [];
            state = {
                ...state,
                governments: state.governments.concat(govAddress),
                passportBook: pp,
                mapping: Object.assign(map, govEthMapping)
            }
            console.log(state);
            return state
        case RETRIEVE_TRAVEL_HISTORY:
            return {
                ...state,
                travelHistories: action.payload
            }
        case FILTER_TRAVEL_HISTORY:
            return {
                ...state,
                travelHistories: action.payload
            }
        case CLEAR_TRAVEL_HISTORY:
            return {
                ...state,
                travelHistories: [],
            }
        default:
            return state;
    }
}
