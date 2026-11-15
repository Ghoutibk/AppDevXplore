import type { GetStaticPaths, GetStaticProps } from "next";
import { specialties, type Specialty } from "@/domain/specialty";
import { PageIntro } from "@/ui/organisms/page-intro/page-intro";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

interface Props {
  specialty: Specialty;
}

type Params = { specialty: string };

const pages: Record<Specialty, { slug: string; title: string; lead: string }> = {
  data: {
    slug: "data",
    title: "Projets data",
    lead: "Des idées de projets pour apprendre à collecter, nettoyer et faire parler les données. Choisis ton niveau et lance-toi.",
  },
  cybersecurity: {
    slug: "cybersecurite",
    title: "Projets cybersécurité",
    lead: "Des idées de projets pour comprendre les attaques et apprendre à s'en défendre, toujours dans un cadre légal : tes propres machines ou des plateformes d'entraînement.",
  },
  "artificial-intelligence": {
    slug: "ia",
    title: "Projets IA",
    lead: "Des idées de projets pour entraîner, évaluer et déployer des modèles, du premier classifieur à l'agent qui utilise des outils.",
  },
};

export const getStaticPaths: GetStaticPaths<Params> = () => ({
  paths: specialties.map((specialty) => ({ params: { specialty: pages[specialty].slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  // With fallback: false, Next only asks for the addresses listed by getStaticPaths.
  const specialty = specialties.find((candidate) => pages[candidate].slug === params?.specialty)!;

  return { props: { specialty } };
};

export default function Projects({ specialty }: Props) {
  const { title, lead } = pages[specialty];

  return (
    <MainTemplate>
      <PageIntro kicker="// projets" title={title} lead={lead} />
    </MainTemplate>
  );
}
