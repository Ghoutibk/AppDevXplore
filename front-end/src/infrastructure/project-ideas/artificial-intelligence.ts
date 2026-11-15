import type { Project } from "@/domain/project";

export const artificialIntelligenceProjects: readonly Project[] = [
  {
    title: "Entraîner ton premier classifieur d'images",
    specialty: "artificial-intelligence",
    level: "beginner",
    summary:
      "Apprends à un réseau de neurones à reconnaître des vêtements sur des photos, puis cherche où il se trompe et pourquoi.",
    skills: ["PyTorch", "Réseaux de neurones", "Évaluation"],
    startingPoint: {
      label: "Tutoriel de démarrage de PyTorch",
      url: "https://docs.pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html",
    },
  },
  {
    title: "Deviner si une critique de film est positive",
    specialty: "artificial-intelligence",
    level: "beginner",
    summary:
      "Entraîne un modèle à classer des critiques de films en français, positives ou négatives, et compare plusieurs façons de représenter le texte.",
    skills: ["scikit-learn", "Traitement du texte", "Précision et rappel"],
    startingPoint: { label: "Jeu de données Allociné", url: "https://huggingface.co/datasets/tblard/allocine" },
  },
  {
    title: "Créer un assistant qui connaît tes cours",
    specialty: "artificial-intelligence",
    level: "intermediate",
    summary:
      "Indexe tes supports de cours, retrouve les passages utiles à une question et fais rédiger la réponse par un modèle de langue, sources à l'appui.",
    skills: ["Embeddings", "Recherche sémantique", "RAG"],
    startingPoint: { label: "Documentation de Sentence Transformers", url: "https://sbert.net/" },
  },
  {
    title: "Spécialiser un modèle de langue",
    specialty: "artificial-intelligence",
    level: "intermediate",
    summary:
      "Affine un petit modèle pré-entraîné sur une tâche précise, puis vérifie avec des chiffres qu'il fait mieux que le modèle de départ.",
    skills: ["Transformers", "Affinage de modèles", "Évaluation"],
    startingPoint: { label: "Cours LLM de Hugging Face", url: "https://huggingface.co/learn/llm-course/chapter3/1" },
  },
  {
    title: "Construire un agent qui utilise des outils",
    specialty: "artificial-intelligence",
    level: "advanced",
    summary:
      "Donne des outils à un modèle de langue (recherche, calcul, lecture de fichiers) et mesure combien de tâches il réussit seul, du début à la fin.",
    skills: ["Appel d'outils", "Boucle d'agent", "Évaluation d'agents"],
    startingPoint: {
      label: "Cours sur les agents de Hugging Face",
      url: "https://huggingface.co/learn/agents-course/unit0/introduction",
    },
  },
  {
    title: "Mettre un modèle en production",
    specialty: "artificial-intelligence",
    level: "advanced",
    summary:
      "Expose ton modèle derrière une API, empaquette-le dans un conteneur Docker et suis ses performances une fois en ligne.",
    skills: ["FastAPI", "Docker", "MLOps"],
    startingPoint: { label: "Documentation de FastAPI", url: "https://fastapi.tiangolo.com/" },
  },
];
