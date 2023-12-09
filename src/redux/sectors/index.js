import { createSlice } from "@reduxjs/toolkit";

export const sectorsSlice = createSlice({
  name: "data",
  initialState: {
    sectors: [],
  },
  reducers: {
    setSectors: (state, action) => {
      state.sectors = action.payload;
    },
    getOneSector: (state, action) => {
      return state.sectors.map((i) => i.id === action.payload);
    },
  },
});

export const { setSectors, getOneSector } = sectorsSlice.actions;

export default sectorsSlice.reducer;
