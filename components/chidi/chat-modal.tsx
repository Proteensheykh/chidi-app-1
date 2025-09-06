"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Zap, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "chidi"
  timestamp: Date
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm CHIDI, your AI business assistant. I can help you manage your inventory, answer customer questions, and grow your business. What would you like to know?",
      sender: "chidi",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateChidiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Stock-related queries
    if (lowerMessage.includes("stock") || lowerMessage.includes("inventory")) {
      return "I can help you check your stock levels! You currently have 2 items running low: Blue Ankara Dress (2 left) and Wireless Earbuds (out of stock). Would you like me to help you restock these items?"
    }

    // Sales queries
    if (lowerMessage.includes("sales") || lowerMessage.includes("revenue")) {
      return "Your sales are looking great! This week you've made ₦45,000 in sales with 12 orders from 8 new customers. That's a 15% increase from last week!"
    }

    // Customer service
    if (lowerMessage.includes("customer") || lowerMessage.includes("message")) {
      return "You have 3 recent customer messages. Jane is asking about size M availability, Mike wants to know about your return policy, and Sarah is asking about delivery. Would you like me to help you respond to any of these?"
    }

    // Product management
    if (lowerMessage.includes("add product") || lowerMessage.includes("new product")) {
      return "I can help you add new products! Just tell me the product name, price, and stock quantity, and I'll add it to your inventory. What product would you like to add?"
    }

    // Business advice
    if (lowerMessage.includes("grow") || lowerMessage.includes("improve") || lowerMessage.includes("advice")) {
      return "Based on your sales data, I recommend focusing on restocking your popular items like the Blue Ankara Dress. You might also want to promote your Leather Handbags since they have good stock levels. Would you like me to help you create a promotional message?"
    }

    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Great to see you again. How can I help you manage your business today? I can check your stock, help with customer messages, or give you sales insights."
    }

    // Default response
    return "I'm here to help with your business! I can assist with inventory management, customer service, sales tracking, and business growth advice. What specific area would you like help with?"
  }

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

    // Simulate AI thinking time
    setTimeout(() => {
      const chidiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateChidiResponse(inputValue),
        sender: "chidi",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, chidiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            Chat with CHIDI
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="text-xs">
                  {message.sender === "user" ? (
                    "You"
                  ) : (
                    <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </AvatarFallback>
              </Avatar>
              <div className={`flex-1 max-w-[80%] ${message.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`rounded-lg p-3 text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="text-xs">
                  <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-primary-foreground" />
                  </div>
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-muted-foreground">CHIDI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask CHIDI anything about your business..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {["Check my stock", "Show sales this week", "Help with customers", "Add new product"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs whitespace-nowrap bg-transparent"
                onClick={() => setInputValue(suggestion)}
                disabled={isTyping}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
