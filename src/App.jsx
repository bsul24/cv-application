import GeneralInfo from "./components/GeneralInfo.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import "./styles/App.css";
import "./styles/Forms.css";
import "./styles/Controls.css";
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
