import 'bootstrap/dist/css/bootstrap.css';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dashboardReducer from "./dashboardSlide";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  }
});
