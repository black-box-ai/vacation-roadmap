import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Section({ title, icon: Icon, children }) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      layout
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 mb-3"
    >
      <button onClick={() => setOpen(v=>!v)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">{Icon && <Icon size={18} />} <h3 className="font-semibold">{title}</h3></div>
        {open ? <span>▲</span> : <span>▼</span>}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-slate-100/90 text-sm"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
