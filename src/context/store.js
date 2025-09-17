// store.js
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import widgetSlice from "./slices/widgetSlice";
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    widget: widgetSlice,
  },
});

export default store;
