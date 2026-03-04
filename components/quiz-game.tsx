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

interface RoundResult {
  correct: boolean
  invested: number
  roundId: number
}

export function QuizGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "revealed" | "finished">("intro")
  const [currentRound, setCurrentRound] = useState(0)
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState(100_000)
  const [portfolio, setPortfolio] = useState(STARTING_AMOUNT)
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

    if (!isCorrect) {
      setPortfolio((prev) => prev - investmentAmount)
    }

    setGameState("revealed")
  }, [selectedCompany, round, investmentAmount])

  const handleNextRound = useCallback(() => {
    if (currentRound >= rounds.length - 1) {
      setGameState("finished")
      return
    }

    setCurrentRound((prev) => prev + 1)
    setSelectedCompany(null)
    setInvestmentAmount(Math.round(portfolio * 0.1))
    setGameState("playing")
  }, [currentRound, portfolio])

  const handleRestart = useCallback(() => {
    setGameState("intro")
    setCurrentRound(0)
    setSelectedCompany(null)
    setInvestmentAmount(100_000)
    setPortfolio(STARTING_AMOUNT)
    setRoundResults([])
  }, [])

  const handleStart = useCallback(() => {
    setGameState("playing")
    setInvestmentAmount(100_000)
  }, [])

  // Intro screen
  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 px-4">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">
            The Investor Game
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center text-balance leading-tight">
            Dead or Alive
          </h1>
          <p className="text-muted-foreground text-center max-w-lg leading-relaxed mt-2">
            {"You've been given "}
            <span className="text-foreground font-mono font-bold">{formatMoney(STARTING_AMOUNT)}</span>
            {" to invest. Over 10 rounds, you'll see three companies — two are fake, one is real. Pick the real company and invest wisely. Choose wrong, and you lose everything you put in."}
          </p>
        </div>

        {/* Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
            <span className="text-2xl font-bold font-mono text-primary">01</span>
            <span className="text-sm font-semibold text-foreground">Pick the real company</span>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Two are fiction, one made history. Read the pitches carefully.
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
            <span className="text-2xl font-bold font-mono text-primary">02</span>
            <span className="text-sm font-semibold text-foreground">Set your stake</span>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Choose how much to invest. Go big on confidence, play it safe when uncertain.
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
            <span className="text-2xl font-bold font-mono text-primary">03</span>
            <span className="text-sm font-semibold text-foreground">Grow your portfolio</span>
            <span className="text-xs text-muted-foreground leading-relaxed">
              Right picks keep your money. Wrong picks lose it all. What will you finish with?
            </span>
          </div>
        </div>

        <Button
          onClick={handleStart}
          size="lg"
          className="mt-4 font-mono tracking-wider text-lg px-10 py-6 text-primary-foreground"
        >
          Start Investing
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    )
  }

  // Results screen
  if (gameState === "finished") {
    return (
      <ResultsScreen
        portfolio={portfolio}
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
        portfolio={portfolio}
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
          Select the company you believe actually existed, then set your investment amount.
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {rounds.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < currentRound
                ? roundResults[i]?.correct
                  ? "bg-primary"
                  : "bg-destructive"
                : i === currentRound
                  ? "bg-foreground"
                  : "bg-border"
            )}
          />
        ))}
      </div>

      {/* Company cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {round.companies.map((company, index) => (
          <CompanyCard
            key={`${round.id}-${index}`}
            company={company}
            index={index}
            isSelected={selectedCompany === index}
            isRevealed={gameState === "revealed"}
            onSelect={() => {
              if (gameState !== "revealed") {
                setSelectedCompany(index)
              }
            }}
          />
        ))}
      </div>

      {/* Investment slider + Submit */}
      {gameState === "playing" && (
        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <InvestmentSlider
            value={investmentAmount}
            maxValue={portfolio}
            onChange={setInvestmentAmount}
            disabled={gameState !== "playing"}
          />

          {/* Warning if investing more than 50% */}
          {investmentAmount > portfolio * 0.5 && (
            <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <AlertTriangle className="w-4 h-4 text-accent shrink-0" />
              <span className="text-xs text-accent">
                {"High risk! You're investing over 50% of your portfolio."}
              </span>
            </div>
          )}

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

      {/* Revealed state - outcome + next */}
      {gameState === "revealed" && (
        <div className="flex flex-col gap-4">
          {/* Outcome banner */}
          <div
            className={cn(
              "rounded-xl border p-5 md:p-6",
              roundResults[roundResults.length - 1]?.correct
                ? "border-primary/30 bg-primary/5"
                : "border-destructive/30 bg-destructive/5"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    "text-lg font-bold font-mono",
                    roundResults[roundResults.length - 1]?.correct
                      ? "text-primary"
                      : "text-destructive"
                  )}
                >
                  {roundResults[roundResults.length - 1]?.correct ? "Correct!" : "Wrong Pick"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {roundResults[roundResults.length - 1]?.correct
                    ? `Your ${formatMoney(investmentAmount)} investment is safe.`
                    : `You lost ${formatMoney(investmentAmount)} on a fake company.`}
                </span>
              </div>
              <span
                className={cn(
                  "text-2xl font-bold font-mono tabular-nums",
                  roundResults[roundResults.length - 1]?.correct
                    ? "text-primary"
                    : "text-destructive"
                )}
              >
                {roundResults[roundResults.length - 1]?.correct ? "+" : "-"}
                {formatMoney(investmentAmount)}
              </span>
            </div>
          </div>

          <Button
            onClick={handleNextRound}
            size="lg"
            className="w-full font-mono tracking-wider text-primary-foreground"
          >
            {currentRound >= rounds.length - 1 ? "See Final Results" : "Next Round"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
