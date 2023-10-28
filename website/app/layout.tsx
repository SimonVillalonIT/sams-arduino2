import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Navbar from "@/components/home/navbar"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <body>
                <ThemeProvider attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html >
    )
}
