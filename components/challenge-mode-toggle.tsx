"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface ChallengeModeToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export function ChallengeModeToggle({ enabled, onToggle }: ChallengeModeToggleProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700">
      <div className="flex items-center space-x-2">
        <Label htmlFor="challenge-mode" className="font-medium flex items-center">
          Challenge Mode
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Submit intentionally bad app ideas, and our AI will try to make them sound viable! Perfect for
                  creative exercises and laughs.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <span className="text-sm text-orange-500 font-medium">NEW!</span>
      </div>
      <Switch id="challenge-mode" checked={enabled} onCheckedChange={onToggle} />
    </div>
  )
}

