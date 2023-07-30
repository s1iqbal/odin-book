import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  email: string;
  username: string;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

interface User {
  email: string;
  username: string;
  password: string;
}

const initialState: AuthState = {
  email: "",
  username: "",
  status: 'idle',
  error: null
};

export const registerUser = createAsyncThunk('auth/registerUser', async (user: User) => {
  const response = await axios.post("http://localhost:8080/users/register", user);
  console.log(response)
  return response.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (user: User) => {
  const response = await axios({
    method: "POST",
    data: user,
    withCredentials: true,
    url: "http://localhost:8080/auth/login",
  })
  console.log(response)
  return response.data;
});

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const response = await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:8080/users/me",
  })
  console.log(response)
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
      });
  },
});

export default authSlice.reducer;
