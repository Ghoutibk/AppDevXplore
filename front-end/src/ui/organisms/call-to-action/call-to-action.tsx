import { useId, type ReactNode } from "react";
import { SectionHeading } from "@/ui/molecules/section-heading/section-heading";

interface Props {
    kicker: string;
    title: string;
    description: string;
    action: ReactNode;
}

export const CallToAction = ({ kicker, title, description, action }: Props) => {
    const titleId = useId();

    return (
        <section aria-labelledby={titleId} className="page-width">
            <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-3xl bg-ink p-[clamp(2rem,4.5vw,4rem)] text-cream">
                <div className="flex-[1_1_420px]">
                    <SectionHeading kicker={kicker} title={title} description={description} titleId={titleId} inverse />
                </div>
                {action}
            </div>
        </section>
    );
};
