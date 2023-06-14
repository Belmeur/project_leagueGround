import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import * as api from '../api/api.js';

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (userName, thunkAPI) => {
    try {
      const response = await api.getProfile(userName);  
      return response.data;
    } catch (error) {
      return {SummonerName: ""}
    }
  }
)

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userName, thunkAPI) => {
    const response = await api.updateProfile(userName);
    console.log(response);
    
    return response.data;
  }
)

const initialState = {
  profile: {},
  updateStatus: false
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateToggle: (state) => {
      state.updateStatus = !state.updateStatus;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    })
  }
})

export const {updateToggle} = profileSlice.actions;

export default profileSlice.reducer;