import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import Navbar from "@/components/home/navbar";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sams",
  description: "Pagina oficial de Sams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          "bg-background font-sans text-foreground antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
