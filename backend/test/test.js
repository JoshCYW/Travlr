const Travlr = artifacts.require('Travlr');
const Government = artifacts.require('Government');
const Hotel = artifacts.require('Hotel');
const Immigration = artifacts.require('Immigration');
const EthPassport = artifacts.require('EthPassport');

contract('Travlr', function(accounts) {
    let _sggovt = accounts[2];
    let travlrOwner;
    let travlrInstance;
    let governmentAddress;
    let governmentInstance;


    it('Deploy travlr', async () => {
        travlrInstance = await Travlr.deployed();
        travlrOwner = await travlrInstance.owner();
        console.log("This is account 0: " + accounts[0])
        console.log("Travlr Owner: " + travlrOwner);
        console.log("Travlr contract address: " + travlrInstance.address)
        console.log("SG govt: " + _sggovt);
        assert(travlrInstance.address !== '')
    });

    it('Assign government', async () => {
        governmentAddress = await travlrInstance.assignGovernment(_sggovt,65, {
            from: travlrOwner});
        console.log(governmentAddress);
        assert(governmentAddress !== '')

    });


})


