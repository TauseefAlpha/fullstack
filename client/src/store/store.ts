import { configureStore } from "@reduxjs/toolkit";
import { authapi } from "../authapi/authapi";
import { bookcurdapi } from "../bookapi/bookcurdapi";
import Authslice from "../authslice/authslice";

export const store = configureStore({
  reducer: {
    [authapi.reducerPath]: authapi.reducer,
    [bookcurdapi.reducerPath]: bookcurdapi.reducer,
    Authslice: Authslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authapi.middleware, bookcurdapi.middleware),
});
