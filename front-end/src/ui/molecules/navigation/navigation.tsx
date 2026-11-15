import Link from "next/link";

interface Props {
    label: string;
}

/** The pages of the site, in menu order. A page joins the menu once it exists. */
const links = [
    { href: "/#specialites", label: "Projets" },
    { href: "/tendances-github", label: "GitHub" },
];

export const Navigation = ({ label }: Props) => {
    return (
        <nav aria-label={label}>
            <ul className="-mx-2.5 flex flex-wrap gap-1">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="inline-flex min-h-11 items-center rounded-[10px] px-2.5 text-caption2 text-muted hover:text-ink"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
