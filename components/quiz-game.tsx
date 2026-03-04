"use client"

import { useState, useCallback } from "react"
import { rounds } from "@/lib/quiz-data"
import { CompanyCard } from "./company-card"
import { InvestmentSlider, formatMoney } from "./investment-slider"
import { Scoreboard } from "./scoreboard"
import { ResultsScreen } from "./results-screen"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Send, AlertTriangle } from "lucide-react"

const STARTING_AMOUNT = 1_000_000
const ROUND_INVESTMENT = 100_000

interface RoundResult {
  correct: boolean
  invested: number
  roundId: number
}

export function QuizGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "finished">("intro")
  const [currentRound, setCurrentRound] = useState(0)
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState(ROUND_INVESTMENT)
  const [roundResults, setRoundResults] = useState<RoundResult[]>([])

  const round = rounds[currentRound]

  const handleSubmit = useCallback(() => {
    if (selectedCompany === null) return

    const company = round.companies[selectedCompany]
    const isCorrect = company.isReal

    const newResult: RoundResult = {
      correct: isCorrect,
      invested: investmentAmount,
      roundId: round.id,
    }

    setRoundResults((prev) => [...prev, newResult])

    // Immediately move to next round or finish without revealing correctness per round
    if (currentRound >= rounds.length - 1) {
      setGameState("finished")
    } else {
      setCurrentRound((prev) => prev + 1)
      setSelectedCompany(null)
    }
  }, [selectedCompany, round, investmentAmount, currentRound])

  const handleRestart = useCallback(() => {
    setGameState("intro")
    setCurrentRound(0)
    setSelectedCompany(null)
    setInvestmentAmount(ROUND_INVESTMENT)
    setRoundResults([])
  }, [])

  const handleStart = useCallback(() => {
    setGameState("playing")
    setInvestmentAmount(ROUND_INVESTMENT)
  }, [])

  

  // Intro screen
  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 px-4">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">
            Test your investor instincts
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center text-balance leading-tight">
            VC-simulator
          </h1>
          <p className="text-muted-foreground text-center max-w-lg leading-relaxed mt-2">
            {"You've been given "}
            <span className="text-foreground font-mono font-bold">
              {formatMoney(STARTING_AMOUNT)}
            </span>
            {" to invest. Over 10 rounds, you'll put "}
            <span className="text-foreground font-mono font-bold">
              {formatMoney(ROUND_INVESTMENT)}
            </span>
            {" into one company per round. Two are fake, one is real. Pick the real company and your stake stays in your portfolio, pick wrong and that round's "}
            <span className="text-foreground font-mono font-bold">
              {formatMoney(ROUND_INVESTMENT)}
            </span>
            {" goes straight to 0."}
          </p>
        </div>

        <Button
          onClick={handleStart}
          size="lg"
          className="group relative mt-4 inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-600 px-10 text-lg font-mono font-semibold tracking-wider text-white shadow-[0_0_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.9)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:translate-y-1/2 before:scale-150 before:bg-emerald-500/60 before:blur-3xl before:opacity-0 before:transition-all before:duration-500 before:content-[''] group-hover:before:translate-y-0 group-hover:before:opacity-100"
        >
          Start Investing
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    )
  }

  // Results screen
  if (gameState === "finished") {
    return (
      <ResultsScreen
        roundResults={roundResults}
        onRestart={handleRestart}
      />
    )
  }

  // Game screen (playing + revealed)
  return (
    <div className="flex flex-col gap-6">
      {/* Scoreboard */}
      <Scoreboard
        portfolio={STARTING_AMOUNT}
        round={currentRound + 1}
        totalRounds={rounds.length}
        roundResults={roundResults}
      />

      {/* Round header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">
            Round {currentRound + 1}
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {round.era}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Which company is real?
        </h2>
        <p className="text-sm text-muted-foreground">
          Select the company you believe actually existed. Each round you put 100,000 into a single company—get it
          right and your stake survives, get it wrong and that 100,000 goes to 0.
        </p>
      </div>

      {/* Company cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {round.companies.map((company, index) => (
          <CompanyCard
            key={`${round.id}-${index}`}
            company={company}
            index={index}
            isSelected={selectedCompany === index}
            isRevealed={false}
            heat={
              roundResults.length === 0
                ? "neutral"
                : (() => {
                    const correctPicks = roundResults.filter((r) => r.correct).length
                    const accuracy = correctPicks / roundResults.length
                    if (accuracy >= 0.7) return "hot"
                    if (accuracy <= 0.3) return "cold"
                    return "neutral"
                  })()
            }
            onSelect={() => {
              if (gameState === "playing") {
                setSelectedCompany(index)
              }
            }}
          />
        ))}
      </div>

      {/* Fixed investment + Submit */}
      {gameState === "playing" && (
        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <Button
            onClick={handleSubmit}
            disabled={selectedCompany === null || investmentAmount === 0}
            size="lg"
            className="w-full mt-6 font-mono tracking-wider text-primary-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Invest {formatMoney(investmentAmount)} in {selectedCompany !== null ? round.companies[selectedCompany].name : "..."}
          </Button>
        </div>
      )}
    </div>
  )
}
