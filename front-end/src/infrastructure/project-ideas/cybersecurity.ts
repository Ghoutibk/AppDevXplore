import type { Project } from "@/domain/project";

export const cybersecurityProjects: readonly Project[] = [
  {
    title: "Relever tes premiers défis de sécurité",
    specialty: "cybersecurity",
    level: "beginner",
    summary:
      "Avance niveau par niveau dans le jeu Bandit : chaque mot de passe se trouve avec des commandes Linux. Tiens un journal de ta démarche, sans publier les mots de passe.",
    skills: ["Ligne de commande Linux", "SSH", "Droits des fichiers"],
    startingPoint: { label: "OverTheWire : Bandit", url: "https://overthewire.org/wargames/bandit/" },
  },
  {
    title: "Coder un coffre-fort de mots de passe",
    specialty: "cybersecurity",
    level: "beginner",
    summary:
      "Écris un outil en ligne de commande qui chiffre tes mots de passe dans un fichier, protégé par un mot de passe maître.",
    skills: ["Chiffrement symétrique", "Dérivation de clé", "Python"],
    startingPoint: { label: "Bibliothèque cryptography", url: "https://cryptography.io/en/latest/" },
  },
  {
    title: "Attaquer une application web vulnérable",
    specialty: "cybersecurity",
    level: "intermediate",
    summary:
      "Installe OWASP Juice Shop sur ta machine et exploite ses failles : injection SQL, XSS, contrôle d'accès. Pour chacune, explique comment la corriger.",
    skills: ["OWASP Top 10", "Injection SQL et XSS", "Correction de failles"],
    startingPoint: { label: "OWASP Juice Shop", url: "https://owasp.org/www-project-juice-shop/" },
  },
  {
    title: "Durcir un serveur Linux",
    specialty: "cybersecurity",
    level: "intermediate",
    summary:
      "Monte une machine virtuelle, audite-la avec Lynis, puis corrige ce qu'il signale : accès SSH par clé, pare-feu, mises à jour automatiques.",
    skills: ["Administration Linux", "Pare-feu", "Audit de sécurité"],
    startingPoint: { label: "Lynis, l'outil d'audit", url: "https://cisofy.com/lynis/" },
  },
  {
    title: "Détecter une intrusion dans ton labo",
    specialty: "cybersecurity",
    level: "advanced",
    summary:
      "Déploie Wazuh sur quelques machines virtuelles, rejoue des attaques connues et écris les règles qui les repèrent dans les journaux.",
    skills: ["Analyse de journaux", "Règles de détection", "SIEM"],
    startingPoint: { label: "Documentation de Wazuh", url: "https://documentation.wazuh.com/current/index.html" },
  },
  {
    title: "Comprendre un programme sans son code source",
    specialty: "cybersecurity",
    level: "advanced",
    summary:
      "Ouvre des crackmes dans Ghidra, retrouve la logique qui vérifie le mot de passe et explique ta démarche pas à pas.",
    skills: ["Rétro-ingénierie", "Assembleur x86", "Ghidra"],
    startingPoint: { label: "Crackmes.one", url: "https://crackmes.one/" },
  },
];
