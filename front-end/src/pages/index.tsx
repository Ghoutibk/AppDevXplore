import { Seo } from "@/ui/atoms/seo/seo";
import { FeatureCard } from "@/ui/molecules/feature-card/feature-card";
import { Terminal } from "@/ui/molecules/terminal/terminal";
import { FeatureSection } from "@/ui/organisms/feature-section/feature-section";
import { Hero } from "@/ui/organisms/hero/hero";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

export default function Home() {
  return (
    <>
      <Seo title="DevXplore" description="Description..." />
      <MainTemplate>
        <Hero
          kicker="// l'asso dev de l'école"
          title="Trouve ton prochain projet"
          highlight="de développement."
          lead="DevXplore rassemble des ressources pour les étudiants : des idées de projets selon ta spécialité, les tendances du moment, les outils à installer et les dépôts GitHub qui montent."
          actions={null}
          aside={
            <Terminal
              commands={[
                { directory: "~/devxplore", input: "ls", output: ["projets/", "tendances/", "outils/", "github/"] },
                { directory: "~/devxplore", input: "cd projets && ls", output: ["data/", "cybersecurite/", "ia/"] },
              ]}
              directory="~/devxplore/projets"
            />
          }
        />
        <FeatureSection
          id="specialites"
          kicker="// projets"
          title="Choisis ta spécialité"
          description="Des idées de projets à réaliser, classées par domaine."
        >
          <FeatureCard
            appearance="boxed"
            icon="chart"
            title="Data"
            description="Collecter, nettoyer et visualiser des données, du tableau de bord au pipeline."
          />
          <FeatureCard
            appearance="boxed"
            icon="shield"
            title="Cybersécurité"
            description="Comprendre les attaques pour mieux défendre : CTF, durcissement, analyse."
          />
          <FeatureCard
            appearance="boxed"
            icon="chip"
            title="Intelligence artificielle"
            description="Entraîner, évaluer et déployer des modèles, du classifieur à l'agent."
          />
        </FeatureSection>
      </MainTemplate>
    </>
  );
}
