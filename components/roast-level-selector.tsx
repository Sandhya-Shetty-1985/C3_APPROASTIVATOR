"use client"

import { useState } from "react"
import type { RoastLevel } from "@/lib/types"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface RoastLevelSelectorProps {
  selectedLevel: RoastLevel
  onSelectLevel: (level: RoastLevel) => void
}

export function RoastLevelSelector({ selectedLevel, onSelectLevel }: RoastLevelSelectorProps) {
  const [sliderValue, setSliderValue] = useState(selectedLevel === "light" ? 25 : selectedLevel === "medium" ? 50 : 75)

  const levels: {
    value: RoastLevel
    label: string
    emoji: string
    description: string
    example: string
  }[] = [
    {
      value: "light",
      label: "Light Roast",
      emoji: "☕",
      description: "Playful, friendly teasing",
      example:
        "\"Another food app? That's like bringing a sandwich to a potluck. It works, but it's not winning any creativity awards.\"",
    },
    {
      value: "medium",
      label: "Medium Roast",
      emoji: "🔥",
      description: "Honest but constructive humor",
      example:
        '"Oh great, another food app! Because the 500 existing ones clearly weren\'t enough. Did you and every other startup founder have the same dream last night?"',
    },
    {
      value: "dark",
      label: "Dark Roast",
      emoji: "☠️",
      description: "Brutally honest, but still helpful",
      example:
        '"A food app? Seriously? That\'s about as original as a millennial with an avocado toast Instagram. The App Store is BEGGING you to come up with something else."',
    },
  ]

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0]
    setSliderValue(newValue)

    // Determine roast level based on slider value
    let newLevel: RoastLevel = "medium"
    if (newValue <= 33) {
      newLevel = "light"
    } else if (newValue <= 66) {
      newLevel = "medium"
    } else {
      newLevel = "dark"
    }

    if (newLevel !== selectedLevel) {
      onSelectLevel(newLevel)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg font-medium">Select your roast level:</label>
        <Collapsible className="max-w-[400px]">
          <CollapsibleTrigger className="flex items-center text-sm text-gray-400 hover:text-gray-300">
            See examples
            <ChevronDown className="h-4 w-4 ml-1" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {levels.map((level) => (
              <div key={level.value} className="bg-gray-800 p-3 rounded-md">
                <div className="flex items-center mb-1">
                  <span className="mr-2">{level.emoji}</span>
                  <span className="font-medium">{level.label}</span>
                </div>
                <p className="text-sm text-gray-300 italic">{level.example}</p>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Interactive Roast Meter Slider */}
      <div className="space-y-4">
        <div className="pt-4">
          <Slider defaultValue={[sliderValue]} max={100} step={1} onValueChange={handleSliderChange} className="py-4" />
          <div className="flex justify-between text-sm mt-1">
            <div className="flex items-center">
              <span className="mr-1">☕</span>
              <span>Light</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🔥</span>
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">☠️</span>
              <span>Dark</span>
            </div>
          </div>
        </div>

        <div
          className="bg-gray-800 p-3 rounded-md border-l-4 border-r-4 transition-all duration-300"
          style={{
            borderLeftColor: sliderValue <= 33 ? "rgb(245, 158, 11)" : "transparent",
            borderRightColor: sliderValue >= 67 ? "rgb(220, 38, 38)" : "transparent",
            borderTopColor: sliderValue > 33 && sliderValue < 67 ? "rgb(249, 115, 22)" : "transparent",
            borderBottomColor: sliderValue > 33 && sliderValue < 67 ? "rgb(249, 115, 22)" : "transparent",
          }}
        >
          <div className="flex items-center">
            <span className="text-2xl mr-2">{sliderValue <= 33 ? "☕" : sliderValue <= 66 ? "🔥" : "☠️"}</span>
            <div>
              <div className="font-medium">
                {sliderValue <= 33 ? "Light Roast" : sliderValue <= 66 ? "Medium Roast" : "Dark Roast"}
              </div>
              <div className="text-sm text-gray-400">
                {sliderValue <= 33
                  ? "Playful, friendly teasing"
                  : sliderValue <= 66
                    ? "Honest but constructive humor"
                    : "Brutally honest, but still helpful"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

