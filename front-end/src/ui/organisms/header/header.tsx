import { Logo } from "@/ui/atoms/logo/logo";

export const Header = () => {
    return (
        <header className="border-b border-line">
            <div className="page-width flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3.5">
                <Logo />
            </div>
        </header>
    );
};
