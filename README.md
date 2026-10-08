Social Network API

API REST développée avec Node.js, Express.js et MongoDB/Mongoose dans le cadre du module API et Services Web.

Description

Cette API permet de gérer les principales fonctionnalités d'un réseau social :

utilisateurs

événements

groupes

discussions

albums et photos

sondages

réponses aux sondages

types de billets

billetterie

Certaines règles métier sont également implémentées, notamment les permissions des groupes, la participation aux événements, les réponses aux sondages et la gestion des quantités de billets.

Technologies utilisées

Node.js

Express.js

MongoDB

Mongoose

JavaScript / ES Modules

dotenv

Git / GitHub

Installation

Cloner le repository :

git clone https://github.com/Karim-BOUGUELLID/social-network-api.git
cd social-network-api

Installer les dépendances :

npm install

Créer un fichier .env à la racine du projet :

MONGO_URI=votre_uri_mongodb

Lancer le projet

En développement :

npm run dev

Ou avec Node.js :

npm start

L'API est accessible à :

http://localhost:3000

Documentation de l'API

L'API est accessible à l'adresse :

http://localhost:3000

Toutes les requêtes utilisant un corps JSON doivent utiliser l'en-tête :

Content-Type: application/json

Utilisateurs

Méthode

Route

Description

GET

/users

Récupérer tous les utilisateurs

GET

/users/:id

Récupérer un utilisateur par son identifiant

POST

/users

Créer un utilisateur

PUT

/users/:id

Modifier un utilisateur

DELETE

/users/:id

Supprimer un utilisateur

Exemple de création :

curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
  "firstName": "Karim",
  "lastName": "Bouguellid",
  "email": "karim@example.com",
  "password": "123456"
}'

Événements

Méthode

Route

Description

GET

/events

Récupérer tous les événements

GET

/events/:id

Récupérer un événement

POST

/events

Créer un événement

PUT

/events/:id

Modifier un événement

DELETE

/events/:id

Supprimer un événement

POST

/events/from-group/:groupId

Créer un événement depuis un groupe

Exemple :

curl http://localhost:3000/events

Création d'un événement depuis un groupe :

curl -X POST http://localhost:3000/events/from-group/GROUP_ID \
-H "Content-Type: application/json" \
-d '{
  "creator": "USER_ID",
  "name": "Nouvel événement",
  "description": "Description de l'événement",
  "startDate": "2026-10-20T18:00:00.000Z",
  "endDate": "2026-10-20T22:00:00.000Z",
  "location": "Paris",
  "visibility": "public"
}'

Groupes

Méthode

Route

Description

GET

/groups

Récupérer tous les groupes

GET

/groups/:id

Récupérer un groupe

POST

/groups

Créer un groupe

PUT

/groups/:id

Modifier un groupe

DELETE

/groups/:id

Supprimer un groupe

Un groupe possède un type (public, private ou secret), des membres et des administrateurs.

Discussions

Méthode

Route

Description

GET

/threads

Récupérer tous les threads

GET

/threads/:id

Récupérer un thread

POST

/threads

Créer un thread

POST

/threads/:id/messages

Ajouter un message à un thread de groupe

PUT

/threads/:id

Modifier un thread

DELETE

/threads/:id

Supprimer un thread

Un thread doit être associé soit à un groupe, soit à un événement.

Albums

Méthode

Route

Description

GET

/albums

Récupérer tous les albums

GET

/albums/:id

Récupérer un album

POST

/albums

Créer un album

PUT

/albums/:id

Modifier un album

DELETE

/albums/:id

Supprimer un album

Un album est associé à un événement.

Photos

Méthode

Route

Description

GET

/photos

Récupérer toutes les photos

GET

/photos/:id

Récupérer une photo

POST

/photos

Ajouter une photo

PUT

/photos/:id

Modifier une photo

DELETE

/photos/:id

Supprimer une photo

Seuls les participants à l'événement peuvent ajouter une photo.

Sondages

Méthode

Route

Description

GET

/polls

Récupérer tous les sondages

GET

/polls/:id

Récupérer un sondage

POST

/polls

Créer un sondage

PUT

/polls/:id

Modifier un sondage

DELETE

/polls/:id

Supprimer un sondage

Un sondage appartient à un événement et contient une ou plusieurs questions.

Réponses aux sondages

Méthode

Route

Description

GET

/poll-responses

Récupérer les réponses

GET

/poll-responses/:id

Récupérer une réponse

POST

/poll-responses

Répondre à un sondage

DELETE

/poll-responses/:id

Supprimer une réponse

Un participant ne peut répondre qu'une seule fois au même sondage.

Types de billets

Méthode

Route

Description

GET

/ticket-types

Récupérer les types de billets

GET

/ticket-types/:id

Récupérer un type de billet

POST

/ticket-types

Créer un type de billet

PUT

/ticket-types/:id

Modifier un type de billet

DELETE

/ticket-types/:id

Supprimer un type de billet

Billets

Méthode

Route

Description

GET

/tickets

Récupérer les billets

GET

/tickets/:id

Récupérer un billet

POST

/tickets

Acheter un billet

PUT

/tickets/:id

Modifier un billet

DELETE

/tickets/:id

Supprimer un billet

Un billet ne peut être acheté que pour un événement public et une personne ne peut acheter qu'un seul billet pour un même événement.

Exemple d'achat :

curl -X POST http://localhost:3000/tickets \
-H "Content-Type: application/json" \
-d '{
  "ticketType": "TICKET_TYPE_ID",
  "firstName": "Jean",
  "lastName": "Dupont",
  "address": "10 rue de Paris, 75001 Paris"
}'

Codes HTTP principaux

Code

Signification

200

Requête réussie

201

Ressource créée

400

Requête invalide

403

Accès refusé

404

Ressource introuvable

409

Conflit

500

Erreur serveur

Fonctionnalités métier

Événements

Un événement possède notamment :

un nom

une description

une date de début et de fin

un lieu

une visibilité publique ou privée

au moins un organisateur

des participants

La date de fin doit être postérieure à la date de début.

Groupes

Un groupe peut être :

public

privé

secret

Un groupe possède au moins un membre et un administrateur.

Les permissions permettent notamment de contrôler :

la publication des membres ;

la création d'événements par les membres.

Lorsqu'un événement est créé depuis un groupe, les membres du groupe sont automatiquement ajoutés comme participants.

Discussions

Un thread est associé soit à :

un groupe ;

un événement.

Il ne peut pas être associé aux deux simultanément.

Les membres d'un groupe peuvent publier dans le thread uniquement si la permission correspondante est activée.

Photos

Les photos sont associées à un album appartenant à un événement.

Seuls les participants à l'événement peuvent ajouter une photo.

Sondages

Un sondage appartient à un événement et contient une ou plusieurs questions.

Chaque question possède plusieurs réponses possibles.

Un participant ne peut sélectionner qu'une réponse par question et ne peut répondre qu'une seule fois au même sondage.

Billetterie

Certains événements publics peuvent proposer des billets.

Chaque type de billet possède :

un nom ;

un prix ;

une quantité disponible.

La quantité disponible est décrémentée après un achat.

Une personne ne peut acheter qu'un seul billet pour un même événement.

Structure du projet

social-network-api/
├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   └── validators/
├── .gitignore
├── index.mjs
├── package.json
├── package-lock.json
└── README.md

Sécurité

Les variables de connexion à MongoDB sont stockées dans .env, qui est exclu du repository Git grâce au .gitignore.

Le projet contient également plusieurs validations et contrôles métier au niveau de l'API.

Auteur

Karim Bouguellid

Projet réalisé dans le cadre du module API et Services Web.