import { Typography } from "@/ui/atoms/typography/typography";

interface Props {
    kicker: string;
    title: string;
    lead: string;
}

export const PageIntro = ({ kicker, title, lead }: Props) => {
    return (
        <div className="page-width flex flex-col gap-5 pt-[clamp(3rem,7vw,6rem)] pb-[clamp(3rem,6vw,5rem)]">
            <Typography variant="caption4" color="accent">
                {kicker}
            </Typography>
            <Typography variant="h1">{title}</Typography>
            <div className="max-w-[38em]">
                <Typography variant="lead">{lead}</Typography>
            </div>
        </div>
    );
};
