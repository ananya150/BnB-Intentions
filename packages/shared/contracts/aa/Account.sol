// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.19;

import "./utils/UserOp.sol";
import "./utils/Secp256r1.sol";
import "./utils/Base64.sol";

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Account is Initializable {
    using UserOpLib for UserOp;
    using ECDSA for bytes32;

    address addressOwner;
    PassKeyId passKeyOwner;

    bool isPassKeyOwnerEnabled;

    uint256 nonce;

    constructor() {
        _disableInitializers();
    }

    // getter functions
    function getAddressOwner() public view returns (address) {
        return addressOwner;
    }

    function getPassKeyOwner() public view returns (PassKeyId memory) {
        return passKeyOwner;
    }

    function passKeyOwnerEnabled() public view returns (bool) {
        return isPassKeyOwnerEnabled;
    }

    function changeOwnershipToAddress(bytes memory argument) private {
        require(
            isPassKeyOwnerEnabled == true,
            "Account: Already address owner enabled"
        );
        // address newOwner = abi.decode(argument, (address));
        address newOwner;
        assembly {
            newOwner := mload(add(argument, 20))
        }
        _changePassKeyOwner(PassKeyId(0, 0, ""));
        _changeAddressOwner(newOwner);
        isPassKeyOwnerEnabled = false;
    }

    function changeOwnershipToPassKeyAddress(bytes memory argument) private {
        require(
            isPassKeyOwnerEnabled == false,
            "Account: Already passkey owner enabled"
        );
        (uint256 pubKeyX, uint256 pubKeyY, string memory keyId) = abi.decode(
            argument,
            (uint256, uint256, string)
        );
        PassKeyId memory newOwner = PassKeyId(pubKeyX, pubKeyY, keyId);
        _changeAddressOwner(address(0));
        _changePassKeyOwner(newOwner);
        isPassKeyOwnerEnabled = true;
    }

    // internal functions to change owners
    function _changePassKeyOwner(PassKeyId memory newOwner) private {
        passKeyOwner = newOwner;
    }

    function _changeAddressOwner(address newOwner) private {
        addressOwner = newOwner;
    }

    function initialize(PassKeyId memory anOwner) public virtual initializer {
        isPassKeyOwnerEnabled = true;
        _initialize(anOwner);
    }

    function _initialize(PassKeyId memory anOwner) internal virtual {
        passKeyOwner = anOwner;
    }

    // Main entry point for external callers

    function entrypoint(UserOp calldata userop) public {
        // validate userop signature
        uint256 sigVerification = _validateUserOp(userop);
        require(sigVerification == 0, "Account: Signature verification failed");
        // validate nonce
        uint256 nonceVerification = _validateNonce(userop);
        require(nonceVerification == 0, "Account: Nonce verification failed");
        // execute
        if (userop.functionType == 0) {
            execute(userop.argument);
            return;
        }
        if (userop.functionType == 1) {
            executeBatch(userop.argument);
            return;
        }
        if (userop.functionType == 2) {
            changeOwnershipToAddress(userop.argument);
            return;
        }
        if (userop.functionType == 3) {
            changeOwnershipToPassKeyAddress(userop.argument);
            return;
        }
    }

    /**
     * execute a transaction (called directly from owner, or by entryPoint)
     */
    function execute(bytes memory argument) private {
        (address dest, uint256 value, bytes memory func) = abi.decode(
            argument,
            (address, uint256, bytes)
        );
        _call(dest, value, func);
    }

    /**
     * execute a sequence of transactions
     * @dev to reduce gas consumption for trivial case (no value), use a zero-length array to mean zero value
     */
    function executeBatch(bytes memory argument) private {
        (
            address[] memory dest,
            uint256[] memory value,
            bytes[] memory func
        ) = abi.decode(argument, (address[], uint256[], bytes[]));
        require(
            dest.length == func.length &&
                (value.length == 0 || value.length == func.length),
            "wrong array lengths"
        );
        if (value.length == 0) {
            for (uint256 i = 0; i < dest.length; i++) {
                _call(dest[i], 0, func[i]);
            }
        } else {
            for (uint256 i = 0; i < dest.length; i++) {
                _call(dest[i], value[i], func[i]);
            }
        }
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    // internal function to validate userop signature
    function _validateUserOp(
        UserOp calldata userop
    ) internal view returns (uint256) {
        bytes32 userOpHash = getUserOpHash(userop);
        if (isPassKeyOwnerEnabled) {
            bool isSigValid = validatePassKeySig(
                userop.signature,
                userOpHash,
                passKeyOwner
            );
            if (!isSigValid) return 1;
            return 0;
        } else {
            bytes32 hash = userOpHash.toEthSignedMessageHash();
            if (addressOwner != hash.recover(userop.signature)) return 1;
            return 0;
        }
    }

    // internal function to validate nonce
    function _validateNonce(
        UserOp calldata userop
    ) internal view returns (uint256) {
        if (userop.nonce == nonce) return 0;
        return 1;
    }

    function validatePassKeySig(
        bytes memory signature,
        bytes32 execHash,
        PassKeyId memory passkey
    ) internal view returns (bool) {
        (
            bytes32 keyHash,
            uint256 sigx,
            uint256 sigy,
            bytes memory authenticatorData,
            string memory clientDataJSONPre,
            string memory clientDataJSONPost
        ) = abi.decode(
                signature,
                (bytes32, uint256, uint256, bytes, string, string)
            );

        string memory execHashBase64 = Base64.encode(bytes.concat(execHash));
        string memory clientDataJSON = string.concat(
            clientDataJSONPre,
            execHashBase64,
            clientDataJSONPost
        );
        bytes32 clientHash = sha256(bytes(clientDataJSON));
        bytes32 sigHash = sha256(bytes.concat(authenticatorData, clientHash));

        require(passkey.pubKeyY != 0 && passkey.pubKeyY != 0, "Key not found");
        bool isSigValid = Secp256r1.Verify(
            passkey,
            sigx,
            sigy,
            uint256(sigHash)
        );
        return isSigValid;
    }

    // gets the userOp hash
    function getUserOpHash(
        UserOp calldata userop
    ) public view returns (bytes32) {
        return
            keccak256(abi.encode(userop.hash(), address(this), block.chainid));
    }
}
