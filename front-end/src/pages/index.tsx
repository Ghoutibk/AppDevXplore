import { Seo } from "@/ui/atoms/seo/seo";
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
          aside={null}
        />
      </MainTemplate>
    </>
  );
}
