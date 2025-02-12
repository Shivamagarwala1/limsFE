import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        themes: [], // Holds theme data
        activeTheme: null, // Active theme ID
    },
    reducers: {

        setThemes: (state, action) => {

            state.themes = action.payload;

            // Check if a theme is stored in localStorage
            const savedTheme = JSON.parse(localStorage.getItem("activeTheme"));

            if (savedTheme) {

                state.activeTheme = savedTheme;

            } else {

                // Set default theme (isdefault === 1)
                const defaultTheme = action.payload.find((theme) => theme.isdefault === 1);

                state.activeTheme = defaultTheme ? defaultTheme : null; // Store entire theme object
            }

        },

        setActiveTheme: (state, action) => {
            const activeTheme = action.payload;
            state.activeTheme = activeTheme;
            localStorage.setItem("activeTheme", JSON.stringify(activeTheme)); // Store entire theme object
        },
    },
});

export const { setThemes, setActiveTheme } = themeSlice.actions;
export default themeSlice.reducer;
