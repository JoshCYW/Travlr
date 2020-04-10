import Web3 from 'web3'
import { TRAVLR_ABI, TRAVLR_ADDRESS } from '../config'
import { GOVT_ABI } from '../govtConfig';
import { PASSPORT_ABI } from '../ethPassportConfig'

import { LOAD_BLOCKCHAIN_DATA, PRELOAD_GOVERNMENT } from '../constants';

var TruffleContract = require('@truffle/contract')

export const loadBlockChainData = () => async (dispatch) => {
    const web3 = new Web3("http://localhost:8545");
    let accounts = await web3.eth.getAccounts();
    var provider = new Web3.providers.HttpProvider("http://localhost:8545");
    var travlrTruffleInstance = TruffleContract({ abi: TRAVLR_ABI });
    var govtTruffleInstance = TruffleContract({ abi: GOVT_ABI });
    var ethPassportTruffleInstance = TruffleContract({ abi: PASSPORT_ABI });

    travlrTruffleInstance.setProvider(provider);
    govtTruffleInstance.setProvider(provider);
    ethPassportTruffleInstance.setProvider(provider)


    const payload = {};
    payload['accounts'] = accounts;
    payload['travlrTruffleInstance'] = travlrTruffleInstance;
    payload['govtTruffleInstance'] = govtTruffleInstance;
    payload['ethPassportTruffleInstance'] = ethPassportTruffleInstance;

    // Initialize 2 Governments: Singapore and United States with their respective caller IDs
    // Store Respective Contract Addresses in store

    const createSgGov = new Promise(function (resolve, reject) {
        travlrTruffleInstance.at(TRAVLR_ADDRESS).then(instance => {
            console.log(instance)
            return instance.assignGovernment(accounts[1], 65, {
                from: accounts[0]
            })
        }).then(result => {
            var address = result.receipt.logs[0].address
            console.log('address: ', address)
            resolve(address)
        }).catch(function (error) {
            reject(error)
        })
    })

    const createUsGov = new Promise(function (resolve, reject) {
        travlrTruffleInstance.at(TRAVLR_ADDRESS).then(instance => {
            console.log(instance)
            return instance.assignGovernment(accounts[2], 1, {
                from: accounts[0]
            })
        }).then(result => {
            var address = result.receipt.logs[0].address
            console.log('address: ', address)
            resolve(address)
        }).catch(function (error) {
            reject(error)
        })
    })


    Promise.all([createSgGov, createUsGov]).then(function (values) {
        console.log(values)
        let mapping = {}
        for (let i = 1; i <= values.length; i++) {
            mapping[values[i - 1]] = accounts[i]
        }
        dispatch({
            type: PRELOAD_GOVERNMENT,
            payload: {
                governments: values,
                mapping
            }
        })
    })

    dispatch({
        type: LOAD_BLOCKCHAIN_DATA,
        payload: payload,
    });
}

// GovtTruffleInstance.at(result.receipt.logs[0].address).then(instance => {
//     console.log(instance)
//     return instance.getGovernmentOwner({
//         from: accounts[1]
//     })
// }).then(result => {
//     console.log(result)
// })
