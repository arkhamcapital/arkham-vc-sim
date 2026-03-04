import { QuizGame } from "@/components/quiz-game"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <QuizGame />
      </div>
    </main>
  )
}
