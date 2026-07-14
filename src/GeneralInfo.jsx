import { useState } from "react";
import "./styles/GeneralInfo.css";

export default function GeneralInfo({ isPreviewing }) {
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("John Smith");
  const [tempName, setTempName] = useState("John Smith");
  const [phoneNumber, setPhoneNumber] = useState("555-555-5555");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("555-555-5555");
  const [email, setEmail] = useState("example@email.com");
  const [tempEmail, setTempEmail] = useState("example@email.com");

  function handleSubmit(e) {
    e.preventDefault();

    setFullName(tempName);
    setPhoneNumber(tempPhoneNumber);
    setEmail(tempEmail);
    setEditing(false);
  }

  function handleEdit() {
    setTempName(fullName);
    setTempPhoneNumber(phoneNumber);
    setTempEmail(email);
    setEditing(true);
  }

  function handleCancel() {
    setTempName(fullName);
    setTempPhoneNumber(phoneNumber);
    setTempEmail(email);
    setEditing(false);
  }

  if (editing && !isPreviewing) {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={tempPhoneNumber}
          onChange={(e) => setTempPhoneNumber(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={tempEmail}
          onChange={(e) => setTempEmail(e.target.value)}
        />
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <section className="general-info">
      <h1>{fullName}</h1>
      <div className="secondary-info">
        <p>{phoneNumber}</p>
        <p>{email}</p>
      </div>
      {!isPreviewing && <button onClick={handleEdit}>Edit</button>}
    </section>
  );
}
