import { useState } from "react";

export default function GeneralInfo() {
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("John Smith");
  const [tempName, setTempName] = useState("John Smith");
  const [phoneNumber, setPhoneNumber] = useState("555-555-5555");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("555-555-5555");
  const [email, setEmail] = useState("example@email.com");
  const [tempEmail, setTempEmail] = useState("example@email.com");

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
    setFullName(document.querySelector("#fullName").value);
    setPhoneNumber(document.querySelector("#phoneNumber").value);
    setEmail(document.querySelector("#email").value);
  }

  if (editing) {
    return (
      <form action="#" onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setEditing(false);
            setTempName(fullName);
            setTempPhoneNumber(phoneNumber);
            setTempEmail(email);
          }}
        >
          Cancel
        </button>
      </form>
    );
  }
  return (
    <section className="general-info">
      <h1>{fullName}</h1>
      <h2>{phoneNumber}</h2>
      <h2>{email}</h2>
      <button onClick={() => setEditing(true)}>Edit</button>
    </section>
  );
}
