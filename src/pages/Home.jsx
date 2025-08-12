import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import itinerary from "../data/itinerary";

// Seleciona imagens dos destinos para o background
const imagens = itinerary.map(d => d.capa).slice(0, 12);





export default function Home() {
  // Para animação de entrada do conteúdo
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // O grid de imagens é duplicado verticalmente para simular scroll infinito
  // O efeito de hover é garantido com transições e group-hover
  // O grid ocupa 300vh para permitir rolagem longa
  // Grid de imagens fixo, ocupando apenas a viewport (100vh), sem empurrar o conteúdo
  const gridRows = 3; // 3 linhas para cobrir 100vh
  const gridCols = 4; // 4 colunas (ajuste para responsivo)
  const imagensRepetidas = Array.from({ length: gridRows * gridCols }, (_, i) => imagens[i % imagens.length]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
      {/* Grid de imagens fixo, ocupando apenas a viewport */}
      <div className="fixed inset-0 -z-10 w-full h-screen overflow-hidden">
        <div className="w-full h-full grid grid-cols-3 md:grid-cols-4 grid-rows-3">
          {imagensRepetidas.map((src, i) => (
            <div
              key={i}
              className="relative w-full h-full group"
              style={{ pointerEvents: 'auto' }}
            >
              <img
                src={src}
                alt="Destino"
                className="w-full h-full object-cover object-center transition duration-500 brightness-75 group-hover:brightness-110 group-hover:saturate-150 group-hover:scale-110 group-hover:shadow-2xl"
                draggable={false}
                style={{ transition: 'all 0.5s cubic-bezier(.4,2,.3,1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      <section className="w-full flex flex-col items-center justify-center py-20 relative z-10 min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-center mb-8 relative"
        >
          <span className="absolute inset-0 left-1/2 -translate-x-1/2 w-full px-2 rounded-xl bg-black/70 blur-md" style={{zIndex:0}} aria-hidden></span>
          <span className="relative z-10 text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">Guia Interativo<br />Região dos Lagos & Serra (RJ)</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg sm:text-2xl text-slate-100 text-center mb-10 max-w-2xl drop-shadow"
        >
          Descubra o roteiro, dicas e fotos dos destinos mais incríveis do Rio!<br />Role para ver o roteiro completo.
        </motion.p>
        <div className="flex justify-center mt-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
            whileHover={{ scale: 1.06, rotate: -2 }}
          >
            <Link
              to="/roteiro"
              className="relative inline-block px-12 py-6 rounded-3xl font-extrabold text-2xl shadow-2xl bg-blue-900 text-white tracking-wide overflow-hidden group focus:outline-none focus:ring-4 focus:ring-blue-400"
              style={{ boxShadow: "0 0 32px 0 #0ea5e9aa" }}
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.08, textShadow: "0 0 16px #fff, 0 0 32px #0ea5e9" }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                Ver Roteiro Completo
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                aria-hidden
              />
              {/* Glow animado */}
              <motion.span
                className="absolute -inset-2 rounded-3xl bg-blue-400 opacity-30 blur-2xl pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
