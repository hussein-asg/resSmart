import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface Flight {
  origin: string;
  destination: string;
  depart_date: string;
  value: number;
  number_of_changes: number;
  duration: number;
  gate: string;
}

interface BookingData {
  namn: string;
  email: string;
  tel: string;
  flightId: string | undefined;
  flightInfo: Flight;
}

function Flygdetaljer() {
  const { state } = useLocation();
  const { id } = useParams();

  if (!state || !state.flight) {
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "2rem" }}>
        Ingen flyginformation tillgänglig.
      </p>
    );
  }

  const flight: Flight = state.flight;

  // State för kontrollerade formulärfält
  const [namn, setNamn] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: BookingData = {
      namn,
      email,
      tel,
      flightId: id,
      flightInfo: flight,
    };

    const response = await fetch("/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Bokning skickad!");
      // Rensa formuläret efter bokning lyckad
      setNamn("");
      setEmail("");
      setTel("");
    } else {
      alert("Något gick fel vid bokningen.");
    }
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Detaljer för flyg {id}</h2>

      <div>
        <p style={infoRowStyle}>
          <strong>Från:</strong> {flight.origin}
        </p>
        <p style={infoRowStyle}>
          <strong>Till:</strong> {flight.destination}
        </p>
        <p style={infoRowStyle}>
          <strong>Datum:</strong> {flight.depart_date}
        </p>
        <p style={infoRowStyle}>
          <strong>Pris:</strong>{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>
            {flight.value}
          </span>{" "}
          kr
        </p>
        <p style={infoRowStyle}>
          <strong>Byten:</strong> {flight.number_of_changes}
        </p>
        <p style={infoRowStyle}>
          <strong>Restid:</strong> {flight.duration} min
        </p>
        <p style={infoRowStyle}>
          <strong>Gate:</strong> {flight.gate}
        </p>
      </div>

      <h3 style={{ ...headingStyle, fontSize: "1.25rem" }}>Bokningsformulär</h3>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Namn:</label>
        <input
          type="text"
          name="namn"
          value={namn}
          onChange={(e) => setNamn(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>E-post:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Telefonnummer:</label>
        <input
          type="tel"
          name="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Bekräfta bokning
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: "600px",
  margin: "2rem auto",
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  fontFamily: "Arial, sans-serif",
};

const headingStyle = {
  color: "#1a3e72",
  marginBottom: "1rem",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginTop: "1rem",
  marginBottom: "0.3rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  marginTop: "1.5rem",
  backgroundColor: "#1a3e72",
  color: "white",
  border: "none",
  padding: "0.75rem 1.5rem",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
};

const infoRowStyle = {
  marginBottom: "0.5rem",
};

export default Flygdetaljer;
