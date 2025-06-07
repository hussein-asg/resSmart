import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom"; //låter oss  navigera till en annan sida (URL) i  React-appen
import { Link } from "react-router-dom";

//  definierar en "typ" som heter Flight för att beskriva hur ett flygobjekt ska se ut,
type Flight = {
  depart_date: string;
  origin: string;
  destination: string;
  gate: string;
  value: number;
  number_of_changes: number;
  duration: number;
};

function Resultat() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true); //när datan har inte hämtat ska det visas Laddar flygdata med hjälp av detta

  // const navigate = useNavigate(); //Detta skapar en funktion som vi sen kan anropa när vi vill skicka användaren till en ny sida

  useEffect(() => {
    fetch("/flygpriser")
      .then((response) => response.json()) //omvandlar den från JSON-text till ett JavaScript-objekt
      .then((json) => {
        setFlights(json.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Kunde inte hämta flygpriser", error);
        setLoading(false);
      });
  }, []);
  //console.log(flights);

  if (loading) {
    //om loading var true, skriv detta
    return <p style={{ fontSize: "4rem" }}>Laddar flygdata...</p>;
  }

  if (flights.length === 0) {
    return <p>Inga flyg hittades.</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Flygpriser</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem", //avstånd mellan elementen
        }}
      >
        {flights.map((flight, index) => (
          <div
            key={index}
            /* istället för index kan jag använda tex flight.id */
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "transform 0.2s ease",
              flex: "1 1 300px",
              maxWidth: 300,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div style={{ fontSize: 18, fontWeight: "600" }}>
              {flight.origin} ➜ {flight.destination}
            </div>
            <div style={{ color: "#555" }}>
              Datum: <strong>{flight.depart_date}</strong>
            </div>
            <div>
              Pris:{" "}
              <strong style={{ fontSize: 20, color: "#4caf50" }}>
                {flight.value} kr
              </strong>
            </div>
            <div>Byten: {flight.number_of_changes}</div>
            <div>Restid: {flight.duration} min</div>
            <div style={{ fontStyle: "italic", color: "#888" }}>
              Hittad via: {flight.gate}
            </div>
            {/*  <button
              onClick={() => navigate(`/flyg/${index}`, { state: { flight } })}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                padding: "0.625rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Boka
            </button> */}
            <Link
              to={`/flyg/${index}`}
              state={{ flight }} //med state så skickar jag objektet flight till nästa sida
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                padding: "0.625rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                textDecoration: "none", // tar bort understrykning
                display: "inline-block",
                textAlign: "center",
              }}
            >
              Boka flyg
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resultat;
