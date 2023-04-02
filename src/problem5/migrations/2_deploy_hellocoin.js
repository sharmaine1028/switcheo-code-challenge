const HelloCoin = artifacts.require("HelloCoin");
module.exports = function (deployer) {
  deployer.deploy(HelloCoin);
};
