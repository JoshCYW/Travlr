pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

import "./Travlr.sol";
import "./Government.sol";

contract EthPassport is Ownable {
    
  Government public government; //eth address assigned to passport
  bool healthy;
  string passportNum;
  uint lastUnhealthy; //timestamp of last recorded unhealthy: to track even after patient recovers

  constructor(string memory _passportNum) public {
    //makes parent the first owner who created the contract not new owner who took over contract
    government = Government(owner());
    healthy = true;
    passportNum = _passportNum;
  }
  
  enum Direction { entry, exit, checkin, checkout } //0, 1, 2, 3 respectively
    
  struct TravelHistory { //linkedlist of a EthPassport's Travel History, adds to front of linkedlist
    uint next; //next node in linked list
    uint timestamp;
    Direction direction;
    uint16 temp;
    address updatedBy;
  }
  
  uint public head; //latest record
  uint id = 0;
  mapping (uint => TravelHistory) public travelHistories;
  event UpdateTravelHistory(uint head, Direction direction, uint16 temp, address updatedBy, uint next);

  function getParentAddress() public view returns (address) {
    return address(government);
  }
  
  function getCountry() public view returns (uint16) {
    return government.getCountry();
  }
  
  function isHealthy() public view returns (bool) {
    return healthy;
  }
  
  function setHealth(bool _healthy) public onlyGovernment {
    healthy = _healthy;
    if (_healthy == false){
     lastUnhealthy = now;
    }
  }
  
  function updateTravelHistory(Direction _direction, uint16 _temp) onlyImmigrationOrHotel public { 
    TravelHistory memory travelHistory = TravelHistory(head,now,_direction,_temp, msg.sender);
    travelHistories[id] = travelHistory;
    head = id++;
    emit UpdateTravelHistory(head,travelHistory.direction, travelHistory.temp, travelHistory.updatedBy, travelHistory.next);
  }
  
  function getTravelHistoryWithId(uint _id) public onlyGovernment returns (uint,uint,Direction,uint16,address) {
    return (travelHistories[_id].next,travelHistories[_id].timestamp,travelHistories[_id].direction,travelHistories[_id].temp, travelHistories[_id].updatedBy);
  }

  function getHeadId() public onlyGovernment view returns (uint) {
    return head;
  }
  
  modifier onlyImmigrationOrHotel(){
    require(government.hotelHasRole(msg.sender)||government.immigrationHasRole(msg.sender), "Requires Immigration or Hotel Role");
    _;
  }
  
  modifier onlyGovernment() {
    require(msg.sender == government.owner(), "Requires Government Role");
    _;
  }
  
}