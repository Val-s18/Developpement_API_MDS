var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Importe mes routeurs
var routerTerrains = require("./routes/terrains");
var routerReservations = require("./routes/reservations");
var routerLogin = require("./routes/login");

var app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Enregistrer les routeurs avec leurs routes de base

app.use(routerTerrains, routerLogin, routerReservations);

module.exports = app;
