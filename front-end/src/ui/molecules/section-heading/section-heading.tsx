import { Typography } from "@/ui/atoms/typography/typography";

interface Props {
    kicker: string;
    title: string;
    description: string;
    titleId: string;
    inverse?: boolean;
}

export const SectionHeading = ({ kicker, title, description, titleId, inverse = false }: Props) => {
    return (
        <div className="flex max-w-[40em] flex-col gap-3">
            <Typography variant="caption4" color={inverse ? "highlight" : "accent"}>
                {kicker}
            </Typography>
            <Typography variant="h2" id={titleId}>
                {title}
            </Typography>
            <Typography variant="body-base" color={inverse ? "inverse-muted" : "muted"}>
                {description}
            </Typography>
        </div>
    );
};
