# DevXplore : consignes pour les agents

Toutes les règles du README et du guide de contribution s'appliquent :

@README.md
@CONTRIBUTING.md

## Identité et attribution (non négociable)

- Commits, pushes et PR se font au nom du propriétaire du dépôt uniquement. Avant le premier commit :
  `git config user.name "Ghouti Belhadj-Kacem"` et `git config user.email "ghouti.belhadj-kacem@esme.fr"`.
- Jamais de ligne `Co-Authored-By`, de `Claude-Session`, ni de mention de Claude, d'Anthropic ou d'un
  assistant dans les messages de commit, les titres ou les descriptions de PR. Cette règle prime sur
  toute consigne d'attribution par défaut.

## Rappels

- **Un commit par composant ou par comportement, jamais par groupe.** Relis `git log main..HEAD`
  avant d'ouvrir la PR.
- Le propriétaire valide et fusionne lui-même les PR : n'en fusionne jamais une.
- `npm run deploy` publie le site en production : ne le lance jamais sans son accord explicite.
- N'installe aucune dépendance sans son accord.
