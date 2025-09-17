// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./layout.client"

// ✅ Metadata defined here (server-safe)
export const metadata: Metadata = {
  title: "Jack Careers - Find Your Dream Developer Job",
  description:
    "Discover thousands of developer jobs from top companies. Filter by remote work, tech stack, and experience level.",
  icons: {
    icon: "/jack_career.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
