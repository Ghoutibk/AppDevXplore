# DevXplore

Le site de **DevXplore**, l'association de développement de l'école. Il rassemble des ressources
pour les étudiants :

- des **exemples de projets** à réaliser, selon la spécialité : data, cybersécurité, IA ;
- les **tendances** du moment ;
- les **skills et outils** à installer ;
- les **tendances GitHub** : les dépôts qui montent.

## Démarrer

Il faut Node.js 24 (la version utilisée par la CI).

```bash
cd front-end
npm install       # dépendances + activation des hooks git
npm run dev       # http://localhost:3000
```

| Commande            | Rôle                                                       |
| ------------------- | ---------------------------------------------------------- |
| `npm run dev`       | serveur de développement                                   |
| `npm test`          | tests (Vitest et Testing Library)                          |
| `npm run lint`      | ESLint                                                     |
| `npm run typecheck` | contrôle des types TypeScript                              |
| `npm run build`     | export statique dans `front-end/out`                       |
| `npm run deploy`    | build puis déploiement sur Firebase Hosting (`devxplore-off`) |

## Architecture

Next.js (pages router), TypeScript et Tailwind CSS, exporté en site statique et hébergé sur
Firebase Hosting.

### Clean Architecture

Le code de `front-end/src` est découpé en couches. Les dépendances vont toujours vers le domaine :

| Couche            | Rôle                                                         | Peut dépendre de                                   |
| ----------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| `domain`          | entités et règles métier, en TypeScript pur                  | rien d'autre                                       |
| `application`     | cas d'usage et ports (interfaces vers l'extérieur)           | `domain`                                           |
| `infrastructure`  | adaptateurs qui implémentent les ports (catalogue, API GitHub…) | `domain`, `application`                         |
| `composition`     | seul endroit qui branche les adaptateurs sur les cas d'usage | `domain`, `application`, `infrastructure`          |
| `ui`              | composants React, en atomic design                           | `domain`                                           |
| `pages`           | routes Next.js : appellent les cas d'usage, rendent un template | `domain`, `application`, `composition`, `ui`, `styles` |

`domain` et `application` n'importent aucun paquet externe (ni React, ni Next).
`test/architecture/layers.test.ts` vérifie ces règles à chaque lancement des tests.

### Atomic design

`front-end/src/ui` suit l'atomic design :

| Niveau      | Contenu                                                    | Exemple                     |
| ----------- | ---------------------------------------------------------- | --------------------------- |
| `atoms`     | plus petits éléments, sans logique métier                  | `Typography`, `Seo`         |
| `molecules` | petits groupes d'atomes                                    | une carte de projet         |
| `organisms` | sections complètes de l'interface                          | l'en-tête, une grille de projets |
| `templates` | mise en page d'une page, sans données réelles              | le gabarit d'une page de liste |

Les pages Next.js de `src/pages` remplissent les templates avec les données des cas d'usage.
Un niveau ne dépend jamais d'un niveau supérieur : `test/architecture/atomic-design.test.ts` le vérifie.

### Langage omniprésent

Les concepts du métier, tels que le code les nomme. Chaque nouveau concept s'ajoute ici, dans
un tableau « Terme | Dans le code | Définition ». Il est encore vide : les premiers concepts
arrivent avec les projets par spécialité.

## Contribuer

Les règles (baby steps, TDD, Conventional Commits, PR) sont dans [CONTRIBUTING.md](CONTRIBUTING.md).
