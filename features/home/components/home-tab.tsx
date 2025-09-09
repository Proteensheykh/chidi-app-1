"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/features/shared/ui/button"
import { Input } from "@/features/shared/ui/input"
import { Send, Sparkles, Package, DollarSign, MessageCircle, BarChart3, MessageSquare } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "chidi"
  timestamp: Date
  type?: "text" | "summary"
}

interface HomeTabProps {
  products: any[]
  onQuickEdit: (product: any) => void
  onShowConversations: () => void
  onOpenChat: () => void
}

export function HomeTab({ products, onQuickEdit, onShowConversations, onOpenChat }: HomeTabProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me check your current inventory and sales data.",
        "Based on your recent activity, I notice you have some products running low on stock. Would you like me to help you restock?",
        "Your sales are looking great this week! The Blue Ankara Dress is your top performer. Want to see more analytics?",
        "I can help you respond to customer inquiries, manage inventory, or analyze your sales trends. What would you like to focus on?",
        "Let me pull up your recent customer conversations. I see Mike asked about your return policy - would you like me to draft a response?",
      ]

      const chidiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "chidi",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, chidiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    { label: "Customer Messages", action: () => handleQuickAction("Show me recent customer messages") },
    { label: "Conversation History", action: () => onShowConversations() },
    { label: "Add Product", action: () => handleQuickAction("Help me add a new product") },
    { label: "Low Stock Alert", action: () => handleQuickAction("Which products are running low?") },
    { label: "Sales Analytics", action: () => handleQuickAction("Show me this week's performance") },
  ]

  const handleQuickAction = (message: string) => {
    setInputValue(message)
    setTimeout(() => handleSendMessage(), 100)
  }





  return (
    <div className="flex flex-col h-full">
      {/* Welcome Message */}
      <div className="p-4 border-b border-border bg-card">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Oya, let's make this money! 💰</h2>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {message.sender === "chidi" && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium">CHIDI</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium">CHIDI</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 mb-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask CHIDI anything about your business..."
            className="flex-1 h-12 text-base"
          />
          <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()} className="h-12 w-12">
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap bg-transparent h-8"
              onClick={action.action}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
