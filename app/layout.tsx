import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Inter } from "next/font/google"
import { Orbitron } from "next/font/google"
import type { ReactNode } from "react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({ subsets: ["latin"] })

export const metadata = {
  title: "Maco Evaluater",
  description: "AI-powered assistant for evaluating Google enterprise solutions.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("flex min-h-svh flex-col antialiased", inter.className)}>
        <header className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center">
          <h1 className={cn("text-4xl font-bold text-white", orbitron.className)}>Maco Evaluater</h1>
        </header>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}



import './globals.css'