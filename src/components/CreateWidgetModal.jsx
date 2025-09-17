"use client";
import React, { use, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addNewWidget } from "../context/slices/widgetSlice";
export default function CreateWidgetModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [widget, setWidget] = useState({
    widgetId: Date.now().toString(36),
    name: "",
    type: "pie",
    data: [{ name: "", value: "" }],
  });

  const handleChange = (field, value) => {
    setWidget((prev) => ({ ...prev, [field]: value }));
  };

  const handleDataChange = (index, field, value) => {
    setWidget((prev) => {
      const updated = [...prev.data];
      updated[index][field] = value;
      return { ...prev, data: updated };
    });
  };

  const addDataRow = () => {
    setWidget((prev) => ({
      ...prev,
      data: [...prev.data, { name: "", value: "" }],
    }));
  };

  const removeDataRow = (index) => {
    setWidget((prev) => {
      const updated = prev.data.filter((_, i) => i !== index);
      return { ...prev, data: updated };
    });
  };

  const handleSave = () => {
    console.log("Saving widget:", widget);
    dispatch(addNewWidget({ widget }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold">
        Create Widget
      </DialogTitle>

      <DialogContent
        dividers
        className="space-y-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6"
      >
        {/* Widget Name */}
        <TextField
          label="Widget Name"
          fullWidth
          value={widget.name}
          onChange={(e) => handleChange("name", e.target.value)}
          variant="outlined"
          InputProps={{
            className:
              "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md",
          }}
        />
        <div className="mb-4" />

        {/* Widget Type */}
        <TextField
          select
          label="Widget Type"
          fullWidth
          value={widget.type}
          onChange={(e) => handleChange("type", e.target.value)}
          variant="outlined"
          InputProps={{
            className:
              "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md",
          }}
        >
          <MenuItem value="pie">Pie Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
        </TextField>

        {/* Data Rows */}
        <div className="space-y-4">
          <Typography
            variant="subtitle2"
            className="font-medium text-slate-700 dark:text-slate-300"
          >
            Data Points
          </Typography>
          {widget.data.map((row, i) => (
            <div
              key={i}
              className="flex gap-3 items-center bg-slate-100 dark:bg-slate-800 p-3 rounded-lg"
            >
              <TextField
                label="Name"
                value={row.name}
                onChange={(e) => handleDataChange(i, "name", e.target.value)}
                fullWidth
                variant="outlined"
                InputProps={{
                  className:
                    "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md",
                }}
              />
              <TextField
                label="Value"
                type="number"
                value={row.value}
                onChange={(e) =>
                  handleDataChange(i, "value", Number(e.target.value))
                }
                fullWidth
                variant="outlined"
                InputProps={{
                  className:
                    "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md",
                }}
              />
              <IconButton onClick={() => removeDataRow(i)} color="error">
                <Trash2 size={18} />
              </IconButton>
            </div>
          ))}

          <Button
            startIcon={<Plus />}
            onClick={addDataRow}
            variant="outlined"
            className="rounded-lg"
          >
            Add Row
          </Button>
        </div>
      </DialogContent>

      {/* Actions */}
      <DialogActions className="bg-slate-50 dark:bg-slate-900 p-4">
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save Widget
        </Button>
      </DialogActions>
    </Dialog>
  );
}
