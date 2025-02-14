import { createSlice } from "@reduxjs/toolkit";
import { isNeedToPasswordForgot } from "../service/localstroageService";

const initialState = isNeedToPasswordForgot()
    ? JSON.parse(localStorage.getItem("isPasswordForgot"))
    : false;


const updatePasswordSlices = createSlice({
    name: "updatePasswordSlicesName",
    initialState,
    reducers: {
        updateUserPassword: (state, action) => action.payload, // Update state directly
        removeUpdateUserPassword: () => false, // Reset to false
    },
});

export const { updateUserPassword, removeUpdateUserPassword } = updatePasswordSlices.actions;

export default updatePasswordSlices.reducer;
