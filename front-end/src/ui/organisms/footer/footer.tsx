import { Logo } from "@/ui/atoms/logo/logo";
import { Typography } from "@/ui/atoms/typography/typography";

const SOURCE_CODE_URL = "https://github.com/Ghoutibk/AppDevXplore";

export const Footer = () => {
    return (
        <footer className="mt-[clamp(4rem,7vw,7rem)] border-t border-line">
            <div className="page-width flex flex-wrap items-start justify-between gap-x-12 gap-y-6 pt-10 pb-6">
                <div className="flex max-w-90 flex-col gap-2">
                    <Logo />
                    <Typography variant="body-sm" color="muted">
                        L&apos;association de développement de l&apos;école.
                    </Typography>
                </div>
                <a href={SOURCE_CODE_URL} className="inline-flex min-h-11 items-center text-caption2 underline">
                    Code source du site
                </a>
            </div>
            <div className="page-width pb-8">
                <Typography variant="caption3" color="muted">
                    © {new Date().getFullYear()} DevXplore
                </Typography>
            </div>
        </footer>
    );
};
