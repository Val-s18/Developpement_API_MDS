# Developpement_API_MDS

Ce projet consiste à créer une API pour la gestion de terrains de badminton, avec des fonctionnalités de réservation et d'administration.

## Lancer le projet

Pour démarrer le projet, exécutez les commandes suivantes :

```bash
npm install

npm run start
```

Table des matières

- [Developpement\_API\_MDS](#developpement_api_mds)
  - [Lancer le projet](#lancer-le-projet)
  - [requette curl pour tester le projet](#requette-curl-pour-tester-le-projet)
  - [Spécification du projet](#spécification-du-projet)
- [Document de conception](#document-de-conception)
  - [Dictionnaire des données](#dictionnaire-des-données)
  - [Liste des resources](#liste-des-resources)
  - [Sécurité](#sécurité)
  - [Documentation](#documentation)
  - [Mon ressenti sur le projet](#mon-ressenti-sur-le-projet)

## requette curl pour tester le projet

requete qui permet de récupérer la liste des terrains

```bash
curl -X GET http://localhost:3000/terrains
```

requete qui permet de crée un terrain avec un post et authentification

```bash
// curl -X POST http://localhost:3000/terrains \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer <ton_token_jwt>" \
// -d '{"nom":"terrain1","description":"terrain A","date":"2022-01-01","status":"Disponible"}'
```

requete qui permet de supprimer un terrain avec un delete et authentification si in terrain est indisponilbe

```bash
// curl -X DELETE http://localhost:3000/terrains/1 \
// -H "Authorization: Bearer <ton_token_jwt>"

```

requete post qui permet de se connecter

```bash
 curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
-d '{"pseudo": "pseudo1", "psw": "1234"}'

```

requete post qui permet de se connecter et de reservé un terrain avec le nom et une date

```bash
curl -X POST http://localhost:3000/terrains/1/reservations \
-H "Content-Type: application/json" \
-d '{
  "nom": "Jean Dupont",
  "date": "2024-12-05",
  "heure": "14:00"
}'

```

## Spécification du projet

1.  utilisateur consulte la liste de terrain de badminton

2.  l'utilisateur regarde les disponibilité des 4 terrrain

3.  il reserve un creneau de 45 min avec son pseudo

4.  l'utilisateur reserve que la semaine de 10h a 20h de cette semaine si

5.  l'utilisateur peut annuler une reservation

6.  l'utilisateur peut confirmer une reservation

le terrain B a un probleme d'étenchéité donc il ne peut pas être réservév et est indisponible temporairement !!!

# Document de conception

## Dictionnaire des données

| Code                    | Libelé                                          | Type    | obligation      | remarque             |
| :---------------------- | :---------------------------------------------- | :------ | :-------------- | :------------------- |
| id-pseudo               | l'identifiant d'un utilisateur                  | int     | obligatoire     | unique               |
| is-admin                | le rôle de l'utilisateur admin ou pour réserver | boolean | obligatoire     | unique               |
| id-terrain              | identifiant du terrain                          | int     | obligatoire     | unique               |
| statut-terrain          | si le statut du terrain est disponible ou non   | text    | obligatoire     |                      |
| date-terrain            | date de la date du terrain                      | date    | obligatoire     | au format YYYY-MM-DD |
| date-debut-reservation  | date de début de la réservation                 | date    | obligatoire     | au format YYYY-MM-DD |
| date-fin-reservation    | date de fin de la réservation                   | date    | obligatoire     | au format YYYY-MM-DD |
| date-reservation        | quel jour est la réservation                    | date    | obligatoire     | au format YYYY-MM-DD |
| id-reservation          | identifiant de la réservation                   | int     | obligatoire     |                      |
| description-reservation | description de la réservation                   | text    | obligatoire     | unique               |
| confirmation            | Valeur prise par le terrain de badminton        | boolean | non-obligatoire |                      |
| confirmer               | valeur prise par le terrain de badminton        | boolean | obligatoire     |                      |
| supprimer               | suppressions de la réservation                  | boolean | obligatoire     |                      |
| total-temps-terrain     | le temps total du terrain réservé               | int     | non-obligatoire | au format HH:MM      |
| nombre-terrain          | nombre de terrains de badminton                 | int     | obligatoire     |                      |

## Liste des resources

| Ressource                        | URI                                     | Verbes HTTP              | Params | Commentaire                                                  |
| -------------------------------- | --------------------------------------- | ------------------------ | ------ | ------------------------------------------------------------ |
| Liste des terrains disponible    | /terrains                               | GET, HEAD, OPTIONS       | x      | Récupère la liste de tous les terrains disponibles.          |
| Liste des terrains déjà réservés | /terrains/{id terrain}/reservation      | GET, POST, HEAD, OPTIONS | x      | Récupère ou crée une réservation pour un terrain spécifique. |
| Les informations d'un terrain    | /terrains/{id terrain}                  | GET, HEAD, OPTIONS       | x      | Récupère les détails d'un terrain spécifique.                |
| Ajouter un terrain               | /terrains                               | POST, HEAD, OPTIONS      | x      | Permet d'ajouter un nouveau terrain à la base de données.    |
| Supprimer un terrain             | /terrains/{id terrain}                  | DELETE, HEAD, OPTIONS    | x      | Supprime un terrain spécifique de la base de données.        |
| Ajouter une réservation          | /terrains/{id terrain}/reservation      | POST, HEAD, OPTIONS      | x      | Crée une nouvelle réservation pour un terrain.               |
| Liste des réservations           | /terrains/{id terrain}/reservation      | GET, HEAD, OPTIONS       | x      | Récupère toutes les réservations pour un terrain spécifique. |
| Ajouter une réservation          | /terrains/{id terrain}/reservation/{id} | POST, HEAD, OPTIONS      | x      | Crée une réservation pour un terrain existant.               |
| Supprimer une réservation        | /terrains/{id terrain}/reservation/{id} | DELETE, HEAD, OPTIONS    | x      | Supprime une réservation spécifique pour un terrain.         |

## Sécurité

En termes de sécurité :

- Pour la connexion, j'ai utilisé le middleware `checkTokenMiddleware` qui vérifie que le token est valide et que l'utilisateur est authentifié.
- J'ai aussi ajouté une boucle de **rate limit** pour limiter le nombre de connexions par IP.
- J'ai ajouté une protection pour la création et pour l'indisponibilité d'un terrain, qui vérifie que le terrain n'est pas déjà disponible et qu'il n'est pas déjà créé.
- J'ai ajouté une **whitelist** et une **blacklist** : une pour les administrateurs et une autre pour les personnes non autorisées à accéder à l'admin, qui sont considérées comme indésirables. Ces vérifications sont ajoutées au niveau du login.
- J'ai ajouté un gestionnaire de processus Node.js avec cette ligne de commande qui permet de lancer, arrêter et redémarrer le projet facilement. Il permet aussi de surveiller les performances :

  ```bash
  pm2 start app.js --env production
  ```

## Documentation

En termes de documentation :

- Je me suis beaucoup aidé du cours et du projet réalisé en cours, disponible sur [GitHub](https://github.com/).
- Pour le Markdown, j'ai utilisé ce site : [Framasoft - Markdown](https://docs.framasoft.org/fr/grav/markdown.html).
- Pour le code, j'ai consulté la documentation de [MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript).
- Je suis retourné sur le site HAL pour consulter la documentation.
- J'ai aussi consulté la documentation d'[Express.js](https://expressjs.com/fr/).
- J'ai ajouté une fonctionnalité de protection pour la connexion, avec une **rate limit** qui bloque les tentatives après 5 essais. L'utilisateur doit attendre 15 minutes avant de réessayer. Pour cela, j'ai aussi consulté la documentation d'Express.
- La documentation que j'ai utilisée pour le gestionnaire de processus Node.js est [PM2](https://alerty.ai/blog/node-pm2).

## Mon ressenti sur le projet

Mon ressenti sur le projet est que j'ai pu réaliser un projet qui me permet de comprendre le fonctionnement d'une API REST. Cela m'a également permis de découvrir de nouvelles choses par moi-même en explorant les différentes documentations fournies.

J'ai eu un peu de mal à mettre en place le système de réservation, mais j'y suis parvenu à la fin, avec un système de réservation qui fonctionne et respecte les consignes données. Je suis donc content du résultat final.

Toutes les fonctionnalités fonctionnent et toutes les commandes ont été détaillées dans la documentation.

Je voulais ajouter que la conception était la partie qui me faisait le plus peur, mais en suivant ce qu'on a vu en cours, tout s'est plutôt bien passé. Je me suis rendu compte par la suite que cette étape de conception m'a bien aidé dans le reste du projet.

J'ai aussi mieux compris le fonctionnement du WebToken et du login, qui me paraissaient un peu abstraits au début.
