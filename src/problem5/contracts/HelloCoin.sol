// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloCoin {
  string public name = 'HelloCoin'; 
  
  string public symbol = 'hc'; 
  
  mapping (address => uint) balances; 
  
  event Transfer(address _from, address _to, uint256 _value); 
  
  constructor() { 
    //when the contract is created, the constructor will be called automatically
    balances[msg.sender] = 10000; 
    //set the balances of creator account to be 10000. Please feel free to change it to any number you want.
  }
  function sendCoin(address _receiver, uint _amount) public returns(bool sufficient) {
    if (balances[msg.sender] < _amount) return false;  
    // validate transfer
    balances[msg.sender] -= _amount;
    balances[_receiver] += _amount;
    emit Transfer(msg.sender, _receiver, _amount); 
    // complete coin transfer and call event to record the log
  return true;
  }
  function balanceOf(address _addr) public view returns(uint) { 
    //balance check
    return balances[_addr];
  }
}
