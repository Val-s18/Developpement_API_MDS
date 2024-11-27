// crée un post pour le login
var express = require("express");
var router = express.Router();
var database = require("../database");
var hal = require("../hal");
var bcrypt = require("bcrypt");
var jwt = require("../jwt");
const rateLimit = require("express-rate-limit");

/**
 * Retourne vrai si l'user est authentifié par le système, faux sinon
 * @param {} login
 * @param {*} psw
 * @returnsbcrypt
 */

function isAuthentificated(login, password) {
  const user = database.utilisateurs.find((user) => {
    return user.pseudo === login && bcrypt.compareSync(password, user.psw);
  });

  if (user === undefined) return false;

  return true;
}

function findUserByPseudo(pseudo) {
  return database.utilisateurs.find((user) => user.pseudo === pseudo);
}

/**
 * Retourne vrai si l'user est admin, faux sinon
 * @param {} pseudo
 * @returns
 */
function isAdmin(pseudo) {
  const user = findUserByPseudo(pseudo);
  return user && user.isAdmin;
}

// ajout d'une boucle de rateLimit pour limiter le nombre de connexion par IP

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Trop de tentatives de connexion. Essayez plus tard.",
});

const whiteList = ["admybad"];
const blackList = ["pseudo2"];

router.post("/login", loginLimiter, (req, res, next) => {
  const login = req.body.pseudo;
  const password = req.body.psw;

  // j'ai mis le pseudo par simplicité et pour comprendre comment ça fonctionne mais le mieux est de passer par le password

  if (blackList.includes(login)) {
    return res.status(403).send("Accès interdit : IP bloquée");
  }

  const isAuthAsAdmin = isAuthentificated(login, password) && isAdmin(login);

  if (!isAuthAsAdmin) {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/login"),
      },
      message: "Vous n'avez pas accès à cette ressource.",
    };
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
    return;
  }

  //User est authentifié et admin: Génération d'un JSON Web Token

  const accessToken = jwt.createJWT(login, true, "1 day");

  let responseObject = {
    _links: {
      self: hal.halLinkObject("/login"),

      reservations: hal.halLinkObject(
        "/terrains/{id}/reservations",
        "string",
        "",
        true
      ),
    },
    jwt: accessToken,
    message: `Bienvenue ${login} !`,
  };

  if (whiteList.includes(login)) {
    return res.status(200).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }
});

module.exports = router;
