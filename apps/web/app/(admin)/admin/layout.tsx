import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/lib/providers";
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"



const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin'], // or ['latin', 'latin-ext']
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Admin Panel | AlgoChef.Dev",
  description: "Manage Problems and Resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}  antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}



