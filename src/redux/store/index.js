import { configureStore } from "@reduxjs/toolkit";
import sectorReducer from "../sectors";

export const store = configureStore({
  reducer: {
    sector: sectorReducer,
  },
});
