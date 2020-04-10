const Travlr = artifacts.require('Travlr');
const Government = artifacts.require('Government');
const Hotel = artifacts.require('Hotel');
const Immigration = artifacts.require('Immigration');
const EthPassport = artifacts.require('EthPassport');

contract('Travlr', function(accounts) {
    let _travlrOwner = accounts[0];
    let _sggovt = accounts[1];
    let travlrInstance;
    let governmentAddress;


    it('Deploy travlr', async () => {
        travlrInstance = await Travlr.deployed();
        console.log("Travlr contract address: "+ travlrInstance.address);
        console.log(travlrInstance.checkOwner());
        console.log(_sggovt);
        assert(travlrInstance.address !== '')
    });
    //
    // it('Assign government', async () => {
    //     governmentAddress = await travlrInstance.assignGovernment(_sggovt,65, {
    //         from: travlrInstance.travlrOwner});
    //     console.log(governmentAddress);
    //     assert(governmentAddress !== '')
    //
    // });

})


