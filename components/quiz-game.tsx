"use client"

import { useState, useCallback } from "react"
import { rounds } from "@/lib/quiz-data"
import { CompanyCard } from "./company-card"
import { formatMoney } from "./investment-slider"
import { Scoreboard } from "./scoreboard"
import { ResultsScreen } from "./results-screen"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wallet2 } from "lucide-react"

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
  const [isTransitioningRound, setIsTransitioningRound] = useState(false)
  const [isDraggingWallet, setIsDraggingWallet] = useState(false)
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null)
  const [dragTargetIndex, setDragTargetIndex] = useState<number | null>(null)

  const round = rounds[currentRound]

  const handleSubmit = useCallback(
    (companyIndex: number) => {
      const company = round.companies[companyIndex]
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
        setIsTransitioningRound(true)
        setTimeout(() => {
          setCurrentRound((prev) => prev + 1)
          setSelectedCompany(null)
          setInvestmentAmount(ROUND_INVESTMENT)
          setIsTransitioningRound(false)
        }, 200)
      }
    },
    [round, investmentAmount, currentRound])

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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingWallet) return
    setDragPosition({ x: event.clientX, y: event.clientY })
  }

  const handleMouseUp = () => {
    if (!isDraggingWallet) return

    if (dragTargetIndex !== null) {
      handleSubmit(dragTargetIndex)
    }

    setIsDraggingWallet(false)
    setDragPosition(null)
    setDragTargetIndex(null)
  }

  // Intro screen
  if (gameState === "intro") {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] gap-8 px-4 overflow-hidden">
        {/* Stock-market style background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Gradient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.4),transparent_55%)]" />
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] bg-size-[56px_56px]" />
        </div>

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

  // Game screen
  return (
    <div
      className="flex flex-col gap-6"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
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
          To get started, drop the cash into the company you believe actually exists.. Each round you put{" "}
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
          <div
            key={`${round.id}-${index}`}
            onMouseEnter={() => {
              if (isDraggingWallet) {
                setDragTargetIndex(index)
              }
            }}
            onMouseLeave={() => {
              if (isDraggingWallet && dragTargetIndex === index) {
                setDragTargetIndex(null)
              }
            }}
          >
            <CompanyCard
              company={company}
              index={index}
              isSelected={
                selectedCompany === index || (isDraggingWallet && dragTargetIndex === index)
              }
              isRevealed={false}
              onSelect={() => {
                if (gameState === "playing" && !isDraggingWallet) {
                  setSelectedCompany(index)
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Wallet drag-to-invest */}
      {gameState === "playing" && (
        <div className="relative mt-4 flex items-center justify-center">
          <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault()
              if (isTransitioningRound) return
              setIsDraggingWallet(true)
              setDragPosition({ x: event.clientX, y: event.clientY })
              setDragTargetIndex(null)
            }}
            className="group flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 shadow-sm backdrop-blur-sm hover:bg-card transition-colors"
          >
            <span className="relative flex h-8 w-10 items-center justify-center rounded-lg bg-emerald-600 text-emerald-950 overflow-hidden">
              <Wallet2 className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span className="absolute bottom-0 text-lg leading-none opacity-0 translate-y-3 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-0.5">
                💵
              </span>
            </span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Cash in
            </span>
          </button>

          {isDraggingWallet && dragPosition && (
            <div
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 text-3xl shadow-lg"
              style={{ left: dragPosition.x, top: dragPosition.y }}
            >
              💵
            </div>
          )}
        </div>
      )}
    </div>
  )
}