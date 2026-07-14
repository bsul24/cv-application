import { useState } from "react";
import GeneralInfo from "./GeneralInfo.jsx";
import Education from "./Education.jsx";
import Experience from "./Experience.jsx";
import "./styles/App.css";

export default function App() {
  return (
    <main className="app">
      <button className="preview-button">Preview Resume</button>
      <div className="resume">
        <GeneralInfo />
        <Education />
        <Experience />
      </div>
    </main>
  );
}
