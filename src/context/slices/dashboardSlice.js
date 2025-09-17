// slices/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboards: [
    {
      dashBoardId: "cwmp",
      name: "CWMP Executive Dashboard",
      widgetIds: ["cwmp", "sales", "marketing", "development"],
    },
    {
      dashBoardId: "cwmy",
      name: "CWMY",
      widgetIds: ["cwmp", "sales", "marketing", "development"],
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidgetToDashboard: (state, action) => {
      const { dashboardId, widgetId } = action.payload;
      const dashboard = state.dashboards.find(
        (d) => d.dashBoardId === dashboardId
      );
      if (dashboard && !dashboard.widgetIds.includes(widgetId)) {
        dashboard.widgetIds.push(widgetId);
      }
    },
    removeWidgetFromDashboard: (state, action) => {
      const { dashboardId, widgetId } = action.payload;
      const dashboard = state.dashboards.find(
        (d) => d.dashBoardId === dashboardId
      );
      if (dashboard) {
        dashboard.widgetIds = dashboard.widgetIds.filter(
          (id) => id !== widgetId
        );
      }
    },
    toggleWidgetOnDashboard: (state, action) => {
      const { dashboardId, widgetId } = action.payload;
      const dashboard = state.dashboards.find(
        (d) => d.dashBoardId === dashboardId
      );
      if (dashboard) {
        if (dashboard.widgetIds.includes(widgetId)) {
          dashboard.widgetIds = dashboard.widgetIds.filter(
            (id) => id !== widgetId
          );
        } else {
          dashboard.widgetIds.push(widgetId);
        }
      }
    },
  },
});

export const {
  addWidgetToDashboard,
  removeWidgetFromDashboard,
  toggleWidgetOnDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
