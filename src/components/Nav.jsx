import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Plane, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  const LinkBtn = ({ to, children }) => (
    <Link to={to} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold">{children}</Link>
  );
  return (
    <nav className="sticky top-0 z-50 relative backdrop-blur bg-slate-900/70 border-b border-white/10">
      <motion.div
        className="absolute left-0 right-0 top-0 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-amber-400 to-pink-400"
        style={{ scaleX: progress }}
      />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="text-cyan-300" size={18}/>
          <span className="font-bold">Roteiro Férias - Rio de Janeiro</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <LinkBtn to="/">Home</LinkBtn>
          <LinkBtn to="/roteiro">Roteiro</LinkBtn>
          {/* <LinkBtn to="/mapas">Mapas</LinkBtn>
          <LinkBtn to="/checklist">Checklist</LinkBtn>
          <LinkBtn to="/gastos">Gastos</LinkBtn> */}
        </div>
        <button onClick={()=>setOpen(o=>!o)} className="sm:hidden p-2 rounded-xl bg-white/10">{open? <X/>:<Menu/>}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="sm:hidden px-4 pb-3 flex flex-col gap-2">
              <Link to="/" className="px-3 py-2 rounded-xl bg-white/10">Home</Link>
              <Link to="/roteiro" className="px-3 py-2 rounded-xl bg-white/10">Roteiro</Link>
              {/* <Link to="/mapas" className="px-3 py-2 rounded-xl bg-white/10">Mapas</Link>
              <Link to="/checklist" className="px-3 py-2 rounded-xl bg-white/10">Checklist</Link>
              <Link to="/gastos" className="px-3 py-2 rounded-xl bg-white/10">Gastos</Link> */}
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
