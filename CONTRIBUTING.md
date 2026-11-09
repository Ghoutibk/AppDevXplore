# Contribuer à DevXplore

Merci de donner un coup de main ! Ces règles gardent le code lisible pour les prochaines promos.
Lis aussi le [README](README.md), qui décrit l'architecture.

## Démarrer

```bash
cd front-end
npm install      # installe les dépendances et active les hooks git (.githooks)
npm run dev      # http://localhost:3000
```

Avant chaque commit, le hook `pre-commit` lance le lint, le contrôle des types et les tests.
Le hook `commit-msg` refuse tout message qui ne suit pas Conventional Commits.

## Le cycle de travail

1. Crée une branche depuis `main` pour un lot de travail : `feat/projets-par-specialite`, `fix/favicon`…
2. Avance en **baby steps** : un comportement, un test vert, un commit.
3. Ouvre une PR vers `main` en remplissant le modèle. **Le mainteneur relit, valide et fusionne.**
4. Une PR porte **au plus trois fonctionnalités**.

### Baby steps : un commit = un changement

Un commit ne contient qu'**un** changement : un comportement, un composant ou un correctif.
On ne regroupe jamais plusieurs composants ou plusieurs comportements dans un même commit,
même quand on fige l'existant. Avant d'ouvrir une PR, relis `git log main..HEAD` et découpe tout
commit dont le message relie deux choses indépendantes par « and ».

### TDD

Pas une ligne de code de production sans un test rouge d'abord, vu rouge **pour la bonne raison**
(lis le message d'échec). Puis le code le plus simple qui le fait passer, puis le refactoring.

- La logique (`domain`, `application`) se teste avec Vitest, dans un fichier `*.test.ts` à côté du module.
- Les composants se testent avec Testing Library (`*.test.tsx`), par ce que voit l'utilisateur :
  rôles, textes, libellés. Jamais par les classes CSS.
- Les tests ne touchent jamais le réseau : les sources externes (API GitHub…) sont remplacées par des doublures.

### Messages de commit

[Conventional Commits](https://www.conventionalcommits.org/fr/), **en anglais**, courts et clairs :

```
type(scope): description
```

- types : `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`, `build`, `ci`, `perf`, `revert` ;
- scopes : la couche ou la zone touchée (`domain`, `application`, `infrastructure`, `composition`,
  `ui`, `pages`, `architecture`, `deps`, `seo`…).

Exemples : `feat(domain): add specialty`, `fix(seo): load favicon from site root`.

## Règles d'ingénierie

- **Clean Architecture** : les dépendances vont toujours vers le domaine (voir le README).
  `test/architecture/layers.test.ts` le vérifie : étends-le si tu ajoutes une couche.
- **Atomic design** : un niveau de `ui` ne dépend jamais d'un niveau supérieur.
  `test/architecture/atomic-design.test.ts` le vérifie.
- **DDD** : le code parle le langage du métier. Ajoute chaque nouveau concept au tableau
  « Langage omniprésent » du README.
- **SOLID, KISS, DRY** : petits modules, ports étroits, la solution la plus simple qui passe les tests,
  une seule source pour chaque connaissance.
- **Langues** : code, noms et messages de commit en anglais ; contenu du site, documentation et
  descriptions de PR en français.
- **Dépendances** : n'en ajoute une que si elle est vraiment nécessaire, et explique pourquoi dans la PR.
