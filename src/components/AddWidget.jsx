import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react"; // lightweight icon library

export default function AddWidget({ onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 w-full max-w-3xl min-w-[300px] flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 transition-colors"
    >
      <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
        <Plus className="w-10 h-10 mb-2" />
        <span className="font-medium">Add Widget</span>
      </div>
    </motion.div>
  );
}
