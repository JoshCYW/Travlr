import store from '../store/index'
import { CREATE_PASSPORT } from '../constants'

export const createPassport = (gov, passportNum) => dispatch => {
    const { govtTruffleInstance, accounts } = store.getState().blockchain
    console.log(gov, passportNum)
    let owner;
    govtTruffleInstance.at(gov).then(instance => {
        console.log(instance)
        return instance.owner()
    }).then(result => {
        console.log('owner: ', result)
        owner = result
        govtTruffleInstance.at(gov).then(instance => {
            return instance.createEthPassport(accounts[9], passportNum, {
                from: result
            })
        }).then(result => {
            var address = result.receipt.logs[0].address
            console.log('Passport Contract address: ', address)
            // store passport in relevant govt folder
            dispatch({
                type: CREATE_PASSPORT,
                payload: {
                    government: gov,
                    passportAddress: address
                }
            })
        }).catch(error => {
            console.log(error)
        })
    }).catch(function (error) {
        console.log(error)
    })
}