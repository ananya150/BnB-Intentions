import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export type ChainSlice = {
  chainName: string;
  chainId: string;
};

const initialState: ChainSlice = {
  chainName: "OPBNB",
  chainId: "0x15eb",
};

export const chain = createSlice({
  name: "chain",
  initialState,
  reducers: {
    switchToBNB: (state) => {
      return produce(state, (draft) => {
        draft.chainName = "BNB";
        draft.chainId = "0x61";
      });
    },
    switchToOPBNB: (state) => {
      return produce(state, (draft) => {
        draft.chainName = "OPBNB";
        draft.chainId = "0x15eb";
      });
    },
  },
});

export const { switchToBNB, switchToOPBNB } = chain.actions;
export default chain.reducer;
