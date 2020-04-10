import immigrations from '../api/immigrations';
import store from '../store/index'
import { RETRIEVE_TRAVEL_HISTORY, UPDATE_TRAVEL_HISTORY, CREATE_IMMIGRATION_PORT } from '../constants';

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


export const createImmigration = (gov, portName, long, lat) => dispatch => {
    const { govtTruffleInstance, accounts } = store.getState().blockchain
    govtTruffleInstance.at(gov).then(instance => {
        return instance.owner()
    }).then(result => {
        console.log('owner: ', result)
        govtTruffleInstance.at(gov).then(instance => {
            return instance.assignImmmigration(accounts[3], portName, long, lat, {
                from: result
            })
        }).then(result => {
            var address = result.receipt.logs[0].address
            console.log('Immigration Contract address: ', address)
            // store passport in relevant govt folder
            dispatch({
                type: CREATE_IMMIGRATION_PORT,
                payload: {
                    government: gov,
                    immigrationAddress: address
                }
            })
        }).catch(error => {
            console.log(error)
        })
    }).catch(function (error) {
        console.log(error)
    })
}