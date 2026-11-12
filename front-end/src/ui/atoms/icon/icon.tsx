import type { ReactNode } from "react";

const glyphs = {
    chart: (
        <>
            <path d="M3 3v18h18" />
            <path d="M8 17v-5" />
            <path d="M13 17V7" />
            <path d="M18 17v-8" />
        </>
    ),
    shield: (
        <>
            <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
            <path d="M9 12l2 2 4-4" />
        </>
    ),
    chip: (
        <>
            <rect x="6" y="6" width="12" height="12" rx="2" />
            <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
            <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </>
    ),
    trending: (
        <>
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
        </>
    ),
    terminal: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 9l3 3-3 3" />
            <path d="M12 15h5" />
        </>
    ),
    star: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" />,
    "arrow-right": (
        <>
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
        </>
    ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof glyphs;

interface Props {
    name: IconName;
    size?: number;
}

export const Icon = ({ name, size = 24 }: Props) => {
    return (
        <svg
            aria-hidden="true"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {glyphs[name]}
        </svg>
    );
};
