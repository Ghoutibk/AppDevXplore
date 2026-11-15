import type { Project } from "@/domain/project";
import { Icon } from "@/ui/atoms/icon/icon";
import { Typography } from "@/ui/atoms/typography/typography";

interface Props {
    project: Project;
}

export const ProjectCard = ({ project }: Props) => {
    return (
        <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
            <div className="flex flex-1 flex-col gap-2">
                <Typography variant="h4" component="h3">
                    {project.title}
                </Typography>
                <Typography variant="body-base" color="muted">
                    {project.summary}
                </Typography>
            </div>
            <ul aria-label="Compétences travaillées" className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-line px-2.5 py-1">
                        <Typography variant="caption3" color="muted">
                            {skill}
                        </Typography>
                    </li>
                ))}
            </ul>
            <a
                href={project.startingPoint.url}
                className="inline-flex min-h-11 items-center gap-1.5 self-start text-caption1 text-accent-text"
            >
                Pour démarrer : {project.startingPoint.label}
                <Icon name="arrow-right" size={16} />
            </a>
        </article>
    );
};
