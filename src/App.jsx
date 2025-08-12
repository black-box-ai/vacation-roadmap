import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Roteiro from "./pages/Roteiro.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roteiro" element={<Roteiro />} />
      </Routes>
    </Router>
  );
}