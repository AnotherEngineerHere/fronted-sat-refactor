import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "tokenAuth",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;

export const changeToken = (newToken) => (dispatch) => {
  dispatch(setToken(newToken));
};
