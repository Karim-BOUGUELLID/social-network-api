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

Principales routes

Ressource

Méthodes principales

Users

GET, POST, PUT, DELETE

Events

GET, POST, PUT, DELETE

Groups

GET, POST, PUT, DELETE

Threads

GET, POST, PUT, DELETE

Albums

GET, POST, PUT, DELETE

Photos

GET, POST, PUT, DELETE

Polls

GET, POST, PUT, DELETE

Poll responses

GET, POST, DELETE

Ticket types

GET, POST, PUT, DELETE

Tickets

GET, POST, PUT, DELETE

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