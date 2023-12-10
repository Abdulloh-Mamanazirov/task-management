import { configureStore } from "@reduxjs/toolkit";
import sectorReducer, { getManager } from "../sectors";

export const store = configureStore({
  reducer: {
    sector: sectorReducer,
    manger: getManager,
  },
});
