"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react"
import { formatMoney } from "./investment-slider"

interface ScoreboardProps {
  portfolio: number
  round: number
  totalRounds: number
  roundResults: { correct: boolean; invested: number }[]
}

export function Scoreboard({ portfolio, round, totalRounds, roundResults }: ScoreboardProps) {
  const startingAmount = 1_000_000
  const pnl = portfolio - startingAmount
  const pnlPercent = ((pnl / startingAmount) * 100).toFixed(1)
  const isUp = pnl >= 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Portfolio */}
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <DollarSign className="w-3 h-3" />
          Portfolio
        </div>
        <span className="text-xl md:text-2xl font-bold font-mono text-foreground tabular-nums">
          {formatMoney(portfolio)}
        </span>
      </div>

      {/* P&L */}
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {"P&L"}
        </div>
        <span
          className={cn(
            "text-xl md:text-2xl font-bold font-mono tabular-nums",
            isUp ? "text-primary" : "text-destructive"
          )}
        >
          {isUp ? "+" : ""}{pnlPercent}%
        </span>
      </div>

      {/* Round */}
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <Target className="w-3 h-3" />
          Round
        </div>
        <span className="text-xl md:text-2xl font-bold font-mono text-foreground tabular-nums">
          {round}/{totalRounds}
        </span>
      </div>

      {/* Accuracy */}
      <div className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
          <TrendingUp className="w-3 h-3" />
          Accuracy
        </div>
        <span className="text-xl md:text-2xl font-bold font-mono text-foreground tabular-nums">
          {"??"}%
        </span>
      </div>
    </div>
  )
}
