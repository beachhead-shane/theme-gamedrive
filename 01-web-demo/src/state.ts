import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameReducer";
export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
