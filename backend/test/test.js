const Travlr = artifacts.require('Travlr');
const Government = artifacts.require('Government');
const Hotel = artifacts.require('Hotel');
const Immigration = artifacts.require('Immigration');
const EthPassport = artifacts.require('EthPassport');

contract('Travlr', function(accounts) {
    let _travlrAdmin = accounts[0];
    let travlrContract;
    let _govt1 = accounts[1];
    let govtContract1;
    let singaporeCC = 65;
    let _govt2 = accounts[2];
    let govtContract2;
    let malaysiaCC = 60;

    let _hotel1_1 = accounts[3];
    let hotelContract1_1;
    let _hotel1_2 = accounts[4];
    let hotelContract1_2;
    let _hotel2_1 = accounts[5];
    let hotelContract2_1;
    let _hotel2_2 = accounts[6];
    let hotelContract2_2;
    let hotelName = "testHotel";
    let lat = 11111;
    let long = 22222

    let _immi1_1 = accounts[7];
    let immiContract1_1;
    let _immi2_1 = accounts[8];
    let immiContract2_1;
    let immiName = "testImmi";


    let _ethP1_1
    let _ethP1_2
    let _ethP2_1
    let _ethP2_2
    let passportId1_1 = "PASS1_1";
    let passportId1_2 = "PASS1_2";
    let passportId2_1 = "PASS2_1";
    let passportId2_2 = "PASS2_2";

    it('Deploy travlr', async () => {
        //Deploy travlr instance
        console.log("Account [0] _travlrAdmin: " + _travlrAdmin);
        travlrContract = await Travlr.deployed();
        console.log("Travlr Owner: " + await travlrContract.owner());
        console.log("Travlr contract address: " + travlrContract.address);
        //travlrContract exist and owner & account[0] are matching
        assert.notEqual(travlrContract, '', "travlrContract does not exist");
        assert.equal(await travlrContract.owner(), _travlrAdmin, "travleContract owners does not match _travlrAdmin");
    });

    it('Assign government1', async () => {
        //assign government 1
        console.log("Account [1] _govt1: " + _govt1);
        govt1Log = await travlrContract.assignGovernment(_govt1,singaporeCC, {from: _travlrAdmin});
        //load Government Contract
        govtContract1 = await Government.at(govt1Log.receipt.logs[1].address);
        console.log("govtContract1 owner: " + await govtContract1.owner());
        console.log("govtContract1: " + govtContract1.address);
        //assert
        assert.notEqual(govtContract1, '', "govtContract1 does not exist");
        assert.equal(await govtContract1.owner() , _govt1, "govtContract1 owners does not match _govt1");

    });
    it('Assign government2', async () => {
        
        //assign government 2
        console.log("Account [2] _govt2: " + _govt2);
        govt2Log = await travlrContract.assignGovernment(_govt2,malaysiaCC, {from: _travlrAdmin});
        //load government Contract
        govtContract2 = await Government.at(govt2Log.receipt.logs[1].address);
        console.log("govtContract2 owner: " + await govtContract1.owner());
        console.log("govtContract2: " + govtContract2);
        //assert
        assert.notEqual(govtContract2, '', "govtContract2 does not exist");
        assert.equal(await govtContract2.owner() , _govt2, "govtContract2 owners does not match _govt1");
    });

    it('Assign hotel1_1' , async () => {
        console.log("Account [3] _hotel1_1: " + _hotel1_1);
        hotel1_1log = await govtContract1.assignHotel(_hotel1_1,hotelName,lat,long, {from: _govt1});
        hotelContract1_1 = await Hotel.at(hotel1_1log.receipt.logs[1].address);
        console.log("hotelContract1_1 owner: " + await hotelContract1_1.owner());
        console.log("hotelContract1_1: " + hotelContract1_1.address);
        assert.notEqual(hotelContract1_1, '', "hotelContract1_1 does not exist");
        assert.equal(await hotelContract1_1.owner() , _hotel1_1, "hotelContract1_1 owners does not match _hotel1_1");
    });
    it('Assign hotel1_2' , async () => {
        console.log("Account [4] _hotel1_2: " + _hotel1_2);
        hotel1_2log = await govtContract1.assignHotel(_hotel1_2,hotelName,lat,long, {from: _govt1});
        hotelContract1_2 = await Hotel.at(hotel1_2log.receipt.logs[1].address);
        console.log("hotelContract1_2 owner: " + await hotelContract1_2.owner());
        console.log("hotelContract1_2: " + hotelContract1_2.address);
        assert.notEqual(hotelContract1_2, '', "hotelContract1_2 does not exist");
        assert.equal(await hotelContract1_2.owner() , _hotel1_2, "hotelContract1_2 owners does not match _hotel1_2");
    });
    it('Assign hotel2_1' , async () => {
        console.log("Account [5] _hotel2_1: " + _hotel2_1);
        hotel2_1log = await govtContract2.assignHotel(_hotel2_1,hotelName,lat,long, {from: _govt2});
        hotelContract2_1 = await Hotel.at(hotel2_1log.receipt.logs[1].address);
        console.log("hotelContract2_1 owner: " + await hotelContract2_1.owner());
        console.log("hotelContract2_1: " + hotelContract2_1.address);
        assert.notEqual(hotelContract2_1, '', "hotelContract2_1 does not exist");
        assert.equal(await hotelContract2_1.owner() , _hotel2_1, "hotelContract2_1 owners does not match _hotel2_1");
    });
    it('Assign hotel2_2' , async () => {
        console.log("Account [6] _hotel2_2: " + _hotel2_2);
        hotel2_2log = await govtContract2.assignHotel(_hotel2_2,hotelName,lat,long, {from: _govt2});
        hotelContract2_2 = await Hotel.at(hotel2_2log.receipt.logs[1].address);
        console.log("hotelContract2_2 owner: " + await hotelContract2_2.owner());
        console.log("hotelContract2_2: " + hotelContract2_2.address);
        assert.notEqual(hotelContract2_2, '', "hotelContract2_2 does not exist");
        assert.equal(await hotelContract2_2.owner() , _hotel2_2, "hotelContract2_2 owners does not match _hotel2_2");
    });

    it('Assign immi1_1' , async () => {
        console.log("Account [7] _immi1_1: " + _immi1_1);
        immi1_1log = await govtContract1.assignImmmigration(_immi1_1,immiName,lat,long, {from: _govt1});
        immiContract1_1 = await Immigration.at(immi1_1log.receipt.logs[1].address);
        console.log("immiContract1_1 owner: " + await immiContract1_1.owner());
        console.log("immiContract1_1: " + immiContract1_1.address);
        assert.notEqual(immiContract1_1, '', "immiContract1_1 does not exist");
        assert.equal(await immiContract1_1.owner() , _immi1_1, "immiContract1_1 owners does not match _immi1_1");
    });
    it('Assign immi2_1' , async () => {
        console.log("Account [8] _immi2_1: " + _immi2_1);
        immi2_1log = await govtContract2.assignImmmigration(_immi2_1,immiName,lat,long, {from: _govt2});
        immiContract2_1 = await Immigration.at(immi2_1log.receipt.logs[1].address);
        console.log("immiContract2_1 owner: " + await immiContract2_1.owner());
        console.log("immiContract2_1: " + immiContract2_1.address);
        assert.notEqual(immiContract2_1, '', "immiContract2_1 does not exist");
        assert.equal(await immiContract2_1.owner() , _immi2_1, "immiContract2_1 owners does not match _immi2_1");
    });

    it('Create ethP1_1', async () => {
        eth1_1log = await govtContract1.createEthPassport(govtContract1.address, passportId1_1, {from:_govt1});
        ethP1_1 = await EthPassport.at(eth1_1log.receipt.logs[1].address);
        assert.notEqual(ethP1_1, '', "ethP1_1 does not exist");
    });
    it('Create ethP1_2', async () => {
        eth1_2log = await govtContract1.createEthPassport(govtContract1.address, passportId1_2, {from:_govt1});
        ethP1_2 = await EthPassport.at(eth1_2log.receipt.logs[1].address);
        assert.notEqual(ethP1_2, '', "ethP1_2 does not exist");
    });
    it('Create ethP2_1', async () => {
        eth2_1log = await govtContract2.createEthPassport(govtContract2.address, passportId2_1, {from:_govt2});
        ethP2_1 = await EthPassport.at(eth2_1log.receipt.logs[1].address);
        assert.notEqual(ethP2_1, '', "ethP2_1 does not exist");
    });
    it('Create ethP2_2', async () => {
        eth2_2log = await govtContract2.createEthPassport(govtContract2.address, passportId2_1, {from:_govt2});
        ethP2_2 = await EthPassport.at(eth2_2log.receipt.logs[1].address);
        assert.notEqual(ethP2_2, '', "ethP2_2 does not exist");
    });

    it('Check Country Singapore', async () => {
        assert.equal(await govtContract1.getCountry(), singaporeCC);
        assert.equal(await hotelContract1_1.getCountry(), singaporeCC);
        assert.equal(await hotelContract1_2.getCountry(), singaporeCC);
        assert.equal(await immiContract1_1.getCountry({from: _immi1_1}), singaporeCC);
        assert.equal(await ethP1_1.getCountry(), singaporeCC);
        assert.equal(await ethP1_2.getCountry(), singaporeCC);
    });

    it('Check Country Malaysia', async () => {
        assert.equal(await govtContract2.getCountry(), malaysiaCC);
        assert.equal(await hotelContract2_1.getCountry(), malaysiaCC);
        assert.equal(await hotelContract2_2.getCountry(), malaysiaCC);
        assert.equal(await immiContract2_1.getCountry({from: _immi2_1}), malaysiaCC);
        assert.equal(await ethP2_1.getCountry(), malaysiaCC);
        assert.equal(await ethP2_2.getCountry(), malaysiaCC);
    });

    it('Healthy passport entering country', async () => {
        assert.equal((await immiContract1_1.isHealthy(ethP1_1.address)).receipt.status, true);
        assert.equal((await immiContract1_1.isHealthy(ethP1_2.address)).receipt.status, true);
        assert.equal((await immiContract1_1.isHealthy(ethP2_1.address)).receipt.status, true);
        assert.equal((await immiContract1_1.isHealthy(ethP2_2.address)).receipt.status, true);

        await immiContract1_1.updateEthPassport(ethP1_1.address, 0, 360, {from:_immi1_1});
        await immiContract1_1.updateEthPassport(ethP1_2.address, 0, 360, {from:_immi1_1});
        await immiContract1_1.updateEthPassport(ethP2_1.address, 0, 360, {from:_immi1_1});
        await immiContract1_1.updateEthPassport(ethP2_1.address, 0, 360, {from:_immi1_1});

    });

})


