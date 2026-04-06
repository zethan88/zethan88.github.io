import { useRef } from "react"
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx"
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow"
import profilePic from "@/assets/profile.png"

/** Blank bar placeholder — user fills in content later */
function Bars() {
  return (
    <div>
      <div className="h-6 w-36 rounded-full bg-white/50" />
    </div>
  )
}

// 8 sections — longer scroll feels more infinite
const portfolioSections = Array.from({ length: 8 }, (_, i) => ({
  id: `section-${i + 1}`,
  // Left column: empty — floating about card lives in that visual space
  leftLabel: undefined as React.ReactNode,
  // Center: thin placeholder bar
  title: <div className="h-2 w-40 rounded-full bg-white/25" /> as React.ReactNode,
  // Right column: stacked bars the user will fill
  rightLabel: <Bars /> as React.ReactNode,
  // Background handled globally — not used per-section
  background: "",
  renderBackground: () => null as React.ReactNode,
}))

export default function App() {
  const apiRef = useRef<FullScreenFXAPI>(null)

  return (
    <div className="relative">
      {/* ── Global background: ethereal shadow ── */}
      <div className="fixed inset-0 z-0">
        <EtherealShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* ── Full-screen scroll FX (transparent, sits over bg) ── */}
      <div className="relative z-10">
        <FullScreenScrollFX
          sections={portfolioSections}
          apiRef={apiRef}
          showProgress
          durations={{ change: 0.7, snap: 800 }}
          colors={{
            text: "rgba(255,255,255,0.9)",
            overlay: "transparent",
            pageBg: "transparent",
            stageBg: "transparent",
          }}
        />
      </div>

      {/* ── Top fade — infinite scroll illusion ── */}
      <div
        className="fixed top-0 inset-x-0 h-40 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
      />

      {/* ── Bottom fade — infinite scroll illusion ── */}
      <div
        className="fixed bottom-0 inset-x-0 h-40 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
      />

      {/* ── Floating about card ── */}
      <div className="fixed left-10 top-1/2 -translate-y-1/2 z-30 w-72">
        <div className="rounded-2xl border border-white/10 backdrop-blur-md p-8 space-y-6">
          {/* Profile photo */}
          <div className="flex justify-center">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full aspect-square rounded-full object-cover border-2 border-white/30"
            />
          </div>

          {/* Name */}
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white leading-none mb-1">
              Ethan Zhou
            </h1>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.22em]">
              Developer &amp; Designer
            </p>
          </div>

          {/* About copy */}
          <div className="space-y-3 text-xs text-white/60 leading-relaxed">
            <p>
              I'm a software developer and designer with a passion for building web applications and apps.
            </p>
            <p>
              Currently open to new opportunities and interesting projects.
            </p>
          </div>

          {/* Section nav */}
          <nav className="space-y-2" aria-label="Jump to section">
            {portfolioSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => apiRef.current?.goTo(i)}
                className="flex items-center gap-3 w-full group"
              >
                <span className="block h-px w-4 bg-white/30 group-hover:w-6 group-hover:bg-white transition-all duration-200" />
                <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors duration-200">
                  {s.id}
                </span>
              </button>
            ))}
          </nav>

          {/* Link */}
          <a
            href="https://github.com/zethan88"
            target="_blank"
            rel="noreferrer"
            className="block text-[10px] text-white/30 hover:text-white/70 transition-colors duration-200"
          >
            github.com/zethan88
          </a>
        </div>
      </div>
    </div>
  )
}
