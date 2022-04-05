import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userLogin",
  initialState: {
    user: {},
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUserLogin } = userSlice.actions;

export default userSlice.reducer;

export const changeUser = (userToLogin) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(userToLogin));
  dispatch(setUserLogin(userToLogin));
};
