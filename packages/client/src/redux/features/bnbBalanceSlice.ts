import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Token {
  name: string;
  balance: number;
  price: number;
}

interface TokenState {
  totalBalance: number;
  tokens: Token[];
}

const initialState: TokenState = {
  totalBalance: 0.0,
  tokens: [
    {
      name: "BNB",
      balance: 0,
      price: 0,
    },
    {
      name: "BUSD",
      balance: 0,
      price: 1,
    },
  ],
};

export const fetchBnbTokens = createAsyncThunk(
  "tokens/fetchBnbTokens",
  async (tokens: Token[]) => {
    console.log("Calling balance slice");
    // fetch the price of bnb
    try {
      const response: any = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=2",
      );
      const price = response.data.binancecoin.usd;
      tokens[0].price = price;
      return tokens; // This gets passed as `action.payload`
    } catch (e) {
      return tokens;
    }
  },
);

export const bnbTokensSlice = createSlice({
  name: "tokens",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchBnbTokens.fulfilled,
      (state, action: PayloadAction<Token[]>) => {
        state.tokens = action.payload;

        const total =
          state.tokens[0].balance * state.tokens[0].price +
          state.tokens[1].balance * state.tokens[1].price;
        state.totalBalance = parseFloat(`${total}`); // Convert to string with two decimal places.
      },
    );
  },
});

export default bnbTokensSlice.reducer;
