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
      const dashboard = state.dashboards.find((d) => d.id === dashboardId);
      if (dashboard) {
        dashboard.widgetIds.push(widgetId);
      }
    },
    removeWidgetFromDashboard: (state, action) => {
      const { dashboardId, widgetId } = action.payload;
      const dashboard = state.dashboards.find((d) => d.id === dashboardId);
      if (dashboard) {
        dashboard.widgetIds = dashboard.widgetIds.filter(
          (id) => id !== widgetId
        );
      }
    },
  },
});

export const { addWidgetToDashboard, removeWidgetFromDashboard } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
