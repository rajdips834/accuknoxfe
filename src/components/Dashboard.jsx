import React, { useState } from "react";
import HorizontalCardContainer from "./HorizontalCardContainer";
import { Button } from "@mui/material";
import { Clock } from "lucide-react";
import LoopIcon from "@mui/icons-material/Loop";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddWidgetModal from "./AddWidgetModal";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dashboards = useSelector((state) => state.dashboard.dashboards);
  const availableWidgets = useSelector((state) => state.widget.widgets);

  // When a widget is added from modal
  const handleAddWidget = ({ widgetId, dashboardId }) => {
    const widget = availableWidgets.find((w) => w.id === widgetId);
    if (!widget) return;

    setIsModalOpen(false);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md w-full max-w-7xl mx-auto my-6">
        <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-left">
          Dashboard
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            className="m-4"
            onClick={() => setIsModalOpen(true)}
          >
            Add Widget
          </Button>
          <Button>
            <LoopIcon />
          </Button>
          <Button>
            <MoreVertIcon />
          </Button>
          <Button variant="outlined">
            <Clock className="mr-1" /> | Last 24 hours
          </Button>
        </div>
      </div>
      {/* Dashboard Sections */}
      {dashboards.map((item) => {
        const widgetIds = item.widgetIds;
        const filteredWidgets = availableWidgets.filter(
          (widget) => widgetIds.includes(widget.widgetId) // return boolean
        );

        return (
          <HorizontalCardContainer
            key={item.id}
            Heading={item.name}
            datasets={filteredWidgets}
          />
        );
      })}

      {/* Add Widget Drawer */}
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dashboards={dashboards}
        widgets={availableWidgets}
        onAddWidget={handleAddWidget}
      />
    </>
  );
};

export default Dashboard;
