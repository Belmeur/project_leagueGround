import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../slices/profileSlice";
import rankingSlice from "../slices/rankingSlice";

export const store = configureStore({
  reducer: {profile: profileSlice, ranking: rankingSlice}
})