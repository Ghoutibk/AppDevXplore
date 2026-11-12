import { useId, type ReactNode } from "react";
import { Typography } from "@/ui/atoms/typography/typography";

interface Props {
    kicker: string;
    title: string;
    highlight: string;
    lead: string;
    actions: ReactNode;
    aside: ReactNode;
}

export const Hero = ({ kicker, title, highlight, lead, actions, aside }: Props) => {
    const titleId = useId();

    return (
        <section
            aria-labelledby={titleId}
            className="page-width grid items-center gap-12 pt-[clamp(3rem,8vw,7rem)] pb-[clamp(3rem,7vw,6rem)] lg:grid-cols-2"
        >
            <div className="flex flex-col gap-6">
                <Typography variant="caption4" color="accent">
                    {kicker}
                </Typography>
                <Typography variant="display" id={titleId}>
                    {title} <span className="text-accent">{highlight}</span>
                </Typography>
                <div className="max-w-[34em]">
                    <Typography variant="lead">{lead}</Typography>
                </div>
                <div className="flex flex-wrap gap-3">{actions}</div>
            </div>
            {aside}
        </section>
    );
};
