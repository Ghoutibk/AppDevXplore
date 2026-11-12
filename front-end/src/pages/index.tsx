import { Seo } from "@/ui/atoms/seo/seo";
import { Typography } from "@/ui/atoms/typography/typography";
import { MainTemplate } from "@/ui/templates/main-template/main-template";

export default function Home() {
  return (
    <>
      <Seo title="DevXplore" description="Description..." />
      <MainTemplate>
        <Typography variant="display">DevXplore</Typography>
      </MainTemplate>
    </>
  );
}
