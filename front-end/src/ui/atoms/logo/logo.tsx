import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 text-ink">
            <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-cream"
            >
                dx
            </span>
            <span className="text-lg font-bold tracking-tight">DevXplore</span>
        </Link>
    );
};
