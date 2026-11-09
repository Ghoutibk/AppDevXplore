import { Seo } from "@/ui/components/seo"
import { Typography } from "@/ui/design-system/typography/typography";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Seo title="DevXplore" description="Description..."/>
      <Typography variant="display">
        DevXplore
      </Typography>
    </>
  )
}
