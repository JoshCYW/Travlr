import { PRELOAD_GOVERNMENT } from "../constants";

const initialState = {
    governments: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRELOAD_GOVERNMENT:
            state = {
                governments: action.payload.governments
            }
            return state
        default:
            return state;
    }
}
