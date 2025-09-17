import React, { useState, useMemo, useRef } from "react";
import HorizontalCardContainer from "./HorizontalCardContainer";
import {
  Button,
  TextField,
  InputAdornment,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
} from "@mui/material";
import { Clock, Search } from "lucide-react";
import LoopIcon from "@mui/icons-material/Loop";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddWidgetModal from "./AddWidgetModal";
import { useSelector } from "react-redux";
import CreateWidgetModal from "./CreateWidgetModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef(null);

  const dashboards = useSelector((state) => state.dashboard.dashboards);
  const availableWidgets = useSelector((state) => state.widget.widgets);

  // Filter widgets for search
  const filteredWidgets = useMemo(() => {
    if (!searchQuery) return [];
    return availableWidgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, availableWidgets]);

  const handleAddWidget = ({ widgetId, dashboardId }) => {
    const widget = availableWidgets.find((w) => w.widgetId === widgetId);
    if (!widget) return;
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md w-full max-w-7xl mx-auto my-6 gap-4">
        <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-left">
          Dashboard
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Searchbar with dropdown */}
          <div ref={searchRef}>
            <TextField
              variant="outlined"
              size="small"
              color="primary"
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenSearch(true);
              }}
              onFocus={() => searchQuery && setOpenSearch(true)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} className="text-blue-500" />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: 330,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            {/* Dropdown */}
            <Popper
              open={openSearch && filteredWidgets.length > 0}
              anchorEl={searchRef.current}
              placement="bottom-start"
              style={{ zIndex: 1500, width: 260 }}
            >
              <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
                <Paper
                  elevation={4}
                  sx={{
                    mt: 1,
                    borderRadius: "12px",
                    overflow: "hidden",
                    maxHeight: 300,
                    overflowY: "auto",
                  }}
                >
                  <List dense>
                    {filteredWidgets.map((widget) => (
                      <ListItem
                        key={widget.widgetId}
                        button
                        onClick={() => {
                          // open modal and auto-focus on selected widget
                          setIsModalOpen(true);
                          setOpenSearch(false);
                          setSearchQuery("");
                        }}
                      >
                        <ListItemText
                          primary={widget.name}
                          secondary={widget.description}
                          primaryTypographyProps={{
                            fontSize: "0.9rem",
                            fontWeight: 500,
                          }}
                          secondaryTypographyProps={{
                            fontSize: "0.75rem",
                            color: "text.secondary",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add Widget
          </Button>
          <Button onClick={() => window.location.reload()}>
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
        const widgetsForDashboard = availableWidgets.filter((widget) =>
          widgetIds.includes(widget.widgetId)
        );

        return (
          <HorizontalCardContainer
            key={item.id}
            Heading={item.name}
            datasets={widgetsForDashboard}
          />
        );
      })}

      {/* Add Widget Drawer */}
      <CreateWidgetModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dashboards={dashboards}
        widgets={availableWidgets}
        onAddWidget={handleAddWidget}
      />
    </>
  );
};

export default Dashboard;
