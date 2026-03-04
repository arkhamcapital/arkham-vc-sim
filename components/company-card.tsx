"use client"

import { cn } from "@/lib/utils"
import type { Company } from "@/lib/quiz-data"
import { Check, X, Building2 } from "lucide-react"

interface CompanyCardProps {
  company: Company
  index: number
  isSelected: boolean
  isRevealed: boolean
  onSelect: () => void
}

export function CompanyCard({
  company,
  index,
  isSelected,
  isRevealed,
  onSelect,
}: CompanyCardProps) {
  const labels = ["A", "B", "C"]

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isRevealed}
      className={cn(
        "group relative flex flex-col text-left rounded-xl border p-5 md:p-6 transition-all duration-300 cursor-pointer",
        "hover:border-primary/50 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/20",
        isSelected && !isRevealed && "border-primary bg-primary/5 shadow-[0_0_30px_-5px] shadow-primary/30",
        !isSelected && !isRevealed && "border-border bg-card",
        isRevealed && isSelected && company.isReal && "border-primary bg-primary/10",
        isRevealed && isSelected && !company.isReal && "border-destructive bg-destructive/10",
        isRevealed && !isSelected && company.isReal && "border-primary/50 bg-primary/5",
        isRevealed && !isSelected && !company.isReal && "border-border/50 bg-card opacity-50",
        isRevealed && "cursor-default hover:shadow-none hover:border-current"
      )}
    >
      {/* Selection indicator */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-lg font-mono text-sm font-bold transition-colors",
            isSelected && !isRevealed && "bg-primary text-primary-foreground",
            !isSelected && !isRevealed && "bg-secondary text-muted-foreground",
            isRevealed && company.isReal && "bg-primary text-primary-foreground",
            isRevealed && !company.isReal && "bg-destructive/20 text-destructive"
          )}
        >
          {isRevealed ? (
            company.isReal ? (
              <Check className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )
          ) : (
            labels[index]
          )}
        </div>
        {isSelected && !isRevealed && (
          <span className="text-xs font-mono text-primary tracking-widest uppercase">
            Selected
          </span>
        )}
        {isRevealed && company.isReal && (
          <span className="text-xs font-mono text-primary tracking-widest uppercase">
            Real Company
          </span>
        )}
        {isRevealed && !company.isReal && (
          <span className="text-xs font-mono text-destructive tracking-widest uppercase">
            Fake
          </span>
        )}
      </div>

      {/* Company Name */}
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
        <h3 className="text-lg font-semibold text-card-foreground">{company.name}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {company.description}
      </p>

      {/* Reveal text */}
      {isRevealed && (
        <div
          className={cn(
            "mt-4 pt-4 border-t text-sm leading-relaxed",
            company.isReal ? "border-primary/20 text-primary" : "border-destructive/20 text-muted-foreground"
          )}
        >
          {company.revealText}
        </div>
      )}
    </button>
  )
}