import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlices";
import updatePasswordSlices from './updatePasswordSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    userSliceName: authReducer,
    updatePasswordSlicesName: updatePasswordSlices,
    theme: themeReducer,
  },
});