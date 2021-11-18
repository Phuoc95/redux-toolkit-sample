import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    home: "100"
};

// Config slice
export const dashboardSlide = createSlice(
    {
        name: "dashboard",
        initialState,
        reducers: {
            updateDashboard: (state, action) => {
                state.home = action.payload || 'home1';
                // state.home = 100
            }
        }
    }
);

var act1= dashboardSlide.actions;
// debugger
console.log(act1.updateUser, 'updateUser1');

// Export actions
export const { updateDashboard } = dashboardSlide.actions;

// Select state dashboard from slice
export const selectInfoDashboard = state => state;

// Export reducer
export default dashboardSlide.reducer;
