import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  section: "editProfile",
}

export const sectionSwitchSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    switchSection: (state, action) => {
        state.section = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { switchSection } = sectionSwitchSlice.actions;

export default sectionSwitchSlice.reducer;