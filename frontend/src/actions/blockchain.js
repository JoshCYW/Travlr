import Web3 from 'web3'
import { TRAVLR_ABI, TRAVLR_ADDRESS } from '../config'
import { GOVT_ABI } from '../govtConfig';
import { PASSPORT_ABI } from '../ethPassportConfig'
import { IMMIGRATION_ABI } from '../immigrationConfig'

import { LOAD_BLOCKCHAIN_DATA, PRELOAD_GOVERNMENT } from '../constants';
import { HOTEL_ABI } from '../hotelConfig';

var TruffleContract = require('@truffle/contract')

export const loadBlockChainData = () => async (dispatch) => {
    const web3 = new Web3("http://localhost:8545");
    let accounts = await web3.eth.getAccounts();
    var provider = new Web3.providers.HttpProvider("http://localhost:8545");
    var travlrTruffleInstance = TruffleContract({ abi: TRAVLR_ABI });
    var govtTruffleInstance = TruffleContract({ abi: GOVT_ABI });
    var ethPassportTruffleInstance = TruffleContract({ abi: PASSPORT_ABI });
    var immigrationTruffleInstance = TruffleContract({ abi: IMMIGRATION_ABI });
    var hotelTruffleInstance = TruffleContract({ abi: HOTEL_ABI });

    travlrTruffleInstance.setProvider(provider);
    govtTruffleInstance.setProvider(provider);
    ethPassportTruffleInstance.setProvider(provider)
    immigrationTruffleInstance.setProvider(provider)
    hotelTruffleInstance.setProvider(provider)

    const payload = {};
    payload['accounts'] = accounts;
    payload['travlrTruffleInstance'] = travlrTruffleInstance;
    payload['govtTruffleInstance'] = govtTruffleInstance;
    payload['ethPassportTruffleInstance'] = ethPassportTruffleInstance;
    payload['immigrationTruffleInstance'] = immigrationTruffleInstance;
    payload['hotelTruffleInstance'] = hotelTruffleInstance;

    dispatch({
        type: LOAD_BLOCKCHAIN_DATA,
        payload: payload,
    });
}