pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/access/Roles.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "./Government.sol";
//Traceroute 1..* Goverment 1..* _ethPassport

contract Travlr is Ownable {
  using Roles for Roles.Role;
  Roles.Role internal _government;
  Roles.Role internal _ethPassport;
  Roles.Role internal _immigration;
  Roles.Role internal _hotel;
  uint16 public check;
  
  event log(address logaddress);
  
  address travlrOwner;
  constructor() public {
      travlrOwner = msg.sender;
      check = 1;
  }

  function assignGovernment(address _govtOwnerAddress, uint16 _country ) public onlyOwner returns (address) {
    //Create government contract with constructor variables
    Government government = new Government(_country);
    government.transferOwnership(_govtOwnerAddress);
    //add the contract to the role
    _government.add(address(government));
    emit log(address(government));
    //returns government contract address
    return address(government);
  }
  
  function addEthPassportRole(address _ethPassportAddress) public onlyGovernment {
    _ethPassport.add(_ethPassportAddress);
  }
  
  function addHotelRole(address _hotelOwnerAddress) public onlyGovernment {
    _hotel.add(_hotelOwnerAddress);
  }
  
  function addImmigrationRole(address _immigrationOwnerAddress) public onlyGovernment {
    _immigration.add(_immigrationOwnerAddress);
  }
  
  function addHotel(address _hotelAddress) public onlyGovernment {
    _hotel.add(_hotelAddress);
  }
  
  function checkVal() public view returns (uint16){ 
      return check; 
  } 
  
  function governmentHasRole(address _addressToCheck) public view returns (bool){
      return _government.has(_addressToCheck);
  }
  
  function ethPassportHasRole(address _addressToCheck) public view returns (bool){
      return _ethPassport.has(_addressToCheck);
  }
  
  function hotelHasRole(address _addressToCheck) public view returns (bool){
      return _hotel.has(_addressToCheck);
  }
  
  function immigrationHasRole(address _addressToCheck) public view returns (bool){
      return _immigration.has(_addressToCheck);
  }
  
  modifier onlyGovernment() {
      require(_government.has(msg.sender),"Requires Government Role");
      _;
  }
}