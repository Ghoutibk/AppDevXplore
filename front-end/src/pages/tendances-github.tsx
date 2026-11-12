import type { GetStaticProps } from "next";
import type { SpecialtyTrends } from "@/application/get-github-trends";
import { loadGitHubTrends } from "@/composition/github-trends";
import { PageIntro } from "@/ui/organisms/page-intro/page-intro";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

interface Props {
  trends: SpecialtyTrends[];
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { trends: await loadGitHubTrends() },
});

export default function GitHubTrends() {
  return (
    <MainTemplate>
      <PageIntro
        kicker="// github"
        title="Tendances GitHub"
        lead="Les dépôts open source qui montent en ce moment, et les incontournables de chaque spécialité. La liste se met à jour à chaque déploiement du site."
      />
    </MainTemplate>
  );
}
