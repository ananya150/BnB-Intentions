/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export type UserOpStruct = {
  functionType: PromiseOrValue<BigNumberish>;
  argument: PromiseOrValue<BytesLike>;
  nonce: PromiseOrValue<BigNumberish>;
  signature: PromiseOrValue<BytesLike>;
};

export type UserOpStructOutput = [BigNumber, string, BigNumber, string] & {
  functionType: BigNumber;
  argument: string;
  nonce: BigNumber;
  signature: string;
};

export type PassKeyIdStruct = {
  pubKeyX: PromiseOrValue<BigNumberish>;
  pubKeyY: PromiseOrValue<BigNumberish>;
  keyId: PromiseOrValue<string>;
};

export type PassKeyIdStructOutput = [BigNumber, BigNumber, string] & {
  pubKeyX: BigNumber;
  pubKeyY: BigNumber;
  keyId: string;
};

export interface AccountInterface extends utils.Interface {
  functions: {
    "entrypoint((uint256,bytes,uint256,bytes))": FunctionFragment;
    "getAddressOwner()": FunctionFragment;
    "getNonce()": FunctionFragment;
    "getPassKeyOwner()": FunctionFragment;
    "getUserOpHash((uint256,bytes,uint256,bytes))": FunctionFragment;
    "initialize((uint256,uint256,string))": FunctionFragment;
    "passKeyOwnerEnabled()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "entrypoint"
      | "getAddressOwner"
      | "getNonce"
      | "getPassKeyOwner"
      | "getUserOpHash"
      | "initialize"
      | "passKeyOwnerEnabled",
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "entrypoint",
    values: [UserOpStruct],
  ): string;
  encodeFunctionData(
    functionFragment: "getAddressOwner",
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: "getNonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPassKeyOwner",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "getUserOpHash",
    values: [UserOpStruct],
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PassKeyIdStruct],
  ): string;
  encodeFunctionData(
    functionFragment: "passKeyOwnerEnabled",
    values?: undefined,
  ): string;

  decodeFunctionResult(functionFragment: "entrypoint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAddressOwner",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPassKeyOwner",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserOpHash",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "passKeyOwnerEnabled",
    data: BytesLike,
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface Account extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccountInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    entrypoint(
      userop: UserOpStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    getAddressOwner(overrides?: CallOverrides): Promise<[string]>;

    getNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPassKeyOwner(
      overrides?: CallOverrides,
    ): Promise<[PassKeyIdStructOutput]>;

    getUserOpHash(
      userop: UserOpStruct,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    initialize(
      anOwner: PassKeyIdStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    passKeyOwnerEnabled(overrides?: CallOverrides): Promise<[boolean]>;
  };

  entrypoint(
    userop: UserOpStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  getAddressOwner(overrides?: CallOverrides): Promise<string>;

  getNonce(overrides?: CallOverrides): Promise<BigNumber>;

  getPassKeyOwner(overrides?: CallOverrides): Promise<PassKeyIdStructOutput>;

  getUserOpHash(
    userop: UserOpStruct,
    overrides?: CallOverrides,
  ): Promise<string>;

  initialize(
    anOwner: PassKeyIdStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  passKeyOwnerEnabled(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    entrypoint(userop: UserOpStruct, overrides?: CallOverrides): Promise<void>;

    getAddressOwner(overrides?: CallOverrides): Promise<string>;

    getNonce(overrides?: CallOverrides): Promise<BigNumber>;

    getPassKeyOwner(overrides?: CallOverrides): Promise<PassKeyIdStructOutput>;

    getUserOpHash(
      userop: UserOpStruct,
      overrides?: CallOverrides,
    ): Promise<string>;

    initialize(
      anOwner: PassKeyIdStruct,
      overrides?: CallOverrides,
    ): Promise<void>;

    passKeyOwnerEnabled(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    entrypoint(
      userop: UserOpStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    getAddressOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getNonce(overrides?: CallOverrides): Promise<BigNumber>;

    getPassKeyOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getUserOpHash(
      userop: UserOpStruct,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    initialize(
      anOwner: PassKeyIdStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    passKeyOwnerEnabled(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    entrypoint(
      userop: UserOpStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    getAddressOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPassKeyOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUserOpHash(
      userop: UserOpStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    initialize(
      anOwner: PassKeyIdStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    passKeyOwnerEnabled(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}