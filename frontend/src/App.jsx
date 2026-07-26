import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  return (
    <div className="min-h-dvh max-w-screen flex flex-col items-center justify-center">
      <section className="">
        <div id="logo" className="flex flex-col items-center justify-center">
          <img src="src/assets/movie-reel.png" style={{ height: 100 }} />
          <h1 className="text-3xl p-3">Movie Manifest</h1>
        </div>
        <div className="">
          <button className="text-3xl p-3 border-4 rounded-xl m-3">LIST</button>
          <button className="text-3xl p-3 border-4 rounded-xl m-3">
            ADD MOVIE
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
