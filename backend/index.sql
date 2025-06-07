CREATE TABLE bokning (
  id SERIAL PRIMARY KEY,
  namn TEXT,
  email TEXT,
  tel TEXT,
  flightid TEXT,
  depart_date TEXT,
  origin TEXT,
  destination TEXT,
  pris NUMERIC
);