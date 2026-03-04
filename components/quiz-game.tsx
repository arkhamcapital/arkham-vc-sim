"use client"

import { useState, useCallback } from "react"
import { rounds } from "@/lib/quiz-data"
import { CompanyCard } from "./company-card"
import { formatMoney } from "./investment-slider"
import { Scoreboard } from "./scoreboard"
import { ResultsScreen } from "./results-screen"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Send } from "lucide-react"

const STARTING_AMOUNT = 1_000_000
const ROUND_INVESTMENT = 100_000

/** Anonymous label per round: R1 = Company A/B/C, R2 = D/E/F, … R10 = AA/AB/AC. Names only revealed after submit. */
function getCompanyDisplayLabel(roundIndex: number, companyIndex: number): string {
  const n = roundIndex * 3 + companyIndex
  if (n < 26) return `Company ${String.fromCharCode(65 + n)}`
  const first = String.fromCharCode(65 + Math.floor(n / 26) - 1)
  const second = String.fromCharCode(65 + (n % 26))
  return `Company ${first}${second}`
}

interface RoundResult {
  correct: boolean
  invested: number
  roundId: number
}

export function QuizGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "finished">("intro")
  const [currentRound, setCurrentRound] = useState(0)
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)
  const [roundResults, setRoundResults] = useState<RoundResult[]>([])
  const [isTransitioningRound, setIsTransitioningRound] = useState(false)

  const round = rounds[currentRound]

  const handleSubmit = useCallback(() => {
    if (selectedCompany === null) return

    const company = round.companies[selectedCompany]
    const isCorrect = company.isReal

    const newResult: RoundResult = {
      correct: isCorrect,
      invested: ROUND_INVESTMENT,
      roundId: round.id,
    }

    setRoundResults((prev) => [...prev, newResult])

    if (currentRound >= rounds.length - 1) {
      setGameState("finished")
    } else {
      setIsTransitioningRound(true)
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1)
        setSelectedCompany(null)
        setIsTransitioningRound(false)
      }, 200)
    }
  }, [selectedCompany, round, currentRound])

  const handleRestart = useCallback(() => {
    setGameState("intro")
    setCurrentRound(0)
    setSelectedCompany(null)
    setRoundResults([])
  }, [])

  const handleStart = useCallback(() => {
    setGameState("playing")
  }, [])

  // Intro screen
  if (gameState === "intro") {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] gap-8 px-4 overflow-hidden">
        {/* Stock-market style background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.4),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] bg-size-[56px_56px]" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">
            Test your investor instincts
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground text-center text-balance leading-tight">
            Simulatorvest
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

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={handleStart}
            size="lg"
            className="group inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-600 px-8 text-lg font-mono font-semibold tracking-wider text-white shadow-[0_0_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.9)]"
          >
            Start Investing
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1 rounded-xl h-12 border border-emerald-500/40 bg-card/60 font-mono tracking-widest text-xs uppercase text-emerald-300 hover:bg-card/60 hover:border-emerald-400 hover:text-emerald-400"
          >
            <Link href="/submit-startup">
              Founder - Let’s Connect            </Link>
          </Button>
        </div>
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

  // Game screen
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
          <span className="text-xs font-mono text-muted-foreground">
            {round.era}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Round {currentRound + 1}
        </h2>
        <p className="text-sm text-muted-foreground">
          Select the company you believe actually exists. Each round you put{" "}
          <span className="font-mono font-bold text-foreground">
            {formatMoney(ROUND_INVESTMENT)}
          </span>{" "}
          into a single company. Get it right and your stake survives, get it wrong and that round&apos;s{" "}
          <span className="font-mono font-bold text-foreground">
            {formatMoney(ROUND_INVESTMENT)}
          </span>{" "}
          goes to 0.
        </p>
      </div>

      {/* Company cards */}
      <div
        className={[
          "grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300",
          isTransitioningRound ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        {round.companies.map((company, index) => (
          <CompanyCard
            key={`${round.id}-${index}`}
            company={company}
            index={index}
            displayName={getCompanyDisplayLabel(currentRound, index)}
            isSelected={selectedCompany === index}
            isRevealed={false}
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
            disabled={selectedCompany === null}
            size="lg"
            className="w-full mt-2 font-mono tracking-wider text-primary-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Invest {formatMoney(ROUND_INVESTMENT)} in{" "}
            {selectedCompany !== null ? getCompanyDisplayLabel(currentRound, selectedCompany) : "..."}
          </Button>
        </div>
      )}
    </div>
  )
}
