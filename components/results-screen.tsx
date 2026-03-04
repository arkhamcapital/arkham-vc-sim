"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { formatMoney } from "./investment-slider"
import { rounds } from "@/lib/quiz-data"
import { RotateCcw, Trophy, TrendingDown, Minus } from "lucide-react"
import Link from "next/link"

interface RoundResult {
  correct: boolean
  invested: number
  roundId: number
}

interface ResultsScreenProps {
  roundResults: RoundResult[]
  onRestart: () => void
}

export function ResultsScreen({ roundResults, onRestart }: ResultsScreenProps) {
  const startingAmount = 1_000_000
  const correctPicks = roundResults.filter((r) => r.correct).length
  const totalInvested = roundResults.reduce((sum, r) => sum + r.invested, 0)
  const totalLost = roundResults.filter((r) => !r.correct).reduce((sum, r) => sum + r.invested, 0)
  const finalPortfolio = startingAmount - totalLost
  const pnl = finalPortfolio - startingAmount
  const pnlPercent = ((pnl / startingAmount) * 100).toFixed(1)
  const isUp = pnl >= 0

  let grade: string
  let gradeColor: string
  let message: string

  if (correctPicks === 10) {
    grade = "S"
    gradeColor = "text-accent"
    message = "Perfect score. You have legendary investor instincts."
  } else if (correctPicks >= 8) {
    grade = "A"
    gradeColor = "text-primary"
    message = "Outstanding. You clearly have an eye for real opportunity."
  } else if (correctPicks >= 6) {
    grade = "B"
    gradeColor = "text-foreground"
    message = "Solid performance. You beat the odds on most rounds."
  } else if (correctPicks >= 4) {
    grade = "C"
    gradeColor = "text-muted-foreground"
    message = "Average run. You need to sharpen your due diligence."
  } else {
    grade = "F"
    gradeColor = "text-destructive"
    message = "Rough outing. The market took you for a ride."
  }

  return (
    <div className="flex flex-col items-center gap-8 py-8 md:py-12">
      {/* Big grade */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.3em]">
          Investor Grade
        </span>
        <span className={cn("text-8xl md:text-9xl font-bold font-mono", gradeColor)}>
          {grade}
        </span>
      </div>

      {/* Final portfolio */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Final Portfolio
        </span>
        <span className="text-4xl md:text-5xl font-bold font-mono text-foreground tabular-nums">
          {formatMoney(finalPortfolio)}
        </span>
        <span
          className={cn(
            "text-lg font-mono tabular-nums",
            isUp ? "text-primary" : "text-destructive"
          )}
        >
          {isUp ? "+" : ""}{pnlPercent}% return
        </span>
      </div>

      {/* Message */}
      <p className="text-center text-muted-foreground max-w-md leading-relaxed">
        {message}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4">
          <Trophy className="w-5 h-5 text-primary mb-1" />
          <span className="text-2xl font-bold font-mono text-foreground">{correctPicks}/10</span>
          <span className="text-xs text-muted-foreground font-mono">Correct</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4">
          <Minus className="w-5 h-5 text-muted-foreground mb-1" />
          <span className="text-2xl font-bold font-mono text-foreground">{formatMoney(totalInvested)}</span>
          <span className="text-xs text-muted-foreground font-mono">Total Invested</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4">
          <TrendingDown className="w-5 h-5 text-destructive mb-1" />
          <span className="text-2xl font-bold font-mono text-destructive">{formatMoney(totalLost)}</span>
          <span className="text-xs text-muted-foreground font-mono">Lost</span>
        </div>
      </div>

      {/* Round-by-round */}
      <div className="w-full max-w-lg">
        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
          Round-by-Round
        </h3>
        <div className="flex flex-col gap-2">
          {roundResults.map((result, i) => {
            const roundData = rounds.find((r) => r.id === result.roundId)
            const realCompany = roundData?.companies.find((c) => c.isReal)
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg border",
                  result.correct ? "border-primary/20 bg-primary/5" : "border-destructive/20 bg-destructive/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-6">R{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">
                    {realCompany?.name ?? "—"}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-mono font-bold uppercase tracking-wider",
                      result.correct ? "text-primary" : "text-destructive"
                    )}
                  >
                    {result.correct ? "Correct" : "Wrong"}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-sm font-mono tabular-nums font-bold",
                    result.correct ? "text-primary" : "text-destructive"
                  )}
                >
                  {result.correct ? "+" : "-"}{formatMoney(result.invested)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Restart */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          onClick={onRestart}
          size="lg"
          className="group inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-600 px-8 text-lg font-mono font-semibold tracking-wider text-white shadow-[0_0_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.9)]"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="flex-1 rounded-xl border h-12 border-emerald-500/40 bg-card/60 font-mono tracking-widest text-xs uppercase text-emerald-300 hover:bg-card/60 hover:border-emerald-400 hover:text-emerald-400"
        >
          <Link href="/submit-startup">
            Founder - Let's Connect          </Link>
        </Button>
      </div>
    </div>
  )
}
