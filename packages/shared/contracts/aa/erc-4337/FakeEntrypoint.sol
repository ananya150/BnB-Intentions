// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import './utils/UserOp.sol';
import "./utils/Exec.sol";
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@account-abstraction/contracts/interfaces/IAccount.sol';

contract FakeEntrypoint {

    using UserOperationLib for UserOperation;


    // gets the userOp hash
    function getUserOpHash(
        UserOperation calldata userOp
    ) public view returns (bytes32) {
        return
            keccak256(abi.encode(userOp.hash(), address(this), block.chainid));
    }


    function executeUserOp(UserOperation calldata userOp) nonReentrant public {

        require(msg.sender !== address(this), "AA: Self Call");

        address sender = userOp.sender;
        bytes32 userOpHash = getUserOpHash(userOp);

        // validate signature

        try IAccount(sender).validateUserOp(userOp, userOpHash, 0)
        returns (uint256 _validationData) {
            if (_validationData != 0 , "AA: Sig verification failed");
        } catch Error(string memory revertReason) {
            revert FailedOp(opIndex, string.concat("AA23 reverted: ", revertReason));
        } catch {
            revert FailedOp(opIndex, "AA23 reverted (or OOG)");
        }

        // execute transaction        
        if(userOp.callData.length > 0){
            bool success = Exec.call(sender, 0, callData, userOp.callGasLimit);
            if (!success) {
                bytes memory result = Exec.getReturnData(REVERT_REASON_MAX_LEN);
                if (result.length > 0) {
                    emit UserOperationRevertReason(userOpHash, sender, userOp.nonce, result);
                }
            }

        }
    }

}