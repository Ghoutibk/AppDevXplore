import { PageIntro } from "@/ui/organisms/page-intro/page-intro";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

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
