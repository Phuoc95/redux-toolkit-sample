import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "Guest",
  info: {
      'type': '',
      'name': '',
      'version': '',
  },
  infos: []
};

const dashboardState = {
  home: "100"
};

// Config slice
export const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: {
            updateUsername: (state, action) => {
                state.username = action.payload || initialState.username;
            },
            updateInfo: (state, action) => {
                console.log(state, 'state_bf');
                // debugger
                // state = {
                //     ...state,
                //     info: action.payload
                // }
                state.info = action.payload;

                console.log(state, 'state_aff');
            },
            updateInfos: (state, action) => {
                state.infos = action.payload;
            },
        }
    },
    {
        name: "dashboard",
        dashboardState,
        reducers: {
            updateDashboard: (state, action) => {
                state.home = action.payload || 'home1';
            }
        }
    }
);

console.log(userSlice, 'userSliceuserSlice');
var rs = userSlice.actions.updateUsername;
console.log(rs, 'rs2');

// Export actions
export const { updateUsername, updateInfo, updateInfos } = userSlice.actions;

// Select state username from slice
export const selectUsername = state => state.user.username;

export const selectInfo = state => state;
export const selectInfos = state => state.user.infos;

// Export reducer
export default userSlice.reducer;
