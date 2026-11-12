import Link from "next/link";
import { Icon, type IconName } from "@/ui/atoms/icon/icon";
import { Typography } from "@/ui/atoms/typography/typography";

interface Props {
    icon: IconName;
    title: string;
    description: string;
    appearance: "boxed" | "ruled";
    link?: { href: string; label: string };
}

const appearances = {
    boxed: {
        card: "gap-4 rounded-2xl border border-line bg-surface p-6",
        icon: "flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent",
        iconSize: 22,
    },
    ruled: {
        card: "gap-3 border-t-2 border-ink pt-6",
        icon: "text-accent",
        iconSize: 24,
    },
} as const;

export const FeatureCard = ({ icon, title, description, appearance, link }: Props) => {
    const styles = appearances[appearance];

    return (
        <article className={`flex flex-col ${styles.card}`}>
            <div className={styles.icon}>
                <Icon name={icon} size={styles.iconSize} />
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <Typography variant="h4" component="h3">
                    {title}
                </Typography>
                <Typography variant="body-base" color="muted">
                    {description}
                </Typography>
            </div>
            {link ? (
                <Link href={link.href} className="inline-flex min-h-11 items-center gap-1.5 text-caption1 text-accent-text">
                    {link.label}
                    <Icon name="arrow-right" size={16} />
                </Link>
            ) : (
                <span className="self-start rounded-full bg-accent-soft px-2.5 py-1.5">
                    <Typography variant="caption4" color="accent">
                        Bientôt
                    </Typography>
                </span>
            )}
        </article>
    );
};
