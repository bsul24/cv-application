import { useState } from "react";

function createExperienceEntry() {
  return {
    company: "Fake Company",
    start: "2020",
    end: "2023",
    position: "Business Person",
    location: "New York, NY",
    responsibilities: [
      { text: "Finished a project.", id: crypto.randomUUID() },
      { text: "Trained some people.", id: crypto.randomUUID() },
      { text: "Increased revenue.", id: crypto.randomUUID() },
    ],
    id: crypto.randomUUID(),
  };
}

export default function Experience() {
  const [editingId, setEditingId] = useState(null);
  const [addingExperience, setAddingExperience] = useState(false);
  const [experienceData, setExperienceData] = useState(() => [
    createExperienceEntry(),
  ]);
  const [tempExperienceData, setTempExperienceData] = useState([]);
  const [newExperienceResp, setNewExperienceResp] = useState(() => [
    { text: "", id: crypto.randomUUID() },
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    setEditingId(null);
    setExperienceData(
      tempExperienceData.map((cur) => {
        return { ...cur };
      }),
    );
    setTempExperienceData([]);
  }

  function handleResponsibilityChange(e, cur, responsibility) {
    setTempExperienceData((prev) =>
      prev.map((el) => {
        if (el.id === cur.id) {
          const newResponsibilities = el.responsibilities.map(
            (curResponsibility) =>
              curResponsibility.id === responsibility.id
                ? {
                    ...curResponsibility,
                    text: e.target.value,
                  }
                : curResponsibility,
          );

          return {
            ...el,
            responsibilities: newResponsibilities,
          };
        }
        return el;
      }),
    );
  }

  function handleAddResponsibility(id) {
    setTempExperienceData((prev) =>
      prev.map((exp) => {
        if (exp.id === id) {
          const newExp = {
            ...exp,
            responsibilities: [
              ...exp.responsibilities,
              { text: "", id: crypto.randomUUID() },
            ],
          };

          return newExp;
        }
        return exp;
      }),
    );
  }

  function handleDeleteEditResponsibility(expId, respId) {
    setTempExperienceData((prev) =>
      prev.map((exp) => {
        if (exp.id === expId) {
          const newExp = {
            ...exp,
            responsibilities: exp.responsibilities.filter(
              (resp) => resp.id !== respId,
            ),
          };
          return newExp;
        }
        return exp;
      }),
    );
  }

  function handleDeleteExperience(id) {
    setExperienceData((prev) => prev.filter((data) => data.id !== id));
  }

  function handleChangeNewResponsibility(e, resp) {
    setNewExperienceResp((prev) =>
      prev.map((cur) =>
        cur.id === resp.id ? { ...cur, text: e.target.value } : cur,
      ),
    );
  }

  function handleNewExperienceSubmit(e) {
    e.preventDefault();

    const newExperienceForm = new FormData(e.target);

    const newExperience = {
      company: newExperienceForm.get("company"),
      start: newExperienceForm.get("start"),
      end: newExperienceForm.get("end"),
      position: newExperienceForm.get("position"),
      location: newExperienceForm.get("location"),
      responsibilities: newExperienceResp.filter(
        (resp) => resp.text.trim() !== "",
      ),
      id: crypto.randomUUID(),
    };

    setExperienceData((prev) => [...prev, newExperience]);
    setAddingExperience(false);
    setNewExperienceResp([{ text: "", id: crypto.randomUUID() }]);
  }

  function handleDeleteResponsibility(id) {
    setNewExperienceResp((prev) => prev.filter((exp) => exp.id !== id));
  }

  if (editingId !== null) {
    const cur = tempExperienceData.find((el) => el.id === editingId);

    if (!cur) {
      return null;
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="experience-info-block">
          <label htmlFor={"company-" + cur.id}>Company</label>
          <input
            type="text"
            name={"company-" + cur.id}
            id={"company-" + cur.id}
            value={cur.company}
            onChange={(e) => {
              setTempExperienceData(
                tempExperienceData.map((el) =>
                  el.id === cur.id ? { ...el, company: e.target.value } : el,
                ),
              );
            }}
          />
          <label htmlFor={"start-" + cur.id}>Start</label>
          <input
            type="text"
            name={"start-" + cur.id}
            id={"start-" + cur.id}
            value={cur.start}
            onChange={(e) => {
              setTempExperienceData(
                tempExperienceData.map((el) =>
                  el.id === cur.id ? { ...el, start: e.target.value } : el,
                ),
              );
            }}
          />
          <label htmlFor={"end-" + cur.id}>End</label>
          <input
            type="text"
            name={"end-" + cur.id}
            id={"end-" + cur.id}
            value={cur.end}
            onChange={(e) => {
              setTempExperienceData(
                tempExperienceData.map((el) =>
                  el.id === cur.id ? { ...el, end: e.target.value } : el,
                ),
              );
            }}
          />
          <label htmlFor={"position-" + cur.id}>Position</label>
          <input
            type="text"
            name={"position-" + cur.id}
            id={"position-" + cur.id}
            value={cur.position}
            onChange={(e) => {
              setTempExperienceData(
                tempExperienceData.map((el) =>
                  el.id === cur.id ? { ...el, position: e.target.value } : el,
                ),
              );
            }}
          />
          <label htmlFor={"location-" + cur.id}>Location</label>
          <input
            type="text"
            name={"location-" + cur.id}
            id={"location-" + cur.id}
            value={cur.location}
            onChange={(e) => {
              setTempExperienceData(
                tempExperienceData.map((el) =>
                  el.id === cur.id ? { ...el, location: e.target.value } : el,
                ),
              );
            }}
          />
          <fieldset>
            <legend>Responsibilities</legend>
            {cur.responsibilities.map((responsibility, index) => {
              const responsibilityId = `responsibility-${cur.id}-${index}`;

              return (
                <div key={responsibility.id}>
                  <label htmlFor={responsibilityId}>
                    Responsibility {index + 1}
                  </label>
                  <input
                    type="text"
                    name={responsibilityId}
                    id={responsibilityId}
                    value={responsibility.text}
                    onChange={(e) =>
                      handleResponsibilityChange(e, cur, responsibility)
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteEditResponsibility(cur.id, responsibility.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </fieldset>
          <button type="button" onClick={() => handleAddResponsibility(cur.id)}>
            Add Responsibility
          </button>
        </div>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setTempExperienceData([]);
          }}
        >
          Cancel
        </button>
      </form>
    );
  }

  if (addingExperience) {
    return (
      <form
        onSubmit={handleNewExperienceSubmit}
        className="new-experience-form"
      >
        <label htmlFor="experience-company">Company</label>
        <input type="text" name="company" id="experience-company" />
        <label htmlFor="experience-start">Start</label>
        <input type="text" name="start" id="experience-start" />
        <label htmlFor="experience-end">End</label>
        <input type="text" name="end" id="experience-end" />
        <label htmlFor="experience-position">Position</label>
        <input type="text" name="position" id="experience-position" />
        <label htmlFor="experience-location">Location</label>
        <input type="text" name="location" id="experience-location" />
        <fieldset>
          <legend>Responsibilities</legend>
          {newExperienceResp.map((resp, index) => {
            const responsibilityId = `responsibility-${resp.id}-${index}`;

            return (
              <div key={resp.id}>
                <label htmlFor={responsibilityId}>
                  Responsibility {index + 1}
                </label>
                <input
                  type="text"
                  name={responsibilityId}
                  id={responsibilityId}
                  value={resp.text}
                  onChange={(e) => handleChangeNewResponsibility(e, resp)}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteResponsibility(resp.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() =>
              setNewExperienceResp((prev) => [
                ...prev,
                { text: "", id: crypto.randomUUID() },
              ])
            }
          >
            Add Responsibility
          </button>
        </fieldset>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setAddingExperience(false);
            setNewExperienceResp([{ text: "", id: crypto.randomUUID() }]);
          }}
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <section className="experience">
      {experienceData.map((cur) => {
        return (
          <div className="experience-info" key={cur.id}>
            <h3>{cur.company}</h3>
            <h4>
              {cur.start} — {cur.end}
            </h4>
            <h4>{cur.position}</h4>
            <h4>{cur.location}</h4>
            <ul>
              {cur.responsibilities.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setTempExperienceData(
                  experienceData.map((cur) => {
                    return { ...cur };
                  }),
                );
                setEditingId(cur.id);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDeleteExperience(cur.id)}
            >
              Delete Experience
            </button>
          </div>
        );
      })}
      <button type="button" onClick={() => setAddingExperience(true)}>
        Add Experience
      </button>
    </section>
  );
}
