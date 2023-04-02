// How to create transaction
// https://trufflesuite.com/docs/truffle/how-to/contracts/interact-with-your-contracts/

let accounts = await web3.eth.getAccounts();

let instance1 = await HelloCoin.deployed();
let tokenaddr1 = instance1.address;
let res1 = await instance1.sendCoin(accounts[1], 10, { from: accounts[0] });

let instance2 = await HelloCoin.new();
let tokenaddr2 = instance2.address;
let res2 = await instance2.sendCoin(accounts[1], 10, { from: accounts[0] });

let tokenaddrs = [tokenaddr1, tokenaddr2];
let wallet = accounts[0];

let reader = await TokenBalanceReader.deployed();
reader.getBalances(wallet, tokenaddrs);
