import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import List from "./pages/List";
import BarcodeScanner from "./ScanMovie";
import { NotFoundException } from "@zxing/library";

function App() {
  const printCode = (code) => {
    if (code instanceof NotFoundException) {
      return null;
    }
    console.log("Scanned", code);
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/list" element={<List />} />
      <Route
        path="/add"
        element={<BarcodeScanner onScan={(code) => printCode(code)} />}
      />
    </Routes>
  );
}

export default App;
// 012236212775;
