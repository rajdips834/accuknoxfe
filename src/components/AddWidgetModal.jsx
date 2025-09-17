import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AddWidgetModal({
  isOpen,
  onClose,
  dashboards = [],
  widgets = [],
  onAddWidget,
}) {
  const [activeTab, setActiveTab] = React.useState(dashboards[0]?.id || "");
  const [selectedWidgets, setSelectedWidgets] = React.useState({}); // { dashboardId: [widgetIds] }

  // toggle checkbox
  const handleToggleWidget = (dashboardId, widgetId) => {
    setSelectedWidgets((prev) => {
      const current = prev[dashboardId] || [];
      if (current.includes(widgetId)) {
        return {
          ...prev,
          [dashboardId]: current.filter((id) => id !== widgetId),
        };
      }
      return {
        ...prev,
        [dashboardId]: [...current, widgetId],
      };
    });
  };

  // confirm selection
  const handleConfirm = () => {
    if (selectedWidgets[activeTab]?.length) {
      selectedWidgets[activeTab].forEach((widgetId) =>
        onAddWidget({ widgetId, dashboardId: activeTab })
      );
    }
    onClose();
  };

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
              {dashboards.map((db) => (
                <button
                  key={db.id}
                  onClick={() => setActiveTab(db.id)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    activeTab === db.id
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
              {/* Widgets List */}
              <div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
                  Select Widgets for{" "}
                  {dashboards.find((d) => d.id === activeTab)?.name}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {widgets.map((widget) => (
                    <label
                      key={widget.id}
                      className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:shadow-md transition bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={
                          selectedWidgets[activeTab]?.includes(widget.id) ||
                          false
                        }
                        onChange={() =>
                          handleToggleWidget(activeTab, widget.id)
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
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Add Selected
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
