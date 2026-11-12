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

interface Props {
    variant: Variant;
    component?: Component;
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
    lead: "text-lead text-muted",
    "body-lg": "text-body-lg",
    "body-base": "text-body-base",
    "body-sm": "text-body-sm",
    caption1: "text-caption1",
    caption2: "text-caption2",
    caption3: "text-caption3",
    caption4: "text-caption4 font-mono uppercase",
};

export const Typography = ({ variant, component, children }: Props) => {
    const Element = component ?? defaultComponents[variant];

    return <Element className={variantClasses[variant]}>{children}</Element>;
};
