import { createSlice } from "@reduxjs/toolkit";

export const createTaskSlice = createSlice({
  name: "task",
  initialState: {
    text: "",
    photo: [],
    audio: null,
    deadline: null,
    _to: null,
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
    setDeadline: (state, action) => {
      state.deadline = action.payload;
    },
    setTo: (state, action) => {
      state._to = action.payload;
    },
  },
});

export const { setText, setPhoto, setAudio, setDeadline, setTo } =
  createTaskSlice.actions;

export default createTaskSlice.reducer;
