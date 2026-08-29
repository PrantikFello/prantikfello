import type { Metadata } from "next";
import "./globals.css";
import { LocalThemeProvider } from "@/components/Theme/themeProvider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prantik Roy",
  description: "This is my portfolio website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) { 



  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <body
        className="h-screen flex flex-col font-sans transition-colors duration-200"
        style={{
          backgroundColor: "var(--alpha)",
          color: "var(--beta)",
        }}
      >
        <LocalThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header
            className="sticky top-0 z-50 border-b backdrop-blur"
            style={{
              borderColor: "var(--alpha-7)",
              backgroundColor: "var(--alpha-1)",
            }}
          >
            <nav className="max-w-6xl mx-auto px-2 md:px-6 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="font-mono font-bold tracking-tight text-sm flex items-center gap-1.5"
              >
                <span style={{ color: "var(--link-number)"}} className="flex-nowrap text-nowrap">00//^v</span> PRANTIK_ROY
              </Link>
              <div className="flex gap-1 text-sm font-medium md:gap-3">
                <Link
                  href="/Profile"
                  className="transition-colors hover:opacity-80 font-bold underline "
                  style={{ color: "var(--link-text)" }}
                >
                  Profile
                </Link>
                <Link
                  href="/MyProjects"
                  className="transition-colors hover:opacity-80 font-bold underline "
                  style={{ color: "var(--link-text)" }}
                >
                  Projects
                </Link>
                <Link
                  href="/PlantRepo"
                  className="transition-colors hover:opacity-80 font-bold underline "
                  style={{ color: "var(--link-text)" }}
                >
                  Ground
                </Link>
              </div>
            </nav>
          </header>

          <main
            className="flex-1 w-full w full"
          >
            {children}
          </main>
        </LocalThemeProvider>
      </body>
    </html>
  );
}