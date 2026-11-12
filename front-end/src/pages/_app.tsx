import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Figtree, JetBrains_Mono } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${figtree.variable} ${jetBrainsMono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
