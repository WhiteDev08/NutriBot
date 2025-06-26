"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, Sparkles, Heart } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-emerald-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden hover:bg-emerald-100 dark:hover:bg-slate-800"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-emerald-200 dark:ring-emerald-800">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="NutriBot" />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                  NB
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  NutriBot AI
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Pro
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Heart className="h-3 w-3 text-red-500" />
                Your Personal Nutrition Expert
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Online
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
