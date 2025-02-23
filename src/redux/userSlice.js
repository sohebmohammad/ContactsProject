import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch users from API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Store all users
    searchInput: "", // Store search input
    status: "idle", // Track loading status
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Store fetched users
      });
  },
});

export const { setSearchInput } = usersSlice.actions;
export default usersSlice.reducer;
