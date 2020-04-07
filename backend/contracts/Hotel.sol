pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/access/Roles.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

import "./Travlr.sol";
import "./Government.sol";
import "./EthPassport.sol";

contract Hotel is Ownable {
  Government public government;
  //implemented in constructor later
  uint256 lat;
  uint256 long;
  event logmessage(string logmessage);
  
  constructor () public {
    //makes parent the first owner who created the contract not new owner who took over contract
    government = Government(owner());
  }
  
  function getParentAddress() public view returns (address) {
    return address(government);
  }
  
  function getCountry() public view returns (uint16){
    return government.getCountry();
  }
  
  function updateEthPassport(address _ethPassportAddress, EthPassport.Direction _direction, uint8 _temp) public {
    EthPassport ethPassport = EthPassport(_ethPassportAddress);
    ethPassport.updateTravelHistory(_direction, _temp);
    emit logmessage("Eth Passport Updated");
  }
}