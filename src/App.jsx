import { useState } from "react";
import GeneralInfo from "./GeneralInfo.jsx";
import Education from "./Education.jsx";
import Experience from "./Experience.jsx";
import "./App.css";

export default function App() {
  return (
    <>
      <GeneralInfo />
      <Education />
      <Experience />
    </>
  );
}
