import type { Repository } from "@/domain/repository";
import { Icon } from "@/ui/atoms/icon/icon";
import { Typography } from "@/ui/atoms/typography/typography";

const compact = new Intl.NumberFormat("fr-FR", { notation: "compact" });

interface Props {
    repository: Repository;
}

export const RepositoryCard = ({ repository }: Props) => {
    return (
        <article className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
            <Typography variant="h5" component="h4">
                <a href={repository.url} className="break-words hover:underline">
                    {repository.fullName}
                </a>
            </Typography>
            {repository.description && (
                <Typography variant="body-sm" color="muted">
                    {repository.description}
                </Typography>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1.5">
                    <span className="text-accent">
                        <Icon name="star" size={16} />
                    </span>
                    <Typography variant="caption2">{compact.format(repository.stars)} étoiles</Typography>
                </span>
                {repository.language && (
                    <Typography variant="caption2" color="muted">
                        {repository.language}
                    </Typography>
                )}
            </div>
        </article>
    );
};
