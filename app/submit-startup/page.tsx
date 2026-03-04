export default function SubmitStartupPage() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-xl space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        Pitch your company to me
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        I'm currently scouting for startups to invest in for Althra, a venture capital firm. Please tell me about what you're building and I'll get back to you.
                    </p>
                </div>

                <form className="space-y-4 rounded-xl border border-border bg-card/80 p-5 md:p-6">
                    <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Company name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                            placeholder="Acme AI"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            Website
                        </label>
                        <input
                            type="url"
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                            placeholder="https://yourstartup.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                            What are you building?
                        </label>
                        <textarea
                            rows={4}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                            placeholder="1–3 sentences on your product, market, and traction."
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-mono font-semibold tracking-widest text-white uppercase hover:bg-emerald-500 transition-colors"
                    >
                        Submit to VC
                    </button>
                </form>
            </div>
        </main>
    )
}