import type { GetStaticProps } from "next";
import type { SpecialtyTrends } from "@/application/get-github-trends";
import { loadGitHubTrends } from "@/composition/github-trends";
import type { Specialty } from "@/domain/specialty";
import { FeatureSection } from "@/ui/organisms/feature-section/feature-section";
import { PageIntro } from "@/ui/organisms/page-intro/page-intro";
import { RepositoryGroup } from "@/ui/organisms/repository-group/repository-group";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

interface Props {
  trends: SpecialtyTrends[];
}

const sections: Record<Specialty, { id: string; kicker: string; title: string; description: string }> = {
  data: {
    id: "data",
    kicker: "// data",
    title: "Data",
    description: "Analyse, visualisation et ingénierie des données.",
  },
  cybersecurity: {
    id: "cybersecurite",
    kicker: "// cybersécurité",
    title: "Cybersécurité",
    description: "Outils d'attaque et de défense, analyse et durcissement.",
  },
  "artificial-intelligence": {
    id: "ia",
    kicker: "// ia",
    title: "Intelligence artificielle",
    description: "Apprentissage automatique, modèles et agents.",
  },
};

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { trends: await loadGitHubTrends() },
});

export default function GitHubTrends({ trends }: Props) {
  return (
    <MainTemplate>
      <PageIntro
        kicker="// github"
        title="Tendances GitHub"
        lead="Les dépôts open source qui montent en ce moment, et les incontournables de chaque spécialité. La liste se met à jour à chaque déploiement du site."
      />
      {trends.map(({ specialty, rising, mostStarred }) => (
        <FeatureSection key={specialty} {...sections[specialty]}>
          <RepositoryGroup
            title="Ceux qui montent"
            description="Créés ces 30 derniers jours, classés par étoiles."
            repositories={rising}
          />
          <RepositoryGroup
            title="Les incontournables"
            description="Les plus étoilés de tous les temps."
            repositories={mostStarred}
          />
        </FeatureSection>
      ))}
    </MainTemplate>
  );
}
