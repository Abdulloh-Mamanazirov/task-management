import { configureStore } from "@reduxjs/toolkit";
import sectorReducer from "../sectors";
import createTaskReducer from "../task";

export const store = configureStore({
  reducer: {
    sector: sectorReducer,
    task: createTaskReducer,
  },
});
