const TokenBalanceReader = artifacts.require("TokenBalanceReader");

module.exports = function (deployer) {
  deployer.deploy(TokenBalanceReader);
};
