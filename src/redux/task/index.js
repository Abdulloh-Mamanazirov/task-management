import { createSlice } from "@reduxjs/toolkit";

export const createTaskSlice = createSlice({
  name: "task",
  initialState: {
    text: [],
    photo: [],
    audio: null,
    deadline: null,
    _to: null,
    _to_status: null,
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
    setToStatus: (state, action) => {
      state._to_status = action.payload;
    },
    removeTask: (state) => {
      state.text = "";
      state.photo = [];
      state.audio = null;
      state.deadline = null;
      state._to = null;
    },
  },
});

export const {
  setText,
  setPhoto,
  setAudio,
  setDeadline,
  setTo,
  setToStatus,
  removeTask,
} = createTaskSlice.actions;

export default createTaskSlice.reducer;
