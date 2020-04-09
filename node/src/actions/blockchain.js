import Web3 from 'web3'
import { TRAVLR_ABI } from '../config'
import { GOVT_ABI } from '../govtConfig';

const LOAD_BLOCKCHAIN_DATA = 'LOAD_BLOCKCHAIN_DATA';

var TruffleContract = require('@truffle/contract')

export const loadBlockChainData = () => async (dispatch) => {
    const web3 = new Web3("http://localhost:8545");
    let accounts = await web3.eth.getAccounts();
    var provider = new Web3.providers.HttpProvider("http://localhost:8545");
    var travlrTruffleInstance = TruffleContract({ abi: TRAVLR_ABI });
    var govtTruffleInstance = TruffleContract({ abi: GOVT_ABI });
    travlrTruffleInstance.setProvider(provider);
    govtTruffleInstance.setProvider(provider);
    const payload = {};
    payload['accounts'] = accounts;
    payload['travlrTruffleInstance'] = travlrTruffleInstance;
    payload['govtTruffleInstance'] = govtTruffleInstance;
    dispatch({
        type: LOAD_BLOCKCHAIN_DATA,
        payload: payload,
    });
}

export default {
    LOAD_BLOCKCHAIN_DATA
};
