pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

import "./Travlr.sol";
import "./EthPassport.sol";
import "./Hotel.sol";
import "./Immigration.sol";


//add ownable to get the info from parent class
contract Government is Ownable {
  Travlr public travlr; //parent class
  uint16 country; //Country code uint16 (e.g; SG = 65)

  event log(address logaddress);
  
  address governmentOwner;
  //init government
  constructor(uint16 _country) public {
    //makes parent the first owner who created the contract not new owner who took over contract
    travlr = Travlr(owner());
    country = _country;
    governmentOwner = msg.sender;
  }
  
  function createEthPassport(address _ethPassportOwnerAddress) public onlyOwner returns (address) {
    //Create ethPassport contract with constructor variables
    EthPassport ethPassport = new EthPassport();
    ethPassport.transferOwnership(_ethPassportOwnerAddress);
    //add the contract to the role
    travlr.addEthPassportRole(address(ethPassport));
    emit log(address(ethPassport));
    //returns government contract address
    return address(ethPassport);
  }
  
  function assignHotel(address _hotelOwnerAddress) public onlyOwner returns (address) {
    //Create hotel contract with constructor variables
    Hotel hotel = new Hotel();
    hotel.transferOwnership(_hotelOwnerAddress);
    //add the contract to the role
    travlr.addHotelRole(address(hotel));
    emit log(address(hotel));
    return address(hotel); //returns hotel contract address
  }
  
  function assignImmmigration(address _immigrationOwnerAddress) public onlyOwner returns (address) {
    //Create immigration contract with constructor variables
    Immigration immigration = new Immigration();
    immigration.transferOwnership(_immigrationOwnerAddress);
    //add the contract to the role
    travlr.addImmigrationRole(address(immigration));
    emit log(address(immigration));
    return address(immigration); //returns immigration contract address
  }
  
  function getTravelHistoryWithId(address _ethPassportAddress, uint _id) public onlyOwner returns (uint,uint,EthPassport.Direction,uint,address){
    EthPassport ethPassport = EthPassport(_ethPassportAddress);
    return ethPassport.getTravelHistoryWithId(_id);
  }
  
  function getHeadId(address _ethPassportAddress) public onlyOwner view returns (uint) {
    EthPassport ethPassport = EthPassport(_ethPassportAddress);
    return ethPassport.getHeadId();
  }
  
  //getters
  function getParentAddress() public view returns (address) {
    return address(travlr);
  }
  
  function getCountry() public view returns (uint16) {
    return country;
  }
  
  function getGovernmentOwner() public view returns (address) {
    return governmentOwner;
  }
  
  function ethPassportHasRole(address _addressToCheck) public view returns (bool){
    return travlr.ethPassportHasRole(_addressToCheck);
  }
  
  function hotelHasRole(address _addressToCheck) public view returns (bool){
    return travlr.hotelHasRole(_addressToCheck);
  }
  
  function immigrationHasRole(address _addressToCheck) public view returns (bool){
    return travlr.immigrationHasRole(_addressToCheck);
  }
  
  function governmentHasRole(address _addressToCheck) public view returns (bool){
    return travlr.governmentHasRole(_addressToCheck);
  }

}