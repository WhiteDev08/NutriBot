"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, Paperclip, Mic, ThumbsUp, ThumbsDown, Copy, Share, Sparkles, Apple, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  liked?: boolean
  disliked?: boolean
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm NutriBot, your personal AI dietitian. I'm here to help you with meal planning, nutrition advice, dietary recommendations, and achieving your health goals. How can I assist you today?",
    role: "assistant",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
]

const quickSuggestions = [
  "Plan a healthy meal for today",
  "Calculate my daily calorie needs",
  "Suggest protein-rich breakfast",
  "Help with weight loss diet",
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    // Call FastAPI backend
try {
  const response = await fetch('http://localhost:8000/diet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: userMessage.content }),
  })
  
  const data = await response.json()
  
  const aiResponse: Message = {
    id: (Date.now() + 1).toString(),
    content: data.response,
    role: "assistant",
    timestamp: new Date(),
  }
  setMessages((prev) => [...prev, aiResponse])
} catch (error) {
  const errorResponse: Message = {
    id: (Date.now() + 1).toString(),
    content: "Sorry, I'm having trouble connecting. Please try again.",
    role: "assistant",
    timestamp: new Date(),
  }
  setMessages((prev) => [...prev, errorResponse])
} finally {
  setIsTyping(false)
}
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  const handleLike = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, liked: !msg.liked, disliked: false } : msg)),
    )
  }

  const handleDislike = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, disliked: !msg.disliked, liked: false } : msg)),
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 ring-2 ring-emerald-200 dark:ring-emerald-800">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="NutriBot" />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-semibold">
                    NB
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn("flex flex-col gap-2 max-w-[80%]", message.role === "user" ? "items-end" : "items-start")}
              >
                <Card
                  className={cn(
                    "p-4 shadow-sm",
                    message.role === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-300"
                      : "bg-white dark:bg-slate-800 border-emerald-200/50 dark:border-slate-700/50",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </Card>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>

                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-emerald-100 dark:hover:bg-slate-700"
                        onClick={() => handleLike(message.id)}
                      >
                        <ThumbsUp className={cn("h-3 w-3", message.liked && "text-emerald-600 fill-emerald-600")} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-red-100 dark:hover:bg-red-900/20"
                        onClick={() => handleDislike(message.id)}
                      >
                        <ThumbsDown className={cn("h-3 w-3", message.disliked && "text-red-600 fill-red-600")} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-emerald-100 dark:hover:bg-slate-700"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-emerald-100 dark:hover:bg-slate-700"
                      >
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 ring-2 ring-blue-200 dark:ring-blue-800">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                    U
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <Avatar className="h-8 w-8 ring-2 ring-emerald-200 dark:ring-emerald-800">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="NutriBot" />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-semibold">
                  NB
                </AvatarFallback>
              </Avatar>
              <Card className="p-4 bg-white dark:bg-slate-800 border-emerald-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">NutriBot is thinking...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-muted-foreground">Quick suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300"
                >
                  <Apple className="h-3 w-3 mr-2" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-emerald-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me about nutrition, meal planning, or dietary advice..."
                className="pr-20 bg-white dark:bg-slate-800 border-emerald-200 dark:border-slate-700 focus:border-emerald-400 dark:focus:border-emerald-600 focus:ring-emerald-200 dark:focus:ring-emerald-800"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-100 dark:hover:bg-slate-700">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-100 dark:hover:bg-slate-700">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            NutriBot can make mistakes. Please verify important nutritional information.
          </p>
        </div>
      </div>
    </div>
  )
}
