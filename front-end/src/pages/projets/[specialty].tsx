import type { GetStaticPaths, GetStaticProps } from "next";
import type { LevelProjects } from "@/application/get-project-ideas";
import { loadProjectIdeas } from "@/composition/project-ideas";
import type { Level } from "@/domain/level";
import { specialties, type Specialty } from "@/domain/specialty";
import { Seo } from "@/ui/atoms/seo/seo";
import { ProjectCard } from "@/ui/molecules/project-card/project-card";
import { FeatureSection } from "@/ui/organisms/feature-section/feature-section";
import { PageIntro } from "@/ui/organisms/page-intro/page-intro";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

interface Props {
  specialty: Specialty;
  ideas: LevelProjects[];
}

type Params = { specialty: string };

const pages: Record<Specialty, { slug: string; title: string; lead: string; description: string }> = {
  data: {
    slug: "data",
    title: "Projets data",
    lead: "Des idées de projets pour apprendre à collecter, nettoyer et faire parler les données. Choisis ton niveau et lance-toi.",
    description:
      "Des idées de projets data pour les étudiants, classées par niveau : du premier jeu de données au pipeline automatisé.",
  },
  cybersecurity: {
    slug: "cybersecurite",
    title: "Projets cybersécurité",
    lead: "Des idées de projets pour comprendre les attaques et apprendre à s'en défendre, toujours dans un cadre légal : tes propres machines ou des plateformes d'entraînement.",
    description:
      "Des idées de projets de cybersécurité pour les étudiants, classées par niveau : défis, durcissement de serveur, détection d'intrusion.",
  },
  "artificial-intelligence": {
    slug: "ia",
    title: "Projets IA",
    lead: "Des idées de projets pour entraîner, évaluer et déployer des modèles, du premier classifieur à l'agent qui utilise des outils.",
    description:
      "Des idées de projets d'intelligence artificielle pour les étudiants, classées par niveau : du premier classifieur à l'agent.",
  },
};

const sections: Record<Level, { id: string; kicker: string; title: string; description: string }> = {
  beginner: {
    id: "debutant",
    kicker: "// niveau 1",
    title: "Débutant",
    description: "Pour un premier projet : les bases de la programmation suffisent.",
  },
  intermediate: {
    id: "intermediaire",
    kicker: "// niveau 2",
    title: "Intermédiaire",
    description: "Tu as déjà un projet derrière toi : ceux-ci demandent plus d'autonomie.",
  },
  advanced: {
    id: "avance",
    kicker: "// niveau 3",
    title: "Avancé",
    description: "Des projets ambitieux, proches de ce qui se fait en entreprise.",
  },
};

export const getStaticPaths: GetStaticPaths<Params> = () => ({
  paths: specialties.map((specialty) => ({ params: { specialty: pages[specialty].slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  // With fallback: false, Next only asks for the addresses listed by getStaticPaths.
  const specialty = specialties.find((candidate) => pages[candidate].slug === params?.specialty)!;

  return { props: { specialty, ideas: await loadProjectIdeas(specialty) } };
};

export default function Projects({ specialty, ideas }: Props) {
  const { title, lead, description } = pages[specialty];

  return (
    <>
      <Seo title={`${title} · DevXplore`} description={description} />
      <MainTemplate>
        <PageIntro kicker="// projets" title={title} lead={lead} />
        {ideas.map(({ level, projects }) => (
          <FeatureSection key={level} {...sections[level]}>
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </FeatureSection>
        ))}
      </MainTemplate>
    </>
  );
}
