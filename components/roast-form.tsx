"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { RoastResult } from "./roast-result"
import { RoastLevelSelector } from "./roast-level-selector"
import { generateRoast } from "@/lib/roast-generator"
import type { RoastLevel, RoastResponse } from "@/lib/types"
import { Loader2 } from "lucide-react"
import { ChallengeModeToggle } from "./challenge-mode-toggle"
import { MiniChatbot } from "./mini-chatbot"

export function RoastForm() {
  const [appIdea, setAppIdea] = useState("")
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("medium")
  const [roastResult, setRoastResult] = useState<RoastResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [challengeMode, setChallengeMode] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!appIdea.trim()) return

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const result = generateRoast(appIdea, roastLevel, challengeMode)
      setRoastResult(result)
      setIsLoading(false)
      setShowResult(true)
    }, 1500)
  }

  const handleReset = () => {
    setAppIdea("")
    setRoastResult(null)
    setShowResult(false)
  }

  return (
    <div className="space-y-8">
      {!showResult ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="app-idea" className="text-lg font-medium">
                  Describe your app idea:
                </label>
                <Textarea
                  id="app-idea"
                  placeholder={
                    challengeMode
                      ? "e.g., An app that lets you smell what your friends are cooking..."
                      : "e.g., An app that helps people find the perfect avocado at the grocery store..."
                  }
                  className="h-32 bg-gray-700 border-gray-600 placeholder:text-gray-400"
                  value={appIdea}
                  onChange={(e) => setAppIdea(e.target.value)}
                  required
                />
              </div>

              <ChallengeModeToggle enabled={challengeMode} onToggle={setChallengeMode} />

              <RoastLevelSelector selectedLevel={roastLevel} onSelectLevel={setRoastLevel} />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {challengeMode ? "Finding Potential..." : "Roasting..."}
                  </>
                ) : challengeMode ? (
                  "Make This Viable 🔮"
                ) : (
                  "Roast My Idea 🔥"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <RoastResult result={roastResult!} roastLevel={roastLevel} challengeMode={challengeMode} />
          <div className="flex justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-950"
            >
              {challengeMode ? "Try Another Idea" : "Roast Another Idea"}
            </Button>
          </div>

          {/* Mini Chatbot */}
          <MiniChatbot appIdea={appIdea} roastLevel={roastLevel} />
        </div>
      )}
    </div>
  )
}

