// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "./Account.sol";
import "./utils/Secp256r1.sol";

contract AccountFactory {
    Account public immutable accountImplementation;

    constructor() {
        accountImplementation = new Account();
    }

    /**
     * create an account, and return its address.
     * returns the address even if the account is already deployed.
     * Note that during UserOperation execution, this method is called only if the account is not deployed.
     * This method returns an existing account address so that entryPoint.getSenderAddress() would work even after account creation
     */
    function createAccount(
        uint256 pubKeyX,
        uint256 pubKeyY,
        string memory keyId,
        uint256 salt
    ) public returns (Account ret) {
        PassKeyId memory owner = PassKeyId(pubKeyX, pubKeyY, keyId);
        address addr = getAddress(pubKeyX, pubKeyY, keyId, salt);
        uint codeSize = addr.code.length;
        if (codeSize > 0) {
            return Account(payable(addr));
        }
        ret = Account(
            payable(
                new ERC1967Proxy{salt: bytes32(salt)}(
                    address(accountImplementation),
                    abi.encodeCall(Account.initialize, (owner))
                )
            )
        );
    }

    /**
     * calculate the counterfactual address of this account as it would be returned by createAccount()
     */
    function getAddress(
        uint256 pubKeyX,
        uint256 pubKeyY,
        string memory keyId,
        uint256 salt
    ) public view returns (address) {
        PassKeyId memory owner = PassKeyId(pubKeyX, pubKeyY, keyId);

        return
            Create2.computeAddress(
                bytes32(salt),
                keccak256(
                    abi.encodePacked(
                        type(ERC1967Proxy).creationCode,
                        abi.encode(
                            address(accountImplementation),
                            abi.encodeCall(Account.initialize, (owner))
                        )
                    )
                )
            );
    }
}
