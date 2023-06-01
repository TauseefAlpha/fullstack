import { createSlice } from "@reduxjs/toolkit";


export const Authslice = createSlice({
  name: "auth",
  initialState: {
    token:"",
  },
  reducers: {
    setToken(state, usertoken) {
      state.token = usertoken.payload;
    },
  },
});

export const { setToken } = Authslice.actions;
export default Authslice.reducer;
