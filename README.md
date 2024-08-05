<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

# Night-Watch-Handball

## Description
**Night-Watch-Handball** est une application web destinée aux clubs de handball pour partager des actualités et des événements avec leurs supporters. Les administrateurs peuvent gérer les actualités et les événements (CRUD), tandis que les supporters peuvent consulter ces informations.

## Technologies Utilisées
- **Nest.js** en **TypeScript**
- **Prisma** pour la gestion de la base de données
- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe
- **Swagger** pour la documentation API
- **Jest** pour les tests

### Dépendances
- `@nestjs/common`: ^10.0.0
- `@nestjs/core`: ^10.0.0
- `@nestjs/jwt`: ^10.2.0
- `@nestjs/mapped-types`: *
- `@nestjs/platform-express`: ^10.0.0
- `@nestjs/swagger`: ^7.3.1
- `@prisma/client`: ^5.14.0
- `bcrypt`: ^5.1.1
- `class-validator`: ^0.14.1
- `jsonwebtoken`: ^9.0.2
- `reflect-metadata`: ^0.2.0
- `rxjs`: ^7.8.1

## Installation

Pour installer et configurer le projet, suivez ces étapes :

1. Clonez le dépôt :
  ```bash
  git clone https://github.com/Edan379/Back-club-sportif-handball.git
  cd Back-club-sportif-handball
  ```

2. Installez les dépendances :
  ```bash
  npm install
  ```

3.  **Configurez les paramètres de connexion de la base de données en créant le fichier `.env` à la racine du projet.**
  Assurez-vous que toutes les variables nécessaires sont
  correctement définies.

  - Voici un exemple de contenu pour le fichier `.env` :
    ```plaintext
    DATABASE_URL=mysql://root:password.@localhost:3306/clubSportif
    ORIGIN=http://localhost:5173
    MYSQL_DATABASE=clubSportif
    MYSQL_ROOT_PASSWORD=password
    SECRET_KEY=zncvjdkkvdsvbdbvjdsbvsnidndicidckd
    SECRET_REFRESH_KEY=sdlkvndvnddlvndvvndsjvnjnsdjvnsdvn
    TOKEN_DURATION=60m
    REFRESH_TOKEN_DURATION=120m
    ```

  - **Explication des variables :**
    - **DATABASE_URL** : L'URL de connexion à votre base de données MySQL. Inclut le nom d'utilisateur, le mot de passe, l'hôte et le nom de la base de données (exemple : `mysql://user:password@localhost:3306/database`).
    - **ORIGIN** : L'origine du front-end (par exemple, `http://localhost:5173` si le front-end est exécuté localement sur ce port).
    - **MYSQL_DATABASE** : Le nom de la base de données MySQL à utiliser.
    - **MYSQL_ROOT_PASSWORD** : Le mot de passe de l'utilisateur root pour MySQL.
    - **SECRET_KEY** : La clé secrète utilisée pour signer les tokens JWT.
    - **SECRET_REFRESH_KEY** : La clé secrète utilisée pour signer les tokens de rafraîchissement.
    - **TOKEN_DURATION** : La durée de validité des tokens JWT (par exemple, `60m` pour 60 minutes).
    - **REFRESH_TOKEN_DURATION** : La durée de validité des tokens de rafraîchissement (par exemple, `120m` pour 120 minutes).
  **Assurez-vous de ne pas partager ce fichier `.env` publiquement et de garder ces informations confidentielles.**
  Adaptez les valeurs des variables d'environnement en fonction de votre propre configuration et de vos besoins.

4. Exécutez les migrations Prisma et générer le client prisma:
  ```bash
  npx prisma migrate dev --name generation-de-la-base-de-donnees

  npx prisma generate
  ```
  **Note :** Exécutez `npx prisma generate` chaque fois que vous modifiez le fichier `schema.prisma`.

5. Peupler la base de données: 
  - **avec des utilisateurs admin**:
  ```bash
  npm run seed:admin
  ```

  - **avec des actualités**:

  - **avec des évènements**:

6. Démarrez l'application:
  - **en mode développement** :
    ```bash
    npm run start:dev
    ```

## Utilisation
- **Pour les tests** :
  ```bash
  npm test
  ```

- **Pour les tests E2E** :
  ```bash
  npm run test:e2e
  ```

## Licence

Ce projet est sous la [Licence Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

- **Utilisation** : Vous pouvez utiliser ce code source et le modifier pour des fins personnelles.

- **Interdiction Commerciale** : Vous ne pouvez pas utiliser le code source ou les dérivés du code source à des fins commerciales.

- **Attribution** : Vous devez donner crédit à l'auteur original lorsque vous partagez ou redistribuez le code.

Pour plus d'informations sur cette licence, veuillez consulter [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).


## Auteurs et Remerciements

- **Jordan** - Développeur
- **Alex** - Collègue Développeur