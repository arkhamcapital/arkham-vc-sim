"use client"

import { cn } from "@/lib/utils"
import { Target } from "lucide-react"

interface ScoreboardProps {
  portfolio: number
  round: number
  totalRounds: number
  roundResults: { correct: boolean; invested: number }[]
}

export function Scoreboard({ round, totalRounds }: ScoreboardProps) {
  const progress = Math.min(Math.max(round / totalRounds, 0), 1) * 100

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span>Rounds</span>
        </div>
        <span className="text-foreground">
          {round}/{totalRounds}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-border overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-500"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
