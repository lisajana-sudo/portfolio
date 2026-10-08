import Lenis from "lenis";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export const INTRO = 2.2; // seconds the preloader stays before the page reveals

/** Smooth inertial scrolling for the whole page. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}

const BASES = "ATGC";

/** Opening screen: a "sequencing" counter that lifts away like a curtain. */
export function Preloader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [seq, setSeq] = useState("ATGCGTACCTGA");

  useEffect(() => {
    const start = performance.now();
    const dur = (INTRO - 0.5) * 1000;
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      setSeq(Array.from({ length: 12 }, () => BASES[Math.floor(Math.random() * 4)]).join(""));
      if (p < 1) id = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="pre"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-background p-6 text-foreground sm:p-10"
        >
          <div className="flex justify-between text-xs uppercase tracking-[0.3em] opacity-70">
            <span>Lisa Jana</span>
            <span>Sequencing…</span>
          </div>
          <div className="text-center">
            <p className="font-display text-sm italic opacity-60">reading the code of life</p>
            <p className="mt-3 font-display text-2xl tracking-[0.4em] text-gold sm:text-4xl">{seq}</p>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-xs uppercase tracking-[0.3em] opacity-70">Biotech × AI</span>
            <span className="font-display text-6xl font-light leading-none tabular-nums sm:text-8xl">{n}<span className="text-accent">%</span></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Custom dot + ring cursor that grows over links (desktop only). */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 250, damping: 25, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor]") as HTMLElement | null;
      setHover(!!el);
      setLabel(el?.dataset["cursor"] ?? "");
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div style={{ x, y }} className="pointer-events-none fixed top-0 left-0 z-[90] -ml-1 -mt-1 size-2 rounded-full bg-accent" />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ width: label ? 88 : hover ? 56 : 32, height: label ? 88 : hover ? 56 : 32 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed top-0 left-0 z-[90] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/40 bg-background/10 backdrop-blur-[1px]"
      >
        {label && <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>}
      </motion.div>
    </>
  );
}
