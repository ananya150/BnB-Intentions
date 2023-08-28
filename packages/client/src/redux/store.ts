import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { userApi } from "./services/accountApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import accountSlice from "./features/accountSlice";
import tokensReducer from "./features/balanceSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
    accountSlice,
    tokens: tokensReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
