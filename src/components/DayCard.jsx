import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Sun, MapPin, Car, ChevronUp, ChevronDown, BedDouble, Hotel, Utensils, Info, Camera, ExternalLink } from "lucide-react";
import Section from "./Section";

const PALETA = {
  prim: "#22d3ee",
  accent: "#f59e0b",
};
const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};
const gmaps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function BadgeDia({ num }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="absolute -top-3 -left-3 z-10 rounded-2xl bg-amber-400 text-slate-900 px-3 py-1 shadow-xl border border-amber-300"
    >
      <div className="flex items-center gap-2 font-extrabold tracking-wide">
        <CalendarDays size={16} />
        <span>Dia {num}</span>
      </div>
    </motion.div>
  );
}

function Chip({ icon: Icon, children, color = PALETA.prim }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-semibold shadow" style={{ backgroundColor: color }}>
      {Icon && <Icon size={14} />} {children}
    </span>
  );
}

export default function DayCard({ d, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.995 }}
      className="group relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 ring-1 ring-white/10"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-56 sm:h-64">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <img src={d.capa} alt={d.cidade} className="w-full h-full object-cover"/>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        <BadgeDia num={d.dia} />
        <motion.div
          className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <Chip icon={Sun}>{d.data}</Chip>
          <Chip icon={MapPin}>{d.cidade}</Chip>
          {d.deslocamento?.distancia && <Chip icon={Car} color={PALETA.accent}>{d.deslocamento.distancia} • {d.deslocamento.tempo}</Chip>}
        </motion.div>
        <button onClick={()=>setOpen(v=>!v)} className="absolute top-3 right-3 bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {open?"Fechar":"Ver detalhes"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="p-4 sm:p-6"
          >
            <Section title="Deslocamento" icon={Car}>
              <div className="grid sm:grid-cols-2 gap-2">
                <div>Origem: <b>{d.deslocamento.de}</b></div>
                <div>Destino: <b>{d.deslocamento.para}</b></div>
                <div>Distância: <b>{d.deslocamento.distancia}</b></div>
                <div>Tempo: <b>{d.deslocamento.tempo}</b></div>
              </div>
              {d.deslocamento.notas?.length>0 && (
                <ul className="list-disc ml-5 mt-2">
                  {d.deslocamento.notas.map((n,i)=>(<li key={i}>{n}</li>))}
                </ul>
              )}
            </Section>

            <Section title="Logística & Atividades" icon={Info}>
              <ul className="space-y-1">
                {d.atividades.map((a,i)=> (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-24 shrink-0 font-mono text-cyan-300">{a.h}</span>
                    <span>{a.t}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {d.hospedagem?.length>0 && (
              <Section title="Hospedagem" icon={Hotel}>
                <ul className="space-y-2">
                  {d.hospedagem.map((h,i)=> (
                    <li key={i} className="flex items-start gap-3">
                      <BedDouble size={16} className="mt-1 text-amber-300"/>
                      <div>
                        <div className="font-medium">{h.nome} <span className="text-slate-300">({h.faixa})</span></div>
                        <div className="text-slate-300 text-xs">{h.nota}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {d.restaurantes?.length>0 && (
              <Section title="Onde Comer" icon={Utensils}>
                <ul className="space-y-2">
                  {d.restaurantes.map((r,i)=> (
                    <li key={i} className="flex items-start gap-3">
                      <Utensils size={16} className="mt-1 text-emerald-300"/>
                      <div>
                        <div className="font-medium">{r.nome} <span className="text-slate-300">({r.faixa}/pessoa)</span></div>
                        <div className="text-slate-300 text-xs">{r.tipo}{r.pertoDe?` • perto de ${r.pertoDe}`:""}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title="Dicas" icon={Info}>
              <ul className="list-disc ml-5 space-y-1">
                {d.dicas.map((x,i)=>(<li key={i}>{x}</li>))}
              </ul>
            </Section>

            {d.pontos?.length>0 && (
              <Section title="Descrição dos Pontos" icon={Camera}>
                <ul className="space-y-2">
                  {d.pontos.map((p,i)=> (
                    <li key={i}>
                      <div className="font-semibold">{p.nome}</div>
                      <div className="text-slate-300 text-sm">{p.desc}</div>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {d.cidade && (
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={gmaps(d.cidade)} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 text-sm font-semibold"><MapPin size={16}/> Abrir no Maps <ExternalLink size={14}/></a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
