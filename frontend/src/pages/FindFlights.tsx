import { useState } from "react";
import { useNavigate } from "react-router-dom";
// här använder jag navigate för att gå till sidan "resultat" efter att vi har skickat sökningen till servern
function FindFlights() {
  const [from, setFrom] = useState("ARN");
  const [to, setTo] = useState("LON");
  //const [avresa, setAvresa] = useState("");

  const navigate = useNavigate();
  //Anropa funktionen useNavigate() och spara resultatet i variabeln navigate
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); //med detta gör vi att sidan inte laddas om när man trycker på knappen sök
    const data = {
      from,
      to,
      // avresa,
    };

    console.log(data);
    await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    navigate("/resultat"); // navigera till resultat efter fetch
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height:
            "80vh" /* vh står för "viewport height" – alltså höjden på webbläsarfönstret. */,
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Här hittar du de mest prisvärda flygresorna till din drömdestination
          för nästa månad
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#d0e7f9", // mjuk ljusblå ton
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
            margin: "2rem auto",
            padding: "1.5rem 2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            gap: "1rem",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required /* använder required för att ett alternativ måste väljs */
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "1.5px solid #a0bcd6",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          >
            <option value="GOT">Göteborg</option>
            <option value="ARN">Stockholm</option>
            <option value="AGP">Málaga</option>
            <option value="BCN">Barcelona</option>
            <option value="ALC">Alicante</option>
            <option value="LON">London (alla flygplatser)</option>
            <option value="CDG">Paris Charles de Gaulle</option>
            <option value="BKK">Bangkok</option>
            <option value="JFK">New York (JFK)</option>
            <option value="FCO">Rom (Fiumicino)</option>
            <option value="IST">Istanbul</option>
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            style={{
              flex: 1,
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "1.5px solid #a0bcd6",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          >
            <option value="BCN">Barcelona</option>
            <option value="GOT">Göteborg</option>
            <option value="ARN">Stockholm</option>
            <option value="AGP">Málaga</option>
            <option value="ALC">Alicante</option>
            <option value="LON">London (alla flygplatser)</option>
            <option value="CDG">Paris Charles de Gaulle</option>
            <option value="BKK">Bangkok</option>
            <option value="JFK">New York (JFK)</option>
            <option value="FCO">Rom (Fiumicino)</option>
            <option value="IST">Istanbul</option>
          </select>

          {/* <select
          value={avresa}
          onChange={(e) => setAvresa(e.target.value)}
          required
          style={{
            flex: 1,
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "1.5px solid #a0bcd6",
            fontSize: "1rem",
            transition: "border-color 0.3s ease",
          }}
        >
          <option value="">Välj månad</option>
          <option value="2025-01">Januari</option>
          <option value="2025-02">Februari</option>
          <option value="2025-03">Mars</option>
          <option value="2025-04">April</option>
          <option value="2025-05">Maj</option>
          <option value="2025-06">Juni</option>
          <option value="2025-07">Juli</option>
          <option value="2025-08">Augusti</option>
          <option value="2025-09">September</option>
          <option value="2025-10">Oktober</option>
          <option value="2025-11">November</option>
          <option value="2025-12">December</option>
        </select> */}

          <button
            type="submit"
            style={{
              flex: 0.8,
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
              padding: "0.6rem 1rem",
              alignSelf: "center",
            }}
          >
            Sök
          </button>
        </form>
      </div>{" "}
    </>
  );
}
export default FindFlights;
