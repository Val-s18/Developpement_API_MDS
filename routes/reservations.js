var express = require("express");
var router = express.Router();
var database = require("../database");

router.get(
  "/terrains/:id(\\d+)/reservations",

  (req, res, next) => {
    console.log(res.locals.decodedToken);
    return res.send("A implementer...");
  }
);

// Crée une réservation pour un terrain avec la date et l'heure

router.post("/terrains/:id(\\d+)/reservations", (req, res, next) => {
  const terrainId = parseInt(req.params.id);
  const { nom, date, heure } = req.body;

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

  const endReservationTime = new Date(
    reservationDateTime.getTime() + 45 * 60000
  );
  if (
    reservationDateTime.getMinutes() !== 0 &&
    reservationDateTime.getMinutes() !== 45
  ) {
    return res.status(400).json({
      message: "La réservation doit être d'une durée de 45 minutes.",
    });
  }

  const existingReservation = database.reservations.find(
    (r) => r.terrainId === terrainId && r.date === date && r.heure === heure
  );
  if (existingReservation) {
    return res.status(400).json({
      message:
        "La date et l'heure demandées sont déjà réservées pour ce terrain.",
    });
  }

  const reservation = {
    id: database.reservations.length + 1,
    terrainId: terrainId,
    nom: nom,
    date: date,
    heure: heure,
    endDateTime: endReservationTime.toISOString(),
  };

  database.reservations.push(reservation);

  return res.status(201).json({
    message: "Réservation créée avec succès",
    reservation: reservation,
  });
});

module.exports = router;
