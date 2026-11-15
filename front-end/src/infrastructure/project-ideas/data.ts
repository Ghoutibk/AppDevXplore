import type { Project } from "@/domain/project";

export const dataProjects: readonly Project[] = [
  {
    title: "Faire parler un jeu de données ouvert",
    specialty: "data",
    level: "beginner",
    summary:
      "Choisis un jeu de données sur data.gouv.fr, nettoie-le avec pandas, puis raconte ce que tu y trouves en cinq graphiques.",
    skills: ["pandas", "Nettoyage de données", "Visualisation"],
    startingPoint: { label: "data.gouv.fr", url: "https://www.data.gouv.fr/" },
  },
  {
    title: "Créer un tableau de bord interactif",
    specialty: "data",
    level: "beginner",
    summary:
      "Transforme une analyse en application web : des filtres, des graphiques qui réagissent et un lien à partager avec ta promo.",
    skills: ["Streamlit", "Graphiques interactifs", "Mise en ligne"],
    startingPoint: { label: "Documentation de Streamlit", url: "https://docs.streamlit.io/" },
  },
  {
    title: "Collecter des données sur le web",
    specialty: "data",
    level: "intermediate",
    summary:
      "Écris un robot qui parcourt un site page par page, en extrait les informations et les range dans une base SQLite. Entraîne-toi d'abord sur un site prévu pour ça.",
    skills: ["Requêtes HTTP", "Analyse du HTML", "SQL"],
    startingPoint: { label: "Books to Scrape, un site d'entraînement", url: "https://books.toscrape.com/" },
  },
  {
    title: "Automatiser un pipeline de données",
    specialty: "data",
    level: "intermediate",
    summary:
      "Récupère chaque jour les relevés d'une API météo, nettoie-les et charge-les dans une base, sans intervention de ta part.",
    skills: ["API REST", "ETL", "Planification de tâches"],
    startingPoint: { label: "API Open-Meteo", url: "https://open-meteo.com/" },
  },
  {
    title: "Prévoir la consommation d'électricité",
    specialty: "data",
    level: "advanced",
    summary:
      "À partir des données ouvertes du réseau électrique français, prédis la consommation du lendemain et compare ton modèle à une prévision naïve.",
    skills: ["Séries temporelles", "Apprentissage automatique", "Évaluation de modèles"],
    startingPoint: { label: "Open Data Réseaux Énergies", url: "https://opendata.reseaux-energies.fr/" },
  },
  {
    title: "Construire un entrepôt de données",
    specialty: "data",
    level: "advanced",
    summary:
      "Modélise des données brutes en tables propres et documentées avec dbt et DuckDB, puis ajoute des tests qui surveillent leur qualité.",
    skills: ["Modélisation de données", "dbt", "Tests de qualité"],
    startingPoint: { label: "Documentation de dbt", url: "https://docs.getdbt.com/" },
  },
];
