// slices/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgets: [
    {
      widgetId: "cwmp",
      name: "CWMP Executive Dashboard",
      data: [
        { name: "Q1", value: 200 },
        { name: "Q2", value: 500 },
        { name: "Q3", value: 50 },
        { name: "Q4", value: 300 },
      ],
      type: "pie",
    },
    {
      widgetId: "sales",
      name: "Sales Dashboard",
      data: [
        { name: "Q1", value: 120 },
        { name: "Q2", value: 150 },
        { name: "Q3", value: 90 },
        { name: "Q4", value: 200 },
      ],
      type: "pie",
    },
    {
      widgetId: "marketing",
      name: "Marketing Dashboard",
      data: [
        { name: "Social Media", value: 80 },
        { name: "Email", value: 50 },
        { name: "Events", value: 40 },
        { name: "Ads", value: 70 },
      ],
      type: "pie",
    },
    {
      widgetId: "development",
      name: "Development Dashboard",
      data: [
        { name: "Frontend", value: 60 },
        { name: "Backend", value: 100 },
        { name: "QA", value: 30 },
        { name: "DevOps", value: 50 },
      ],
      type: "bar",
    },
    {
      widgetId: "support",
      name: "Support Dashboard",
      data: [
        { name: "Tickets", value: 180 },
        { name: "Live Chat", value: 70 },
        { name: "Calls", value: 40 },
      ],
      type: "bar",
    },
    {
      widgetId: "finance",
      name: "Finance Dashboard",
      data: [
        { name: "Revenue", value: 800 },
        { name: "Expenses", value: 450 },
        { name: "Profit", value: 350 },
      ],
      type: "Pie",
    },
    {
      widgetId: "hr",
      name: "HR Dashboard",
      data: [
        { name: "Hiring", value: 20 },
        { name: "Attrition", value: 5 },
        { name: "Training", value: 15 },
      ],
      type: "bar",
    },
    {
      widgetId: "operations",
      name: "Operations Dashboard",
      data: [
        { name: "Logistics", value: 300 },
        { name: "Procurement", value: 200 },
        { name: "Inventory", value: 150 },
      ],
      isBar: true,
    },
    {
      widgetId: "projects",
      name: "Projects Dashboard",
      data: [
        { name: "Ongoing", value: 12 },
        { name: "Completed", value: 25 },
        { name: "Pending", value: 5 },
      ],
      type: "bar",
    },
    {
      widgetId: "it",
      name: "IT Dashboard",
      data: [
        { name: "Incidents", value: 40 },
        { name: "Tickets Resolved", value: 100 },
        { name: "Deployments", value: 30 },
      ],
      type: "bar",
    },
  ],
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    addWidgetToDashBoard: (state, action) => {
      const { data, name } = action.payload;
      const newWidget = {
        data: data,
        name: name,
        widgetId: Math.random().toString(36).substring(2, 9),
      };
      state.widgets.push(newWidget);
    },
    addNewWidget: (state, action) => {
      const { widget } = action.payload;
      state.widgets.push(widget);
    },
    removeWidget: (state, action) => {
      const { widgetId } = action.payload;
      state.widgets = state.widgets.filter((w) => w.widgetId !== widgetId);
    },
  },
});

export const { addWidget, addNewWidget, addWidgetToDashBoard } =
  widgetSlice.actions;
export default widgetSlice.reducer;
