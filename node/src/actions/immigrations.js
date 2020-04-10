import immigrations from '../api/immigrations';
import { RETRIEVE_TRAVEL_HISTORY, UPDATE_TRAVEL_HISTORY } from '../constants';

// TBD
// export const updateTravelHistory = () => (dispatch) => {
//   immigrations
//     .updateTravelHistory()
//     .then((response) => {
//       dispatch({
//         type: UPDATE_TRAVEL_HISTORY,
//         payload: response.data,
//       });
//     })
//     .catch(err);
// };

// export const getTravelHistory = () => (dispatch) => {
//   immigrations
//     .retrieveTravelHistory()
//     .then((response) => {
//       dispatch({
//         type: RETRIEVE_TRAVEL_HISTORY,
//         payload: response.data,
//       });
//     })
//     .catch(err);
// };


//placeholder
const response = {
    "data": {
        "travelHistories":
            [
                {
                    "travelHistoryId": 1,
                    "country": "Taiwan",
                    "name": "Corona",
                    "date": "2/2/20"
                }
            ]
    }
}
export const updateTravelHistory = () => (dispatch) => {
    dispatch({
        type: UPDATE_TRAVEL_HISTORY,
        payload: response.data,
    });
};

export const getTravelHistory = () => (dispatch) => {
    dispatch({
        type: RETRIEVE_TRAVEL_HISTORY,
        payload: response.data
    });
};
