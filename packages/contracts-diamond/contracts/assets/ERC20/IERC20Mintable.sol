// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20Mintable {
    /**
     * @notice Must have `mint.selector` role
     * @dev Allows `mint.selector` to mint tokens
     * @param account address to
     * @param value value to mint
     */
    function mint(address account, uint256 value) external;

    /**
     * @notice Must have `mint.selector` role
     * @dev Allows `mint.selector` to mint tokens
     * @param accounts accounts to mint
     * @param values value to mint
     */
    function mintBatch(address[] memory accounts, uint256[] memory values) external;
}
