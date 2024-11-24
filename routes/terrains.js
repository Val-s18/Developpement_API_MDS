var express = require("express");
var router = express.Router();
var db = require("../database");
var hal = require("../hal");
var { checkTokenMiddleware } = require("../jwt");

router.get("/terrains", function (req, res) {
  const resourceObject = hal.mapTerrainToListResourceObject(db.terrains);
  res.json(resourceObject);
});

// terrains/{id}
router.get("/terrains/:id(\\d+)", function (req, res, next) {
  const terrain = db.terrains.find((t) => t.id == req.params.id);
  if (!terrain) {
    return res.status(404).json({
      message: "Terrain non trouvé",
    });
  }

  // Utiliser la fonction pour un seul terrain
  const resourceObject = hal.mapTerrainToResourceObject(terrain);
  return res.json(resourceObject);
});

// a voir apres comment faire pour le bloquer avec un token
// supprimer un terrain avec le login  il faut au moins avoir un compte pour supprimer un terrain
// il faut que le login  passe par la pour quon soit obliger de le taper pour supprimer un terrain

// delete terrain

// qu'elle est la requete curl pour supprimer un terrain
// curl -X DELETE http://localhost:3000/terrains/1

// Il faut que j'arrive a bloquer c'est deux route avec le token et le login je vais commencer par le post

// curl -X DELETE http://localhost:3000/terrains/1 \
//   -H "Authorization: Bearer <ton_token_jwt>"

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

// crée un terrain avec le login

// curl -X POST http://localhost:3000/terrains -H "Content-Type: application/json" -d '{"nom":"terrain","description":"terrain","date":"2022-01-01","totalTime":45,"numberOfPlayers":4,"status":"Disponible"}'

// crée un terrain avec le login

// curl -X POST http://localhost:3000/terrains \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer <ton_token_jwt>" \
//   -d '{"nom":"terrain1","description":"terrain A","date":"2022-01-01","status":"Disponible"}'

router.post("/terrains", checkTokenMiddleware, function (req, res, next) {
  const terrain = {
    id: db.terrains.length + 1, // ID unique basé sur la taille de la liste
    terrainId: req.body.id, // ID fourni dans la requête
    nom: req.body.nom, // Nom du terrain
    description: req.body.description, // Description
    date: req.body.date, // Date
    status: req.body.status, // Statut
  };

  db.terrains.push(terrain); // Ajoute le terrain dans la base
  return res.json(terrain); // Retourne le terrain ajouté
});

// quel va etre ma reuqette curl pour creer un terrain avec le login

// curl -X POST http://localhost:3000/terrains -H "Content-Type: application/json" -d '{"nom":"terrain","description":"terrain","date":"2022-01-01","totalTime":45,"numberOfPlayers":4,"status":"Disponible"}'

module.exports = router;
