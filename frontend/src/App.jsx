import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import List from "./pages/List";
import BarcodeScanner from "./ScanMovie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/list" element={<List />} />
      <Route path="/add" element={<BarcodeScanner />} />
    </Routes>
  );
}

export default App;
