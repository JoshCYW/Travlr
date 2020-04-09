pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/access/Roles.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

import "./Travlr.sol";
import "./Government.sol";
import "./EthPassport.sol";

contract Hotel is Ownable {
  Government public government;
  string hotelName;
  uint256 lat;
  uint256 long;
  address hotelOwner;
  
  constructor (string memory _hotelName, uint256 _lat, uint256 _long) public {
    //makes parent the first owner who created the contract not new owner who took over contract
    government = Government(owner());
    hotelName = _hotelName;
    lat = _lat;
    long = _long;
    hotelOwner = msg.sender;
  }
  
  function getParentAddress() public view returns (address) {
    return address(government);
  }
  
  function getCountry() public view returns (uint16){
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