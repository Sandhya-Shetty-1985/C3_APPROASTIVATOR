"use client"

import { useEffect, useState } from "react"
import type { RoastLevel } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RoastMeterProps {
  level: RoastLevel
  animate?: boolean
}

export function RoastMeter({ level, animate = true }: RoastMeterProps) {
  const [currentLevel, setCurrentLevel] = useState(0)

  const levelValues = {
    light: 33,
    medium: 66,
    dark: 100,
  }

  const targetLevel = levelValues[level]

  useEffect(() => {
    if (!animate) {
      setCurrentLevel(targetLevel)
      return
    }

    const interval = setInterval(() => {
      setCurrentLevel((prev) => {
        if (prev < targetLevel) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 15)

    return () => clearInterval(interval)
  }, [targetLevel, animate])

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>Light</span>
        <span>Medium</span>
        <span>Dark</span>
      </div>
      <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300 rounded-full",
            currentLevel <= 33 ? "bg-amber-500" : currentLevel <= 66 ? "bg-orange-500" : "bg-red-600",
          )}
          style={{ width: `${currentLevel}%` }}
        />
      </div>
    </div>
  )
}

