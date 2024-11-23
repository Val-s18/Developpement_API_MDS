# Developpement_API_MDS

## Lancer le Project

`npm install`

`npm run start`

Table des matières

1.  [Qu'est-ce que le Markdown ?](#whatismarkdown)
2.  [Pourquoi utiliser le Markdown?](#why)
3.  [Outils pour le Markdown](#tools)
4.  [La syntaxe du Markdown](#syntax)

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

## Documentation
