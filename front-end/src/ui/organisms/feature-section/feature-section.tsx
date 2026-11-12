import { useId, type ReactNode } from "react";
import { SectionHeading } from "@/ui/molecules/section-heading/section-heading";

interface Props {
    id: string;
    kicker: string;
    title: string;
    description: string;
    children: ReactNode;
}

export const FeatureSection = ({ id, kicker, title, description, children }: Props) => {
    const titleId = useId();

    return (
        <section id={id} aria-labelledby={titleId} className="page-width flex flex-col gap-8 pb-[clamp(4rem,7vw,7rem)]">
            <SectionHeading kicker={kicker} title={title} description={description} titleId={titleId} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">{children}</div>
        </section>
    );
};
