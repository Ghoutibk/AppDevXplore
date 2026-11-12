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

export const Typography = ({ variant, component, children }: Props) => {
    const Element = component ?? defaultComponents[variant];

    return <Element>{children}</Element>;
};
