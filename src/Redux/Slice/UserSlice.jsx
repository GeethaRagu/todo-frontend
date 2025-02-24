import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  currentuser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentuser = action.payload;
       // console.log(currentuser);
        toast.success("User Registered Successfully");
      },
      signUpFailure: (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = action.payload;
        state.currentuser = null;
       // toast.error(action.payload);
      },
      signInStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      signInSuccess: (state, action) => {
          state.loading = false;
          state.error = null;
          state.currentuser = action.payload;
          toast.success("User LoggedIn Successfully");
        },
        signInFailure: (state, action) => {
          console.log(action.payload);
          state.loading = false;
          state.error = action.payload;
          state.currentuser = null;
         // toast.error(action.payload);
        },
        signOutSuccess: (state, action) => {
          state.loading = false;
          state.error = null;
          state.currentuser = null;
          toast.success("User LoggedOut Successfully");
        },
  },
});

export const {signUpStart , signUpSuccess , signUpFailure ,signInStart , signInSuccess , signInFailure, signOutSuccess} = userSlice.actions;

export default userSlice.reducer;
