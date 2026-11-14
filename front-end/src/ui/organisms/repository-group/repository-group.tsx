import type { Repository } from "@/domain/repository";
import { Typography } from "@/ui/atoms/typography/typography";
import { RepositoryCard } from "@/ui/molecules/repository-card/repository-card";

interface Props {
    title: string;
    description: string;
    repositories: Repository[];
}

export const RepositoryGroup = ({ title, description, repositories }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 border-t-2 border-ink pt-5">
                <Typography variant="h4" component="h3">
                    {title}
                </Typography>
                <Typography variant="body-sm" color="muted">
                    {description}
                </Typography>
            </div>
            {repositories.length > 0 ? (
                <ol className="flex flex-col gap-3">
                    {repositories.map((repository) => (
                        <li key={repository.fullName}>
                            <RepositoryCard repository={repository} />
                        </li>
                    ))}
                </ol>
            ) : (
                <Typography variant="body-base" color="muted">
                    Aucun dépôt pour le moment.
                </Typography>
            )}
        </div>
    );
};
