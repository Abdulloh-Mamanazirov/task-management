import { createSlice } from "@reduxjs/toolkit";

export const sectorsSlice = createSlice({
  name: "data",
  initialState: {
    sectors: [],
    managers: [],
    change: true,
  },
  reducers: {
    setSectors: (state, action) => {
      state.sectors = action.payload;
    },
    getOneSector: (state, action) => {
      return state.sectors.map((i) => i.id === action.payload);
    },
    setTriggerGetSectors: (state) => {
      state.change = !state.change;
    },
  },
});

export const { setSectors, getOneSector, setTriggerGetSectors } =
  sectorsSlice.actions;

export default sectorsSlice.reducer;
