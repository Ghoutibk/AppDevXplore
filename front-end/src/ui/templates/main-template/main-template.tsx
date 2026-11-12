import type { ReactNode } from "react";
import { Footer } from "@/ui/organisms/footer/footer";
import { Header } from "@/ui/organisms/header/header";

interface Props {
    children: ReactNode;
}

export const MainTemplate = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};
