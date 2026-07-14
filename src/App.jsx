import GeneralInfo from "./GeneralInfo.jsx";
import Education from "./Education.jsx";
import Experience from "./Experience.jsx";
import "./styles/App.css";
import "./styles/Forms.css";
import { useState } from "react";

export default function App() {
  const [isPreviewing, setIsPreviewing] = useState(false);

  return (
    <main className="app">
      <button
        className="preview-button"
        onClick={() => setIsPreviewing((prev) => !prev)}
      >
        {isPreviewing ? "Back to Edit" : "Preview Resume"}
      </button>
      <div className="resume">
        <GeneralInfo isPreviewing={isPreviewing} />
        <Education isPreviewing={isPreviewing} />
        <Experience isPreviewing={isPreviewing} />
      </div>
    </main>
  );
}
