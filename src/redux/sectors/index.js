import { createSlice } from "@reduxjs/toolkit";

export const sectorsSlice = createSlice({
  name: "data",
  initialState: {
    sectors: [],
    managers: [],
  },
  reducers: {
    setSectors: (state, action) => {
      state.sectors = action.payload;
    },
    getOneSector: (state, action) => {
      return state.sectors.map((i) => i.id === action.payload);
    },
    getManager: (state, action) => {
      return state.managers.map((i) => i.id === action.payload);
    },
  },
});

export const { setSectors, getOneSector, getManager } = sectorsSlice.actions;

export default sectorsSlice.reducer;
