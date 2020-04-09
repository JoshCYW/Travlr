pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/access/Roles.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

import "./Travlr.sol";
import "./Government.sol";
import "./EthPassport.sol";


contract Immigration is Ownable {
  Government public government;
  string portName;
  uint256 lat;
  uint256 long;
  address immigrationOwner;
  
  constructor (string memory _portName, uint256 _lat, uint256 _long) public {
    //makes parent the first owner who created the contract not new owner who took over contract
    government = Government(owner());
    portName = _portName;
    lat = _lat;
    long = _long;
    immigrationOwner = msg.sender;
  }
  
  function getParentAddress() public onlyOwner view returns (address) {
    return address(government);
  }
  
  function getCountry() public onlyOwner view returns (uint16){
    return government.getCountry();
  }
  
  function isHealthy(address _ethPassportAddress) public returns (bool) {
    EthPassport ethPassport = EthPassport(_ethPassportAddress);
    return ethPassport.isHealthy();
  }
  
  function updateEthPassport(address _ethPassportAddress, EthPassport.Direction _direction, uint16 _temp) public onlyOwner {
    EthPassport ethPassport = EthPassport(_ethPassportAddress);
    ethPassport.updateTravelHistory(_direction, _temp);
  }
}