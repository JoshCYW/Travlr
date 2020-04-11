const EthPassport = artifacts.require("EthPassport");
const Government = artifacts.require("Government");
const Immigration = artifacts.require("Immigration");
const Hotel = artifacts.require("Hotel");
const Travlr = artifacts.require("Travlr");

module.exports = function (deployer, network, accounts) {
  let travlrInstance;
  // let governmentInstance;
  // let ethPassportInstance;
  // let immigrationInstance;
  // let hotelInstance;

  return deployer
    .then(() => {
      return deployer.deploy(Travlr, { from: accounts[0] });
    }).then((_inst) => {
      travlrInstance = _inst;
      console.log("Travlr contract at address = " + travlrInstance.address);
    });

  // return deployer
  //   .then(() => {
  //       return deployer.deploy(Travlr, {from: accounts[0]});
  //   }).then((_inst) => {
  //       travlrInstance = _inst;
  //       console.log("Travlr contract at address = " + travlrInstance.address);
  //       return deployer.deploy(Government, 65, {from: accounts[1]}); //65 = country code
  //   }).then((_inst) => {
  //       governmentInstance = _inst;
  //       console.log("Government contract at address = " + governmentInstance.address);
  //       return deployer.deploy(EthPassport, {from: accounts[2]});
  //   }).then((_inst)=>{
  //       ethPassportInstance = _inst;
  //       console.log("EthPassport contract at address = " + ethPassportInstance.address);
  //       return deployer.deploy(Immigration, {from: accounts[3]});
  //   }).then((_inst)=>{
  //       immigrationInstance = _inst;
  //       console.log("Immigration contract at address = " + immigrationInstance.address);
  //       return deployer.deploy(Hotel, {from: accounts[4]});
  //   }).then((_inst)=>{
  //       hotelInstance = _inst;
  //       console.log("Hotel contract at address = " + hotelInstance.address);
  //   });
};

