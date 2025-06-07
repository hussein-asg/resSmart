"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Laddar in inställningar från .env-filen (t.ex. lösenord och databasadress)
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Hämtar ett verktyg från pg-paketet som hjälper oss att prata med PostgreSQL-databasen
//Använder Pool isstället för client
const pg_1 = require("pg");
// Startar dotenv så att vi kan använda miljövariabler från .env
dotenv_1.default.config();
// Bestämmer vilket portnummer vår server ska använda (8080)
//const port = 8080;
const port = process.env.PORT || 8080;
// Skapar en ny Express-server
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// Skapar en anslutning till databasen med hjälp av information från .env-filen
const pool = new pg_1.Pool({
    connectionString: process.env.PGURI, // t.ex. PGURI=postgres://användare:lösenord@localhost:5432/databasnamn
});
let newSearch;
// Middleware för att hantera JSON i request body
// Hämta sökningen
//med detta vad besökare sökte efter
server.get("/userAsk", (req, res) => {
    res.send(newSearch);
});
// Lägg till en ny sökning
server.post("/", (req, res) => {
    const { from, to, avresa } = req.body;
    newSearch = {
        from: from,
        to: to,
        avresa: avresa,
    };
    res.status(201).json({ newSearch });
});
//hämta flyg priserna enligt sökningen
server.get("/flygpriser", (req, res) => {
    const from = newSearch.from;
    const to = newSearch.to;
    //const avresa = newSearch.avresa;
    //ska jobba med avresa senare
    const url = `https://api.travelpayouts.com/v2/prices/month-matrix?currency=sek&origin=${from}&destination=${to}&month=2025-07&token=32c43c589a988df9ef550cafbf8edafc`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => res.json(data))
        .catch(() => res.status(500).send("Något gick fel"));
});
//  spara bokningen i database
server.post("/booking", (req, res) => {
    console.log(" bokningsdata:", req.body);
    const { namn, email, tel, flightId, flightInfo } = req.body;
    const query = `
      INSERT INTO bokning 
      (namn, email, tel, flightId, depart_date, origin, destination, pris)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [
        namn,
        email,
        tel,
        flightId,
        flightInfo.depart_date,
        flightInfo.origin,
        flightInfo.destination,
        flightInfo.value,
    ];
    pool.query(query, values).then((result) => {
        res
            .status(201)
            .json({ message: "Bokning sparad", bokning: result.rows[0] });
    });
});
server.get("/bokninglista", (req, res) => {
    const query = `SELECT * FROM bokning ORDER BY id DESC`;
    pool.query(query).then((result) => {
        res.status(200).json(result.rows); // Skickar alla bokningar som JSON
    });
});
//förslg stockholm till andra populära ställe
server.get("/api/flights", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination } = req.query;
    const token = "32c43c589a988df9ef550cafbf8edafc";
    const url = `https://api.travelpayouts.com/v2/prices/month-matrix?currency=sek&origin=${origin}&destination=${destination}&month=2025-07&token=${token}`;
    const response = yield fetch(url);
    const data = yield response.json();
    res.json(data);
}));
server.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "dist")));
// Starta servern
server.listen(port, () => {
    console.log(`Servern lyssnar på http://localhost:${port}`);
});
