import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userLogin from "./slices/user";
import tokenAuth from "./slices/token";
import { mainAPI } from "./api/mainAPI";
import { mainAUTH } from "./api/mainAUTH";

const store = configureStore({
  reducer: {
    [mainAPI.reducerPath]: mainAPI.reducer,
    [mainAUTH.reducerPath]: mainAUTH.reducer,
    userLogin,
    tokenAuth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainAPI.middleware, mainAUTH.middleware),
  // getDefaultMiddleware().concat(mainAUTH.middleware),
});

setupListeners(store.dispatch);

export default store;
