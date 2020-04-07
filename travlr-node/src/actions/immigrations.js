import immigrations from '../api/immigrations';

const UPDATE_TRAVEL_HISTORY = 'UPDATE_TRAVEL_HISTORY';
const RETRIEVE_TRAVEL_HISTORY = 'RETRIEVE_TRAVEL_HISTORY';

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

export default {
    UPDATE_TRAVEL_HISTORY,
    RETRIEVE_TRAVEL_HISTORY
};
