import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/api";


export const getRanking = createAsyncThunk(
  'ranking/',
  async(hi, thunkAPI) => {
    const response = await api.getRanking();
    return response.data;
  }
)

const initialState = {
  ranking: []
};

const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRanking.fulfilled, (state, action) => {
      state.ranking = action.payload;
    })
  }
})

export const {} = rankingSlice.actions;
export default rankingSlice.reducer;