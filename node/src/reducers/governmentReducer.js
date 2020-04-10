import { PRELOAD_GOVERNMENT, CREATE_PASSPORT } from "../constants";

const initialState = {
    governments: [],
    passportBook: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRELOAD_GOVERNMENT:
            const { governments } = action.payload
            let ppb = {}
            for (let i = 0; i < governments.length; i++) {
                ppb[governments[i]] = []
            }
            console.log(ppb)
            state = {
                governments: action.payload.governments,
                passportBook: ppb
            }
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
        default:
            return state;
    }
}
