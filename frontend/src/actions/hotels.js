import store from '../store/index'
import { CREATE_HOTEL } from '../constants';

//hardcoded address
export const createHotel = (gov, hotelName, lat, long, owner) => dispatch => {
    const { govtTruffleInstance } = store.getState().blockchain
    govtTruffleInstance.at(gov).then(instance => {
        return instance.owner()
    }).then(result => {
        console.log('owner: ', result)
        govtTruffleInstance.at(gov).then(instance => {
            return instance.assignHotel(owner, hotelName, lat, long, {
                from: result
            })
        }).then(result => {
            var address = result.receipt.logs[0].address
            console.log('Hotel Contract address: ', address)
            dispatch({
                type: CREATE_HOTEL,
                payload: {
                    government: gov,
                    hotelAddress: address
                }
            })
        }).catch(error => {
            console.log(error)
        })
    }).catch(function (error) {
        console.log(error)
    })
}