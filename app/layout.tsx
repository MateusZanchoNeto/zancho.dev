import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s | zancho.dev",
        default: "Mateus Zancho Neto | Full Stack Developer",
    },
    description:
        "The interactive portfolio of Mateus Zancho Neto, a Full Stack Developer specializing in high-performance systems with React, Next.js, Rust, and Java.",
    keywords: [
        "React Developer",
        "Full Stack Developer",
        "Next.js",
        "Rust",
        "Java",
        "Node.js",
        "PostgreSQL",
        "Portfolio",
        "Mateus Zancho Neto",
    ],
    authors: [{ name: "Mateus Zancho Neto", url: "https://zancho-dev.vercel.app" }],

    openGraph: {
        title: "Mateus Zancho Neto | Full Stack Developer",
        description:
            "The interactive portfolio of Mateus Zancho Neto, a Full Stack Developer specializing in high-performance systems with React, Next.js, Rust, and Java.",
        url: "https://zancho-dev.vercel.app",
        siteName: "zancho-dev.vercel.app",
        images: [
            {
                url: "https://zancho-dev.vercel.app/og-image.png",
                width: 1200,
                height: 630,
                alt: "Mateus Zancho Neto - Full Stack Developer Portfolio",
            },
        ],
        type: "website",
    },

    manifest: "/manifest.webmanifest",
    icons: {
        icon: "/icon.svg",
        shortcut: "/favicon.ico",
        apple: "/apple-icon.png",
    },

    twitter: {
        card: "summary_large_image",
        title: "zancho.dev - Mateus Zancho Neto | Full Stack Developer",
        description:
            "The interactive portfolio of Mateus Zancho Neto, a Full Stack Developer specializing in high-performance systems with React, Next.js, Rust, and Java.",
        images: ["https://zancho-dev.vercel.app/og-image.png"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
