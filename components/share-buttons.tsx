"use client"

import { Button } from "@/components/ui/button"
import type { RoastResponse } from "@/lib/types"
import { Share2, Twitter, Facebook, Clipboard, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  roastResult: RoastResponse
  challengeMode?: boolean
}

export function ShareButtons({ roastResult, challengeMode = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareText = challengeMode
    ? `I just turned a ridiculous app idea into something viable with App Roastivator's Challenge Mode! Here's what it said: "${roastResult.originality}" Check it out!`
    : `I just got my app idea roasted by App Roastivator! Here's what it said: "${roastResult.originality}" Check it out!`

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    toast({
      title: "Copied to clipboard!",
      description: "Share your results with friends",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank")
  }

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`,
      "_blank",
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-400 flex items-center">
        <Share2 className="mr-2 h-4 w-4" />
        Share your {challengeMode ? "results" : "roast"}
      </h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-blue-500 text-blue-500 hover:bg-blue-950"
          onClick={handleShareTwitter}
        >
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-indigo-500 text-indigo-500 hover:bg-indigo-950"
          onClick={handleShareFacebook}
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-500 text-gray-300 hover:bg-gray-800"
          onClick={handleCopyToClipboard}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Clipboard className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

