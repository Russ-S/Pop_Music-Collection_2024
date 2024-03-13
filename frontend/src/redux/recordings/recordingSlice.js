import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  media: [],
  recordings: [],
  checked: [],
  radio: [],
  categoryCheckboxes: {},
  checkedCategories: [],
};
const recordingSlice = createSlice({
  name: "recordings",
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setRecordings: (state, action) => {
      state.recordings = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setMedia,
  setRecordings,
  setChecked,
  setRadio,
  setSelectedCategory,
} = recordingSlice.actions;

export default recordingSlice.reducer;
