import { useState } from "react";

function createEducationEntry() {
  return {
    schoolName: "Example University",
    start: "2010",
    end: "2014",
    degree: "Bachelor of Science in Something",
    location: "New York, NY",
    gpa: "3.9",
    gpaScale: "4.0",
    id: crypto.randomUUID(),
  };
}

export default function Education() {
  const [editingId, setEditingId] = useState(null);
  const [addingEducation, setAddingEducation] = useState(false);
  const [educationData, setEducationData] = useState(() => [
    createEducationEntry(),
  ]);
  const [tempEducationData, setTempEducationData] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setEditingId(null);
    setEducationData(
      tempEducationData.map((cur) => {
        return { ...cur };
      }),
    );
    setTempEducationData([]);
  }

  function handleNewEducationSubmit(e) {
    e.preventDefault();

    const newEducationForm = new FormData(e.target);

    const newEducation = {
      schoolName: newEducationForm.get("school-name"),
      start: newEducationForm.get("start"),
      end: newEducationForm.get("end"),
      degree: newEducationForm.get("degree"),
      location: newEducationForm.get("location"),
      gpa: newEducationForm.get("gpa"),
      gpaScale: newEducationForm.get("gpa-scale"),
      id: crypto.randomUUID(),
    };

    setEducationData((prev) => [...prev, newEducation]);
    setAddingEducation(false);
  }

  function handleDeleteEducation(id) {
    setEducationData((prev) => prev.filter((data) => data.id !== id));
  }

  if (editingId !== null) {
    const cur = tempEducationData.find((el) => el.id === editingId);

    if (!cur) {
      return null;
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="education-info-block">
          <label htmlFor={"school-name-" + cur.id}>School Name</label>
          <input
            type="text"
            name={"school-name-" + cur.id}
            id={"school-name-" + cur.id}
            value={cur.schoolName}
            onChange={(e) => {
              setTempEducationData(
                tempEducationData.map((el) =>
                  el.id === cur.id ? { ...el, schoolName: e.target.value } : el,
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
              setTempEducationData(
                tempEducationData.map((el) =>
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
              setTempEducationData(
                tempEducationData.map((el) =>
                  el.id === cur.id ? { ...el, end: e.target.value } : el,
                ),
              );
            }}
          />
          <label htmlFor={"degree-" + cur.id}>Degree</label>
          <input
            type="text"
            name={"degree-" + cur.id}
            id={"degree-" + cur.id}
            value={cur.degree}
            onChange={(e) =>
              setTempEducationData(
                tempEducationData.map((el) =>
                  el.id === cur.id ? { ...el, degree: e.target.value } : el,
                ),
              )
            }
          />
          <label htmlFor={"location-" + cur.id}>Location</label>
          <input
            type="text"
            name={"location-" + cur.id}
            id={"location-" + cur.id}
            value={cur.location}
            onChange={(e) =>
              setTempEducationData(
                tempEducationData.map((el) =>
                  el.id === cur.id ? { ...el, location: e.target.value } : el,
                ),
              )
            }
          />
          <label htmlFor={"gpa-" + cur.id}>GPA</label>
          <input
            type="text"
            name={"gpa-" + cur.id}
            id={"gpa-" + cur.id}
            value={cur.gpa}
            onChange={(e) =>
              setTempEducationData(
                tempEducationData.map((el) =>
                  el.id === cur.id ? { ...el, gpa: e.target.value } : el,
                ),
              )
            }
          />
          <label htmlFor={"gpa-scale-" + cur.id}>GPA Scale</label>
          <input
            type="text"
            name={"gpa-scale-" + cur.id}
            id={"gpa-scale-" + cur.id}
            value={cur.gpaScale}
            onChange={(e) =>
              setTempEducationData(
                tempEducationData.map((el) =>
                  el.id === cur.id ? { ...el, gpaScale: e.target.value } : el,
                ),
              )
            }
          />
        </div>

        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setTempEducationData([]);
          }}
        >
          Cancel
        </button>
      </form>
    );
  }

  if (addingEducation) {
    return (
      <form onSubmit={handleNewEducationSubmit} className="new-education-form">
        <label htmlFor="education-school-name">School Name</label>
        <input type="text" name="school-name" id="education-school-name" />

        <label htmlFor="education-start">Start</label>
        <input type="text" name="start" id="education-start" />

        <label htmlFor="education-end">End</label>
        <input type="text" name="end" id="education-end" />

        <label htmlFor="education-degree">Degree</label>
        <input type="text" name="degree" id="education-degree" />

        <label htmlFor="education-location">Location</label>
        <input type="text" name="location" id="education-location" />

        <label htmlFor="education-gpa">GPA</label>
        <input type="text" name="gpa" id="education-gpa" />

        <label htmlFor="education-gpa-scale">GPA Scale</label>
        <input type="text" name="gpa-scale" id="education-gpa-scale" />

        <button type="submit">Submit</button>

        <button type="button" onClick={() => setAddingEducation(false)}>
          Cancel
        </button>
      </form>
    );
  }

  return (
    <section className="education">
      {educationData.map((cur) => {
        return (
          <div className="education-info" key={cur.id}>
            <h3>{cur.schoolName}</h3>
            <h4>
              {cur.start} — {cur.end}
            </h4>
            <h4>{cur.degree}</h4>
            <h4>{cur.location}</h4>
            <h4>
              GPA: {cur.gpa}/{cur.gpaScale}
            </h4>
            <button
              onClick={() => {
                setTempEducationData(
                  educationData.map((cur) => {
                    return { ...cur };
                  }),
                );
                setEditingId(cur.id);
              }}
            >
              Edit
            </button>
            <button type="button" onClick={() => handleDeleteEducation(cur.id)}>
              Delete Education
            </button>
          </div>
        );
      })}
      <button onClick={() => setAddingEducation(true)}>Add Education</button>
    </section>
  );
}
