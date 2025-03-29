"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoastMeter } from "./roast-meter"
import type { RoastResponse, RoastLevel } from "@/lib/types"
import { ShareButtons } from "./share-buttons"
import { Badge } from "@/components/ui/badge"
import { Flame, Lightbulb, AlertTriangle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface RoastResultProps {
  result: RoastResponse
  roastLevel: RoastLevel
  challengeMode?: boolean
}

export function RoastResult({ result, roastLevel, challengeMode = false }: RoastResultProps) {
  const [activeTab, setActiveTab] = useState("roast")

  const MotionCard = motion(Card)

  return (
    <MotionCard
      className="bg-gray-800 border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader className="bg-gray-900 pb-4">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-2xl">{challengeMode ? "Challenge Results" : "Your Roast Results"}</CardTitle>
          <div className="flex items-center gap-2">
            {challengeMode && (
              <Badge variant="outline" className="border-purple-500 text-purple-500">
                Challenge Mode 🔮
              </Badge>
            )}
            <Badge
              variant="outline"
              className={
                roastLevel === "light"
                  ? "border-amber-500 text-amber-500"
                  : roastLevel === "medium"
                    ? "border-orange-500 text-orange-500"
                    : "border-red-600 text-red-600"
              }
            >
              {roastLevel === "light" ? "Light Roast ☕" : roastLevel === "medium" ? "Medium Roast 🔥" : "Dark Roast ☠️"}
            </Badge>
          </div>
        </div>
        {!challengeMode && <RoastMeter level={roastLevel} />}
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 bg-gray-900">
            <TabsTrigger value="roast" className="data-[state=active]:bg-gray-800">
              {challengeMode ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  The Potential
                </>
              ) : (
                <>
                  <Flame className="mr-2 h-4 w-4" />
                  The Roast
                </>
              )}
            </TabsTrigger>
            <TabsTrigger value="improve" className="data-[state=active]:bg-gray-800">
              <Lightbulb className="mr-2 h-4 w-4" />
              How to Improve
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roast" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-amber-500 mr-2">🧐</span> Originality
                </h3>
                <p className="text-gray-300">{result.originality}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-orange-500 mr-2">🚫</span> Problem Solving
                </h3>
                <p className="text-gray-300">{result.problemSolving}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-red-500 mr-2">😴</span> Engagement Potential
                </h3>
                <p className="text-gray-300">{result.engagement}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-700">
                <h3 className="text-lg font-medium flex items-center">
                  {challengeMode ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
                      Why It Might Work
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                      Why It Might Flop
                    </>
                  )}
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {result.whyItMightFlop.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="improve" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-green-500 mr-2">✅</span> Make it Unique
                </h3>
                <p className="text-gray-300">{result.improvements.makeUnique}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-blue-500 mr-2">✅</span> Make it Engaging
                </h3>
                <p className="text-gray-300">{result.improvements.makeEngaging}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <span className="text-purple-500 mr-2">✅</span> Solve a Real Problem
                </h3>
                <p className="text-gray-300">{result.improvements.solveRealProblem}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <ShareButtons roastResult={result} challengeMode={challengeMode} />
        </div>
      </CardContent>
    </MotionCard>
  )
}

