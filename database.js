// creation de ma base de données en class et constructor
// sous format class et constructor

var bcrypt = require("bcrypt");

const saltOrRounds = 10;

class Utilisateur {
  constructor(id, pseudo, isAdmin = false, psw) {
    this.id = id;
    this.pseudo = pseudo;
    this.isAdmin = isAdmin;
    this.psw =
      typeof psw === "string" ? bcrypt.hashSync(psw, saltOrRounds) : "";
  }
}

class Terrain {
  constructor(
    id,
    nom,
    description,
    date,
    heure,
    totalTime,
    numberOfPlayers,
    status
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.date = date;
    this.heure = heure;
    this.totalTime = totalTime;
    this.numberOfPlayers = numberOfPlayers;
    this.status = status;

    this.date.setHours(heure, 0, 0, 0);
  }
}

class Reservation {
  constructor(id, terrain, date, time, description) {
    this.id = id;
    this.terrain = terrain;
    this.date = date;
    this.time = time;
    this.description = description;
  }
}

const terrains = [
  new Terrain(
    1,
    "Terrain A",
    "Terrain A",
    new Date(2022, 1, 1),
    10,
    45,
    4,
    "Disponible"
  ),
  new Terrain(
    2,
    "Terrain B",
    "Terrain B",
    new Date(2022, 1, 2),
    10,
    45,
    4,
    "Disponible"
  ),
  new Terrain(
    3,
    "Terrain C",
    "Terrain C",
    new Date(2022, 1, 3),
    10,
    45,
    4,
    "Disponible"
  ),
  new Terrain(
    4,
    "Terrain D",
    "Terrain D",
    new Date(2022, 1, 4),
    10,
    45,
    4,
    "non-disponible"
  ),
]; // A

const utilisateurs = [
  new Utilisateur(1, "admybad", true, "admybad"),
  new Utilisateur(2, "pseudo2", true, "1234"),
];

const reservations = [
  new Reservation(
    1,
    1,
    new Date(2022, 1, 1),
    new Date(2022, 1, 1),
    "Reservation 1"
  ),
  new Reservation(
    2,
    1,
    new Date(2022, 1, 2),
    new Date(2022, 1, 2),
    "Reservation 2"
  ),
  new Reservation(
    3,
    1,
    new Date(2022, 1, 3),
    new Date(2022, 1, 3),
    "Reservation 3"
  ),
  new Reservation(
    4,
    1,
    new Date(2022, 1, 4),
    new Date(2022, 1, 4),
    "Reservation 4"
  ),
];

module.exports = {
  terrains,
  reservations,
  utilisateurs,
};
