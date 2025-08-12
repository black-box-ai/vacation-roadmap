import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import DayCard from "../components/DayCard";
import itinerary from "../data/itinerary";
import { LayoutGrid, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

export default function Roteiro() {
  const [filtro, setFiltro] = useState("");
  const dias = useMemo(() => itinerary.filter(d => d.cidade.toLowerCase().includes(filtro.toLowerCase())), [filtro]);

  return (
    <section id="roteiro" className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-4 flex items-center gap-3">
        <LayoutGrid className="text-cyan-300"/>
        <h2 className="text-2xl sm:text-3xl font-bold text-center flex-1">Roteiro (Dias 1–10)</h2>
        <Link
          to="/"
          className="ml-2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-300 bg-white/60 text-blue-900 font-medium shadow-sm hover:bg-blue-100 hover:scale-105 transition-all duration-200"
          title="Voltar para Home"
        >
          <ArrowLeft size={18} className="inline-block" />
          <span className="text-base">Home</span>
        </Link>
      </div>
      <div className="mb-4 flex items-center gap-3">
        <input
          className="w-full sm:w-80 px-3 py-2 rounded-2xl bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Filtrar por cidade (ex.: Búzios)"
          value={filtro}
          onChange={(e)=>setFiltro(e.target.value)}
        />
      </div>
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {dias.map((d, i) => <DayCard key={d.dia} d={d} index={i} />)}
      </motion.div>
      {dias.length===0 && (
        <div className="text-center text-slate-300 py-20">Nenhum dia encontrado para "{filtro}"</div>
      )}
    </section>
  );
}
