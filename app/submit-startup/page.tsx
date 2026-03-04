import Script from "next/script"

export const metadata = {
  title: "Abrar's startup intake form",
}

export default function SubmitStartupPage() {
  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />
      <main className="fixed inset-0 h-full w-full overflow-hidden">
        <iframe
          data-tally-src="https://tally.so/r/RGze29"
          width="100%"
          height="100%"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Abrar's startup intake form"
          className="absolute inset-0 border-0"
        />
      </main>
    </>
  )
}
