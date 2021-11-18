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

// Config slice
export const userSlice = createSlice(
    {
        name: "user",
        initialState,
        reducers: { 
            updateUser: (state, action) => {
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
    }
);

// var act1= userSlice.actions.updateDashboard;
// debugger
// console.log(act1.updateUser, 'updateUser1');

// Export actions
export const { updateUser, updateInfo, updateInfos } = userSlice.actions;

// Select state username from slice
export const selectUsername = state => state.user.username;

export const selectInfo = state => state;
export const selectInfos = state => state.user.infos;

// Export reducer
export default userSlice.reducer;
