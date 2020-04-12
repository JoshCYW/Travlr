import store from '../store/index'
import { CREATE_IMMIGRATION_PORT } from '../constants';

export const createImmigration = (gov, portName, long, lat, owner) => dispatch => {
    const { govtTruffleInstance } = store.getState().blockchain
    govtTruffleInstance.at(gov).then(instance => {
        return instance.owner()
    }).then(result => {
        console.log('owner: ', result)
        govtTruffleInstance.at(gov).then(instance => {
            return instance.assignImmmigration(owner, portName, long, lat, {
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