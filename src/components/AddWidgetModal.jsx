// components/AddWidgetModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWidgetOnDashboard } from "../context/slices/dashboardSlice";

export default function AddWidgetModal({ isOpen, onClose }) {
  const dashboards = useSelector((state) => state.dashboard.dashboards);
  const widgets = useSelector((state) => state.widget.widgets);
  const dispatch = useDispatch();

  // active tab is first dashboard by default
  const [activeTab, setActiveTab] = React.useState(
    dashboards?.[0]?.dashBoardId || ""
  );

  // update activeTab if dashboards change
  React.useEffect(() => {
    if (
      dashboards?.length &&
      !dashboards.find((d) => d.dashBoardId === activeTab)
    ) {
      setActiveTab(dashboards[0].dashBoardId);
    }
  }, [dashboards, activeTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Add Widget
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
              {dashboards?.map((db) => (
                <button
                  key={db.dashBoardId}
                  onClick={() => setActiveTab(db.dashBoardId)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    activeTab === db.dashBoardId
                      ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {db.name}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
                  Select Widgets for{" "}
                  {dashboards.find((db) => db.dashBoardId === activeTab)?.name}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {widgets?.map((widget) => {
                    const dashboard = dashboards.find(
                      (db) => db.dashBoardId === activeTab
                    );
                    const isChecked =
                      dashboard?.widgetIds.includes(widget.widgetId) || false;

                    return (
                      <label
                        key={widget.widgetId}
                        className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:shadow-md transition bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            dispatch(
                              toggleWidgetOnDashboard({
                                dashboardId: activeTab,
                                widgetId: widget.widgetId,
                              })
                            )
                          }
                          className="mt-1"
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            {widget.name}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {widget.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
