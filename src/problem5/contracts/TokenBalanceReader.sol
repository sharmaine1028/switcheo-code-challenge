// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract TokenBalanceReader {
    struct TokenBalance {
        address token;
        uint256 balance;
    }

    function getBalances(address userAddress, address[] memory tokenAddresses) public view returns (TokenBalance[] memory) {
        TokenBalance[] memory balances = new TokenBalance[](tokenAddresses.length);
        for (uint i = 0; i < tokenAddresses.length; i++) {
            IERC20 token = IERC20(tokenAddresses[i]);
            uint256 balance = token.balanceOf(userAddress);
            TokenBalance memory newBalance = TokenBalance(tokenAddresses[i], balance);
            balances[i] = newBalance;
        }
        return balances;
    }
}