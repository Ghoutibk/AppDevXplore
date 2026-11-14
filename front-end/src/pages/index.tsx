import { SOURCE_CODE_URL } from "@/domain/site";
import { ButtonLink } from "@/ui/atoms/button-link/button-link";
import { Seo } from "@/ui/atoms/seo/seo";
import { FeatureCard } from "@/ui/molecules/feature-card/feature-card";
import { Terminal } from "@/ui/molecules/terminal/terminal";
import { CallToAction } from "@/ui/organisms/call-to-action/call-to-action";
import { FeatureSection } from "@/ui/organisms/feature-section/feature-section";
import { Hero } from "@/ui/organisms/hero/hero";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

export default function Home() {
  return (
    <>
      <Seo
        title="DevXplore"
        description="Idées de projets en data, cybersécurité et IA, tendances, outils et dépôts GitHub : les ressources de DevXplore, l'association de développement de l'école."
      />
      <MainTemplate>
        <Hero
          kicker="// l'asso dev de l'école"
          title="Trouve ton prochain projet"
          highlight="de développement."
          lead="DevXplore rassemble des ressources pour les étudiants : des idées de projets selon ta spécialité, les tendances du moment, les outils à installer et les dépôts GitHub qui montent."
          actions={
            <>
              <ButtonLink href="#specialites" variant="primary">
                Choisir ma spécialité
              </ButtonLink>
              <ButtonLink href="#ressources" variant="secondary">
                Voir les autres ressources
              </ButtonLink>
            </>
          }
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
        <FeatureSection
          id="ressources"
          kicker="// ressources"
          title="Pour aller plus loin"
          description="Ce qui bouge dans le monde du développement, et de quoi t'équiper."
        >
          <FeatureCard
            appearance="ruled"
            icon="trending"
            title="Tendances"
            description="Les technologies et les pratiques qui comptent en ce moment, expliquées simplement."
          />
          <FeatureCard
            appearance="ruled"
            icon="terminal"
            title="Outils et skills"
            description="Les outils à installer et les compétences à travailler pour bien démarrer."
          />
          <FeatureCard
            appearance="ruled"
            icon="star"
            title="Tendances GitHub"
            description="Les dépôts open source qui montent en ce moment."
            link={{ href: "/tendances-github", label: "Voir les dépôts" }}
          />
        </FeatureSection>
        <CallToAction
          kicker="// contribuer"
          title="Le site est fait par les étudiants."
          description="Une idée de projet, un outil ou une ressource à partager ? Ouvre une pull request sur le dépôt du site : chaque contribution est relue avant d'être publiée."
          action={
            <ButtonLink href={SOURCE_CODE_URL} variant="primary">
              Voir le dépôt sur GitHub
            </ButtonLink>
          }
        />
      </MainTemplate>
    </>
  );
}
