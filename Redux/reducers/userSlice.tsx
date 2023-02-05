import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  accessToken: null,
  user: {},
  cart:[]
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    removeUser: (state,action) => {
      state.accessToken = null;
      state.user = {};
    },

    setCart :(state,action)=>{
      state.cart = action.payload.cart

    }
  },
});

export const { setUser, removeUser,setCart } = userSlice.actions;
export default userSlice.reducer;
