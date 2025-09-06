"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Send, Phone, User } from "lucide-react"

interface Conversation {
  id: number
  customer: string
  message: string
  reply: string
  timestamp: string
  status?: "new" | "replied" | "resolved"
  platform?: "whatsapp" | "instagram"
  customerInfo?: {
    phone?: string
    orders?: number
    lastOrder?: string
  }
}

interface ConversationLogModalProps {
  isOpen: boolean
  onClose: () => void
  conversations: Conversation[]
}

export function ConversationLogModal({ isOpen, onClose, conversations }: ConversationLogModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [replyText, setReplyText] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  // Enhanced conversations with additional data
  const enhancedConversations = conversations.map((conv) => ({
    ...conv,
    status: conv.status || (conv.reply ? "replied" : "new"),
    platform: conv.platform || "whatsapp",
    customerInfo: conv.customerInfo || {
      phone: "+234 801 234 5678",
      orders: Math.floor(Math.random() * 10) + 1,
      lastOrder: "2 days ago",
    },
  }))

  const filteredConversations = enhancedConversations.filter((conv) => {
    const matchesSearch =
      conv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || conv.status === activeFilter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 border-red-200"
      case "replied":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-3 h-3" />
      case "replied":
        return <MessageSquare className="w-3 h-3" />
      case "resolved":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "whatsapp":
        return "bg-green-500"
      case "instagram":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSendReply = () => {
    if (replyText.trim() && selectedConversation) {
      // In real app, this would send the reply via API
      console.log("Sending reply:", replyText)
      setReplyText("")
      // Update conversation status
      setSelectedConversation({ ...selectedConversation, status: "replied" })
    }
  }

  const quickReplies = [
    "Thank you for your message! I'll get back to you shortly.",
    "Yes, we have that item in stock. Would you like to place an order?",
    "Our delivery takes 1-2 business days within Lagos.",
    "We offer a 7-day return policy for all items.",
    "Let me check our current stock and get back to you.",
  ]

  if (selectedConversation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
                ←
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">{selectedConversation.customer[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selectedConversation.customer}</span>
                  <div className={`w-3 h-3 rounded-full ${getPlatformColor(selectedConversation.platform)}`} />
                </div>
                <Badge className={`text-xs ${getStatusColor(selectedConversation.status)}`}>
                  {getStatusIcon(selectedConversation.status)}
                  <span className="ml-1 capitalize">{selectedConversation.status}</span>
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="conversation">Conversation</TabsTrigger>
              <TabsTrigger value="customer">Customer Info</TabsTrigger>
            </TabsList>

            <TabsContent value="conversation" className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Customer Message */}
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{selectedConversation.customer[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm">{selectedConversation.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{selectedConversation.timestamp}</p>
                    </div>
                  </div>

                  {/* CHIDI Reply */}
                  {selectedConversation.reply && (
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-primary/10 rounded-lg p-3">
                          <p className="text-sm">{selectedConversation.reply}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">Sent by CHIDI</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Reply Interface */}
              <div className="border-t p-4 space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 min-h-[60px]"
                  />
                  <Button onClick={handleSendReply} disabled={!replyText.trim()} className="self-end">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Replies */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Quick Replies:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1 px-2 bg-transparent"
                        onClick={() => setReplyText(reply)}
                      >
                        {reply.substring(0, 20)}...
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customer" className="flex-1">
              <div className="p-4 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>{selectedConversation.customer[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedConversation.customer}</h3>
                        <p className="text-sm text-muted-foreground">Customer</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedConversation.customerInfo?.phone}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">{selectedConversation.customerInfo?.orders}</div>
                          <div className="text-xs text-muted-foreground">Total Orders</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{selectedConversation.customerInfo?.lastOrder}</div>
                          <div className="text-xs text-muted-foreground">Last Order</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <User className="w-4 h-4 mr-1" />
                    View Profile
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Phone className="w-4 h-4 mr-1" />
                    Call Customer
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-base">Customer Conversations</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-2">
              {["all", "new", "replied", "resolved"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Conversations List */}
          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {filteredConversations.map((conv) => (
                <Card
                  key={conv.id}
                  className="cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => setSelectedConversation(conv)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="text-sm">{conv.customer[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getPlatformColor(conv.platform)}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sm truncate">{conv.customer}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${getStatusColor(conv.status)}`}>
                              {getStatusIcon(conv.status)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conv.message}</p>
                        {conv.reply && <p className="text-xs text-primary mt-1 truncate">CHIDI: {conv.reply}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {filteredConversations.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No conversations found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
