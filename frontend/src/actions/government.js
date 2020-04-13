import store from '../store/index'
import { CREATE_PASSPORT, RETRIEVE_TRAVEL_HISTORY, CREATE_GOVERNMENT, CLEAR_TRAVEL_HISTORY, FILTER_TRAVEL_HISTORY } from '../constants'
import { TRAVLR_ADDRESS } from '../config'
import axios from 'axios'
import storage from '../utils/storage'

export const createGovernment = (ownerAddress, countryCode) => dispatch => {
    const { travlrTruffleInstance, accounts } = store.getState().blockchain
    travlrTruffleInstance.at(TRAVLR_ADDRESS).then(instance => {
        return instance.assignGovernment(ownerAddress, countryCode, {
            from: accounts[0]
        })
    }).then(result => {
        var address = result.receipt.logs[0].address
        // create new entry in mongo
        axios.post('http://localhost:4000/user', {
            username: countryCode,
            publicAddress: ownerAddress,
            type: 'GOVERNMENT',
            contractAddress: result.receipt.logs[0].address
        }).then(response => {
            console.log('successfully created government entity: ', response.data)
            let mapping = {
                address: ownerAddress
            }
            dispatch({
                type: CREATE_GOVERNMENT,
                payload: {
                    govAddress: address,
                    govEthMapping: mapping
                }
            })
        })
    }).catch(err => {
        console.log(err)
    })
}

export const createPassport = (gov, passportNum, owner) => dispatch => {
    const { govtTruffleInstance } = store.getState().blockchain
    let contractAddress = storage.get('contractAddress')
    console.log(contractAddress, passportNum)
    let owner;
    govtTruffleInstance.at(contractAddress).then(instance => {
        console.log(instance)
        return instance.owner()
    }).then(result => {
        console.log('owner: ', result)
        owner = result
        govtTruffleInstance.at(contractAddress).then(instance => {
            return instance.createEthPassport(owner, passportNum, {
                from: result
            })
        }).then(result => {
            var address = result.receipt.logs[0].address
            console.log('Passport Contract address: ', address)
            // store passport in relevant govt folder
            dispatch({
                type: CREATE_PASSPORT,
                payload: {
                    government: contractAddress,
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

export const retrieveTravelHistory = (gov, passportAddress) => dispatch => {
    const { govtTruffleInstance } = store.getState().blockchain
    let owner;
    let govInstance;
    let travelHistories = [];
    govtTruffleInstance.at(gov).then(instance => {
        govInstance = instance;
        return instance.owner()
    }).then(result => {
        owner = result
        return govInstance.getHeadId(passportAddress, {
            from: owner
        }).then(result => {
            const forLoop = async _ => {
                for (let i = 0; i <= result; i++) {
                    let results = await govInstance.getTravelHistoryWithId(passportAddress, i, {
                        from: owner
                    })
                    const { next, timestamp, direction, temp, updatedBy } = results.receipt.logs[0].args
                    const travelHistory = {
                        "next": next.words[0],
                        "timestamp": timestamp.words[0],
                        "direction": direction.words[0],
                        "temp": temp.words[0],
                        "updatedBy": updatedBy
                    }
                    travelHistories.push(travelHistory);
                }
            }
            forLoop().then(() => {
                dispatch({
                    type: RETRIEVE_TRAVEL_HISTORY,
                    payload: travelHistories
                })
            });
        })
            .catch(error => {
                console.log(error)
            })
    }).catch(function (error) {
        console.log(error)
    })
}

export const filterTravelHistory = (startDate, endDate) => dispatch => {
    const { travelHistories } = store.getState().government
    let filtered = travelHistories.filter(travelHistory => startDate <= Number((travelHistory.timestamp + 1543503872) * 1000) &&  Number((travelHistory.timestamp + 1543503872) * 1000) <= endDate );
    dispatch({
        type: FILTER_TRAVEL_HISTORY,
        payload: filtered
    })
}

export const clearTravelHistory = () => dispatch => {
    dispatch({
        type: CLEAR_TRAVEL_HISTORY
    })
}
