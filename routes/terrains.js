var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal");
var { checkTokenMiddleware } = require("../jwt");

router.get("/terrains", function (req, res) {
  const resourceObject = hal.mapTerrainToListResourceObject(db.terrains);
  res.json(resourceObject);
});

// GET  Voir les différents terrains

router.get("/terrains/:id(\\d+)", function (req, res, next) {
  const terrain = db.terrains.find((t) => t.id == req.params.id);
  if (!terrain) {
    return res.status(404).json({
      message: "Terrain non trouvé",
    });
  }

  const resourceObject = hal.mapTerrainToResourceObject(terrain);
  return res.json(resourceObject);
});

// DETELE  Supprimer terrain Indisponible

router.delete(
  "/terrains/:id(\\d+)",
  checkTokenMiddleware,
  function (req, res, next) {
    const terrain = db.terrains.find((t) => t.id == req.params.id);
    if (!terrain) {
      return res.status(404).json({
        message: "Terrain non trouvé",
      });
    }

    db.terrains = db.terrains.filter((t) => t.id != req.params.id);
    return res.json({
      message: "Terrain plus disponible peut pas etre utiliser pour le moment",
    });
  }
);

// POST CREATE terrains

router.post("/terrains", checkTokenMiddleware, function (req, res, next) {
  const terrain = {
    id: db.terrains.length + 1,
    terrainId: req.body.id,
    nom: req.body.nom,
    description: req.body.description,
    date: req.body.date,
    status: req.body.status,
  };

  db.terrains.push(terrain);
  return res.json(terrain);
});

module.exports = router;
