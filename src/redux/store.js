import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Import the reducer
import usersReducer from "./userSlice"; // Import the reducer
const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer

  },
});

export default store;

