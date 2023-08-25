// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;
// call type
// 00 -> single
// 01 -> batch

struct UserOp {
    uint256 functionType;
    bytes argument;
    uint256 nonce;
    bytes signature;
}

library UserOpLib {
    /**
     * Pack the user operation data into bytes for hashing.
     * @param userop - The user operation data.
     */
    function pack(
        UserOp calldata userop
    ) internal pure returns (bytes memory ret) {
        uint256 functionType = userop.functionType;
        bytes32 hashArguments = calldataKeccak(userop.argument);
        uint256 nonce = userop.nonce;

        return abi.encode(functionType, hashArguments, nonce);
    }

    /**
     * Hash the user operation data.
     * @param userop - The user operation data.
     */
    function hash(UserOp calldata userop) internal pure returns (bytes32) {
        return keccak256(pack(userop));
    }

    /**
     * keccak function over calldata.
     * @dev copy calldata into memory, do keccak and drop allocated memory. Strangely, this is more efficient than letting solidity do it.
     */
    function calldataKeccak(
        bytes calldata data
    ) public pure returns (bytes32 ret) {
        assembly {
            let mem := mload(0x40)
            let len := data.length
            calldatacopy(mem, data.offset, len)
            ret := keccak256(mem, len)
        }
    }
}
