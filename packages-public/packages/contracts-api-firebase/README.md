# Contracts API Firebase

Standalone package for firebase logic.

Enables the following features:

-   Swap between firebase web (client side) & firebase-admin sdk (server side)
-   Data models defined in Typescript
-   Zod validators for data models
-   Security rules firebase web
-   Utility functions for CRUD operations

## Models

Exported under `@owlprotocol/contracts-api-firebase/models`. Includes interfaces of collection entities and zod validators.

## Web

Exported under `@owlprotocol/contracts-api-firebase/web`. Integration for `firebase` SDK that runs client-side. User is authenticated with a token and is bound by firestore security rules.

### Firestore Security Rules

https://firebase.google.com/docs/firestore/security/get-started#writing_rules
https://firebase.google.com/docs/firestore/security/rules-conditions

**TODO: CHANGE THIS**
All true

### Storage Bucket Security Rules

**TODO: CHANGE THIS**
All true

## Admin

Exported under `@owlprotocol/contracts-api-firebase/admin`. Integration for `firebase-admin` SDK that runs server-side. Admin SDK has full authority and ignores all security rules. Admin is authenticated using a service accouint.

## Emulators

The purpose of this package is also to have proper emulator config to be able to run local tests efficiently. We connect emulators for Firestore, Auth, Storage SDKs.

https://firebase.google.com/docs/emulator-suite/connect_firestore
https://firebase.google.com/docs/emulator-suite/connect_auth
https://firebase.google.com/docs/emulator-suite/connect_storage
