import { useState } from "react";
import { AlertTriangle, X, Sparkles } from "lucide-react";
import { levelStyle, type Level } from "@/lib/disaster-data";

interface Props {
  level?: Level;
  title?: string;
  message?: string;
}

export function EmergencyBanner({
  level = "orange",
  title = "Orange Weather Alert",
  message = "Heavy rainfall expected across the Western Industrial Corridor within 4 hours. AI recommends activating flood preparedness, repositioning emergency crews, delaying non-critical maintenance and increasing water infrastructure monitoring.",
}: Props) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const s = levelStyle[level];
  return (
    <div
      className="relative flex items-start gap-3 border-b px-6 py-3"
      style={{ background: s.bg, borderColor: s.ring, color: s.text }}
      role="alert"
    >
      <div
        className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md"
        style={{ background: "rgba(255,255,255,0.55)" }}
      >
        <AlertTriangle className="h-4 w-4" style={{ color: s.text }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: s.text }}>
            {level} · {s.label}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
            style={{ background: "rgba(255,255,255,0.6)", color: s.text }}
          >
            <Sparkles className="h-3 w-3" /> Aziro AI
          </span>
          <span className="text-[11px] font-semibold" style={{ color: s.text }}>{title}</span>
        </div>
        <p className="mt-0.5 text-sm leading-snug" style={{ color: s.text }}>{message}</p>
      </div>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss"
        className="rounded-md p-1 hover:bg-white/40"
        style={{ color: s.text }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
