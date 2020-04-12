import store from '../store/index'
import { CREATE_HOTEL } from '../constants';
import axios from 'axios'
import storage from "../utils/storage";

//hardcoded address
export const createHotel = (gov, hotelName, lat, long, owner) => dispatch => {
    const { govtTruffleInstance } = store.getState().blockchain
    let gov = storage.get("contractAddress");
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
            // create new entry in mongo
            axios
                .post("http://localhost:4000/user", {
                username: hotelName,
                publicAddress: owner,
                type: "HOTEL",
                contractAddress: result.receipt.logs[0].address,
                }).then((response)=>{
                    console.log('successfully created hotel entity: ', response.data)
                    dispatch({
                        type: CREATE_HOTEL,
                        payload: {
                            government: gov,
                            hotelAddress: address
                        }
                    })
                })
        }).catch(error => {
            console.log(error)
        })
    }).catch(function (error) {
        console.log(error)
    })
}