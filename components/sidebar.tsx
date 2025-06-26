"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X, MessageCircle, Plus, Clock, Star, Trash2, Apple, Calculator, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const chatHistory = [
  { id: 1, title: "Weekly Meal Planning", time: "2 hours ago", starred: true },
  { id: 2, title: "Protein Requirements", time: "1 day ago", starred: false },
  { id: 3, title: "Healthy Breakfast Ideas", time: "2 days ago", starred: true },
  { id: 4, title: "Weight Loss Strategy", time: "3 days ago", starred: false },
  { id: 5, title: "Vitamin D Deficiency", time: "1 week ago", starred: false },
]

const quickActions = [
  { icon: Apple, label: "Meal Analysis", color: "text-red-500" },
  { icon: Calculator, label: "Calorie Counter", color: "text-blue-500" },
  { icon: Target, label: "Goal Setting", color: "text-purple-500" },
  { icon: TrendingUp, label: "Progress Track", color: "text-green-500" },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-r border-emerald-200/50 dark:border-slate-700/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-emerald-200/50 dark:border-slate-700/50">
            <h2 className="font-semibold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Chat History
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden hover:bg-emerald-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              New Consultation
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="px-4 pb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-3 flex flex-col items-center gap-1 hover:bg-emerald-50 dark:hover:bg-slate-800 border-emerald-200/50 dark:border-slate-700/50"
                >
                  <action.icon className={cn("h-4 w-4", action.color)} />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator className="bg-emerald-200/50 dark:bg-slate-700/50" />

          {/* Chat History */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 py-4">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-slate-800/50",
                    selectedChat === chat.id &&
                      "bg-emerald-100 dark:bg-slate-800 ring-1 ring-emerald-200 dark:ring-slate-700",
                  )}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{chat.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-emerald-200 dark:hover:bg-slate-700"
                    >
                      <Star
                        className={cn(
                          "h-3 w-3",
                          chat.starred ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground",
                        )}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/20">
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-emerald-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>5 conversations</span>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              >
                Pro Plan
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
