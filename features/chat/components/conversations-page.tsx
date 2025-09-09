"use client"

import { useState } from "react"
import { Button } from "@/features/shared/ui/button"
import { Input } from "@/features/shared/ui/input"
import { Badge } from "@/features/shared/ui/badge"
import { Card, CardContent } from "@/features/shared/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/features/shared/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/shared/ui/tabs"
import { ScrollArea } from "@/features/shared/ui/scroll-area"
import { Textarea } from "@/features/shared/ui/textarea"
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Send, Phone, User, ArrowLeft, Sparkles, Bot } from "lucide-react"

interface AIConversation {
  id: string
  content: string
  sender: "user" | "chidi"
  timestamp: Date
  type?: "text" | "summary"
  topic?: string
}

interface ConversationsPageProps {
  onBack: () => void
  conversations: AIConversation[]
}

export function ConversationsPage({ onBack, conversations }: ConversationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<AIConversation | null>(null)
  const [replyText, setReplyText] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  // Group conversations by topic/session
  const conversationSessions = conversations.reduce((acc, conv) => {
    const sessionId = conv.topic || (conv.timestamp instanceof Date ? conv.timestamp.toDateString() : new Date(conv.timestamp).toDateString())
    if (!acc[sessionId]) {
      acc[sessionId] = []
    }
    acc[sessionId].push(conv)
    return acc
  }, {} as Record<string, AIConversation[]>)

  const sessionList = Object.entries(conversationSessions).map(([sessionId, convs]) => ({
    id: sessionId,
    title: convs[0]?.topic || `Conversation ${convs[0].timestamp instanceof Date ? convs[0].timestamp.toLocaleDateString() : new Date(convs[0].timestamp).toLocaleDateString()}`,
    lastMessage: convs[convs.length - 1],
    messageCount: convs.length,
    timestamp: convs[0].timestamp instanceof Date ? convs[0].timestamp : new Date(convs[0].timestamp),
    conversations: convs
  }))

  const filteredSessions = sessionList.filter((session) => {
    const matchesSearch = 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || 
      (activeFilter === "user" && session.lastMessage.sender === "user") ||
      (activeFilter === "chidi" && session.lastMessage.sender === "chidi")
    return matchesSearch && matchesFilter
  })

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "chidi":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case "user":
        return <User className="w-3 h-3" />
      case "chidi":
        return <Sparkles className="w-3 h-3" />
      default:
        return <MessageSquare className="w-3 h-3" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return timestamp.toLocaleDateString()
  }

  const handleSendReply = () => {
    if (replyText.trim() && selectedConversation) {
      console.log("Sending reply:", replyText)
      setReplyText("")
    }
  }

  const quickReplies = [
    "Show me my sales analytics",
    "Help me add a new product",
    "Which products are running low?",
    "Show me recent customer messages",
    "Help me respond to a customer inquiry",
  ]

  if (selectedConversation) {
    const session = sessionList.find(s => s.id === selectedConversation.topic || s.id === (selectedConversation.timestamp instanceof Date ? selectedConversation.timestamp.toDateString() : new Date(selectedConversation.timestamp).toDateString()))
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">CHIDI AI</span>
                </div>
                <Badge className={`text-xs ${getSenderColor(selectedConversation.sender)}`}>
                  {getSenderIcon(selectedConversation.sender)}
                  <span className="ml-1 capitalize">{selectedConversation.sender}</span>
                </Badge>
              </div>
            </div>
            <div className="w-16" />
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-4 max-w-md mx-auto pb-20">
          <div className="space-y-4">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {session?.conversations.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}>
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
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Reply Interface */}
            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Ask CHIDI anything about your business..."
                  className="flex-1 min-h-[60px]"
                />
                <Button onClick={handleSendReply} disabled={!replyText.trim()} className="self-end">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Replies */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Quick Actions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-1 px-2 bg-transparent"
                      onClick={() => setReplyText(reply)}
                    >
                      {reply.substring(0, 25)}...
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">AI Conversations</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="px-4 py-4 max-w-md mx-auto pb-20">
        <div className="space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search AI conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {["all", "user", "chidi"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="capitalize whitespace-nowrap"
              >
                {filter === "chidi" ? "CHIDI" : filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filteredSessions.map((session) => (
            <Card
              key={session.id}
              className="cursor-pointer hover:shadow-sm transition-shadow"
              onClick={() => setSelectedConversation(session.lastMessage)}
            >
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${
                        session.lastMessage.sender === "user" ? "bg-blue-500" : "bg-primary"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">{session.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getSenderColor(session.lastMessage.sender)}`}>
                          {getSenderIcon(session.lastMessage.sender)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatTimestamp(session.timestamp)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{session.lastMessage.content}</p>
                    <p className="text-xs text-primary mt-1">{session.messageCount} messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No AI conversations found</p>
            <p className="text-xs text-muted-foreground mt-1">Start chatting with CHIDI to see your conversations here</p>
          </div>
        )}
        </div>
      </main>
    </div>
  )
}
