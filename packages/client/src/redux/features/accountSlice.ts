import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from 'immer'; 

export type AccountSlice = {
    address: string,
    pubKeyX: string,
    pubKeyY: string,
    keyId: string
}

const initialState: AccountSlice = {
    address: '',
    pubKeyX: '',
    pubKeyY: '',
    keyId: ''
}

export const account = createSlice({
    name: "account",
    initialState,
    reducers: {
        reset: () => initialState,
        setAccount: (state, action: PayloadAction<AccountSlice>) => {
            return produce(state, draft => {
                const { address, pubKeyX, pubKeyY, keyId } = action.payload;
                draft.address = address;
                draft.pubKeyX = pubKeyX;
                draft.pubKeyY = pubKeyY;
                draft.keyId = keyId;
              });        
        }
    }
})

export const {reset, setAccount} = account.actions;
export default account.reducer;