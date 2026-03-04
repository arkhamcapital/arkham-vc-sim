"use client"

import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface InvestmentSliderProps {
  value: number
  maxValue: number
  onChange: (value: number) => void
  disabled?: boolean
}

function formatMoney(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2)}M`
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`
  }
  return `$${amount.toLocaleString()}`
}

const PRESETS = [0.1, 0.25, 0.5, 0.75, 1.0]

export function InvestmentSlider({ value, maxValue, onChange, disabled }: InvestmentSliderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-mono">Investment Amount</span>
        <span className="text-2xl font-bold font-mono text-foreground tabular-nums">
          {formatMoney(value)}
        </span>
      </div>

      <Slider
        value={[value]}
        min={0}
        max={maxValue}
        step={Math.max(1000, Math.round(maxValue / 100))}
        onValueChange={(v) => onChange(v[0])}
        disabled={disabled}
        className="py-2"
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>$0</span>
        <span>{formatMoney(maxValue)}</span>
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((pct) => {
          const presetValue = Math.round(maxValue * pct)
          return (
            <button
              key={pct}
              type="button"
              onClick={() => onChange(presetValue)}
              disabled={disabled}
              className={cn(
                "px-3 py-1.5 text-xs font-mono rounded-md border transition-colors",
                "hover:bg-primary/10 hover:border-primary/50 hover:text-primary",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                value === presetValue
                  ? "bg-primary/10 border-primary/50 text-primary"
                  : "bg-secondary border-border text-muted-foreground"
              )}
            >
              {pct * 100}%
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { formatMoney }
