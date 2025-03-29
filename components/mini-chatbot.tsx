"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, Send, X, Minimize2, Maximize2 } from "lucide-react"
import type { RoastLevel } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface MiniChatbotProps {
  appIdea: string
  roastLevel: RoastLevel
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function MiniChatbot({ appIdea, roastLevel }: MiniChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        'Ask me follow-up questions about your app idea! For example: "What if I add a social feature?" or "How can I monetize this?"',
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input, appIdea, roastLevel)
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 p-0 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "400px",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-4 right-4 w-80 md:w-96 bg-gray-900 rounded-lg shadow-xl border border-gray-800 flex flex-col",
              isMinimized ? "h-auto" : "h-[400px]",
            )}
          >
            <CardHeader className="p-3 border-b border-gray-800 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium flex items-center">
                <Bot className="h-4 w-4 mr-2 text-orange-500" />
                Roastivator Assistant
              </CardTitle>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(!isMinimized)}>
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {!isMinimized && (
              <>
                <CardContent className="flex-1 overflow-y-auto p-3 space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.role === "user" ? "bg-orange-600 text-white" : "bg-gray-800 text-gray-100",
                        )}
                      >
                        <div className="flex items-start">
                          {message.role === "assistant" && (
                            <Bot className="h-5 w-5 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />
                          )}
                          <div>{message.content}</div>
                          {message.role === "user" && (
                            <User className="h-5 w-5 ml-2 mt-0.5 text-orange-300 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-800 text-gray-100">
                        <div className="flex items-center">
                          <Bot className="h-5 w-5 mr-2 text-orange-500" />
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>

                <CardFooter className="p-3 pt-0">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      ref={inputRef}
                      placeholder="Ask a follow-up question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-gray-800 border-gray-700"
                      disabled={isLoading}
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Helper function to generate responses
function generateResponse(question: string, appIdea: string, roastLevel: RoastLevel): string {
  const questionLower = question.toLowerCase()

  // Check for common follow-up questions
  if (questionLower.includes("social") || questionLower.includes("community")) {
    if (roastLevel === "dark") {
      return "Adding social features? Great, because what every app needs is ANOTHER timeline to scroll through. But if you must, focus on meaningful interactions rather than vanity metrics. Maybe limit interactions to make them more valuable."
    } else if (roastLevel === "medium") {
      return "Social features could work IF you have a clear purpose beyond 'let's add social because everyone else does.' Consider focused community features around specific actions or goals rather than generic social feeds."
    } else {
      return "Social features can be great! Just make sure they serve your core value proposition. Consider starting with lightweight social elements like the ability to share achievements or collaborate on specific tasks."
    }
  }

  if (questionLower.includes("monetize") || questionLower.includes("money") || questionLower.includes("revenue")) {
    if (roastLevel === "dark") {
      return "Ah yes, monetization - the thing everyone leaves as an afterthought. 'We'll figure it out later' is startup code for 'We'll be out of business in 18 months.' Consider a clear value proposition people will actually pay for, not just ads or subscriptions nobody wants."
    } else if (roastLevel === "medium") {
      return "Monetization should be part of your core design, not slapped on later. If you're thinking 'we'll just add ads,' prepare for disappointment. Consider what unique value you're creating that people would actually open their wallets for."
    } else {
      return "For monetization, think about the core value you're providing. Subscription models work well if you deliver ongoing value. Premium features can work too, but make sure your free tier is compelling enough to attract users in the first place."
    }
  }

  if (questionLower.includes("feature") || questionLower.includes("add")) {
    if (roastLevel === "dark") {
      return "More features? That's your solution? Most apps fail because they're bloated with features nobody asked for, not because they're missing the magical 37th feature. Focus on making your core offering exceptional before adding more bells and whistles."
    } else if (roastLevel === "medium") {
      return "Before adding more features, ask yourself: does this solve a real user problem or am I just adding it because it seems cool? Feature bloat is the silent killer of otherwise promising apps."
    } else {
      return "New features can definitely enhance your app! Just make sure each one aligns with your core value proposition and solves a real user need. Consider implementing an MVP first, then adding features based on actual user feedback."
    }
  }

  if (questionLower.includes("market") || questionLower.includes("competitor")) {
    if (roastLevel === "dark") {
      return "The market is saturated with mediocre apps solving imaginary problems. Your competitors aren't who you think they are - you're competing with EVERY app for limited user attention. Unless you're 10x better in a specific way, you're just digital noise."
    } else if (roastLevel === "medium") {
      return "Don't just look at direct competitors - look at how users are currently solving the problem you're addressing. Sometimes your biggest competitor is 'good enough' existing solutions or simple workarounds that don't require downloading yet another app."
    } else {
      return "Market research is crucial! Look beyond obvious competitors to understand how people currently solve the problem you're addressing. Find a specific angle or audience segment that's underserved by current solutions."
    }
  }

  // Default responses if no specific topic is detected
  if (roastLevel === "dark") {
    return "Look, I appreciate your enthusiasm, but enthusiasm doesn't download apps. Focus on solving a REAL problem in a way that's significantly better than existing solutions. Otherwise, you're just adding to the digital landfill."
  } else if (roastLevel === "medium") {
    return "That's an interesting question. Remember that successful apps solve real problems in unique ways. Don't get distracted by shiny features - focus on your core value proposition and execute it exceptionally well."
  } else {
    return "Great question! The most successful apps start with a clear focus on solving one problem really well. Start with your core functionality, get it in users' hands quickly, and iterate based on real feedback rather than assumptions."
  }
}

