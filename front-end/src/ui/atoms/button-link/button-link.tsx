import type { ReactNode } from "react";

interface Props {
    href: string;
    variant: "primary" | "secondary";
    children: ReactNode;
}

const variantClasses: Record<Props["variant"], string> = {
    primary: "bg-accent text-cream",
    secondary: "border border-current",
};

export const ButtonLink = ({ href, variant, children }: Props) => {
    return (
        <a
            href={href}
            className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5.5 text-caption1 ${variantClasses[variant]}`}
        >
            {children}
        </a>
    );
};
