import type { ReactNode } from "react";

type Variant =
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "lead"
    | "body-lg"
    | "body-base"
    | "body-sm"
    | "caption1"
    | "caption2"
    | "caption3"
    | "caption4";

type Component = "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";

type Color = "muted" | "accent" | "highlight" | "inverse-muted";

interface Props {
    variant: Variant;
    component?: Component;
    color?: Color;
    id?: string;
    children: ReactNode;
}

const defaultComponents: Record<Variant, Component> = {
    display: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    lead: "p",
    "body-lg": "p",
    "body-base": "p",
    "body-sm": "p",
    caption1: "span",
    caption2: "span",
    caption3: "span",
    caption4: "span",
};

const variantClasses: Record<Variant, string> = {
    display: "text-display",
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
    lead: "text-lead",
    "body-lg": "text-body-lg",
    "body-base": "text-body-base",
    "body-sm": "text-body-sm",
    caption1: "text-caption1",
    caption2: "text-caption2",
    caption3: "text-caption3",
    caption4: "text-caption4 font-mono uppercase",
};

const defaultColors: Partial<Record<Variant, Color>> = {
    lead: "muted",
};

const colorClasses: Record<Color, string> = {
    muted: "text-muted",
    accent: "text-accent-text",
    highlight: "text-accent",
    "inverse-muted": "text-ink-muted",
};

export const Typography = ({ variant, component, color, id, children }: Props) => {
    const Element = component ?? defaultComponents[variant];
    const textColor = color ?? defaultColors[variant];
    const className = textColor ? `${variantClasses[variant]} ${colorClasses[textColor]}` : variantClasses[variant];

    return (
        <Element id={id} className={className}>
            {children}
        </Element>
    );
};
