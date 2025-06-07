import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bokning from "./pages/Bokning";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar.tsx";
import "./App.css";
import FindFlights from "./pages/FindFlights.tsx";
import OmOss from "./pages/OmOss.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Resultat from "./pages/Resultat.tsx";
function App() {
  return (
    <div className="app-wrapper">
      <Router>
        {/* Allt som använder routing måste ligga här inne */}
        <Navbar />
        <Routes>
          {/* Om man skriver flera <Route> utan <Routes> runt, 
          kommer alla matchande komponenter visas samtidigt
           */}
          <Route path="/" element={<FindFlights />} />
          <Route path="/om" element={<OmOss />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/Resultat" element={<Resultat />} />
          <Route path="/flyg/:id" element={<Bokning />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
