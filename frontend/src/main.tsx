import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

//createRoot säger åt React att
// "ta över" det HTML-elementet som har id root i index.html
createRoot(document.getElementById("root")!).render(
  /*   StrictMode renderar komponenter två gånger (endast i utveckling)
    För att hitta problem i t.ex. useEffect, useState, så det är bra för att hita fel, och tas bort automatiskt i produktion . */
  <StrictMode>
    <App />
  </StrictMode>
);
