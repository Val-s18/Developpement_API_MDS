var express = require("express");
var router = express.Router();
var database = require("../database");
var hal = require("../hal");
var { checkTokenMiddleware } = require("../jwt");

//Ressource protégée par authentification
//Le middleware checkTokenMiddleware est appelé, puis celui qui est déclaré si next()
router.get(
  "/terrains/:id(\\d+)/reservations",

  (req, res, next) => {
    // console.log("traitement de la requête");
    console.log(res.locals.decodedToken);
    return res.send("A implementer...");
  }
);

// crée une réservation pour un terrain avec la date et l'heure
router.post("/terrains/:id(\\d+)/reservations", (req, res, next) => {
  const terrainId = parseInt(req.params.id);
  const { nom, date, heure } = req.body; // on récupère le nom, la date, et l'heure de la réservation

  // Vérifie si le terrain existe
  const terrain = database.terrains.find((t) => t.id === terrainId);
  if (!terrain) {
    return res.status(404).json({
      message: "Terrain non trouvé",
    });
  }

  // Vérifie que l'heure est dans l'intervalle autorisé (10h - 22h)
  const reservationDateTime = new Date(`${date}T${heure}:00`);
  const startHour = 10;
  const endHour = 22;
  const hour = reservationDateTime.getHours();

  if (hour < startHour || hour >= endHour) {
    return res.status(400).json({
      message: "L'heure de réservation doit être comprise entre 10h et 22h.",
    });
  }

  // Vérifie que la durée de la réservation est de 45 minutes
  const endReservationTime = new Date(
    reservationDateTime.getTime() + 45 * 60000
  ); // 45 minutes en millisecondes
  if (
    reservationDateTime.getMinutes() !== 0 &&
    reservationDateTime.getMinutes() !== 45
  ) {
    return res.status(400).json({
      message: "La réservation doit être d'une durée de 45 minutes.",
    });
  }

  // Vérifie si la date et l'heure sont déjà réservées pour ce terrain
  const existingReservation = database.reservations.find(
    (r) => r.terrainId === terrainId && r.date === date && r.heure === heure
  );
  if (existingReservation) {
    return res.status(400).json({
      message:
        "La date et l'heure demandées sont déjà réservées pour ce terrain.",
    });
  }

  // Crée la nouvelle réservation
  const reservation = {
    id: database.reservations.length + 1, // Génère un ID unique
    terrainId: terrainId, // ID du terrain
    nom: nom, // Nom de la personne qui réserve
    date: date, // Date de la réservation
    heure: heure, // Heure de la réservation
    endDateTime: endReservationTime.toISOString(), // Heure de fin de la réservation
  };

  // Ajoute la réservation dans la base de données
  database.reservations.push(reservation);

  // Retourne la réservation créée
  return res.status(201).json({
    message: "Réservation créée avec succès",
    reservation: reservation,
  });
});

// curl -X POST http://localhost:3000/terrains/1/reservations -H "Content-Type: application/json" -d '{"nom":"reservation","date":"2022-01-01"}'

module.exports = router;
