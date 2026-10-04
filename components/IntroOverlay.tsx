"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
// Αποθήκευση επιλογής επισκέπτη:
//  - SKIP_KEY (localStorage): «να μην εμφανιστεί ξανά» -> μόνιμα
//  - SEEN_KEY (sessionStorage): δεν ξαναεμφανίζεται στην ίδια επίσκεψη
// Το ίδιο κλειδί διαβάζεται από το inline script του layout.tsx ώστε να μην
// «αναβοσβήνει» το intro σε όσους το έχουν ήδη παραλείψει.
export const INTRO_SKIP_KEY = "intro-skip";
export const INTRO_SEEN_KEY = "intro-seen";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  max: number;
}

interface Ring {
  r: number;
  life: number;
  max: number;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function IntroOverlay({ title }: { title: string }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const enterRef = useRef<() => void>(() => {});

  const enter = useCallback(() => {
    if (leaving) return;
    try {
      if (dontShow) localStorage.setItem(INTRO_SKIP_KEY, "1");
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* private mode: αγνοούμε */
    }
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 750);
  }, [dontShow, leaving]);

  useEffect(() => {
    enterRef.current = enter;
  }, [enter]);

  // Έλεγχος αποθηκευμένης επιλογής.
  useEffect(() => {
    try {
      if (
        localStorage.getItem(INTRO_SKIP_KEY) === "1" ||
        sessionStorage.getItem(INTRO_SEEN_KEY) === "1"
      ) {
        setVisible(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const active = visible && pathname === "/";

  // Κλείδωμα scroll + πληκτρολόγιο.
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") enterRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  // Animation σταγόνας.
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const narrow = () => w < 640;
    const home = () => ({ x: w / 2, y: h * (narrow() ? 0.28 : 0.36) });
    const radius = () =>
      Math.min(w * (narrow() ? 0.24 : 0.17), h * (narrow() ? 0.15 : 0.17), 120);

    const drop = { x: 0, y: 0, vx: 0, vy: 0, ready: false };
    const pointer = { x: 0, y: 0, active: false };
    const particles: Particle[] = [];
    const rings: Ring[] = [];
    let t = 0;
    let nextRing = 0.6;
    let lastEmit = { x: 0, y: 0 };

    const dropPath = new Path2D();
    dropPath.moveTo(0, -1);
    dropPath.bezierCurveTo(0.12, -0.6, 0.62, -0.2, 0.62, 0.3);
    dropPath.bezierCurveTo(0.62, 0.72, 0.33, 1, 0, 1);
    dropPath.bezierCurveTo(-0.33, 1, -0.62, 0.72, -0.62, 0.3);
    dropPath.bezierCurveTo(-0.62, -0.2, -0.12, -0.6, 0, -1);
    dropPath.closePath();

    const burst = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 2 + Math.random() * 5;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 2,
          r: 2 + Math.random() * 4,
          life: 0,
          max: 50 + Math.random() * 40,
        });
      }
    };

    function draw(dt: number) {
      ctx!.clearRect(0, 0, w, h);
      const R = radius();
      const hm = home();
      if (!drop.ready) {
        drop.x = hm.x;
        drop.y = hm.y;
        drop.ready = true;
      }

      // Στόχος: ήρεμη αιώρηση ή ελαφριά κλίση προς το ποντίκι.
      let tx = hm.x + Math.sin(t * 0.9) * 6;
      let ty = hm.y + Math.sin(t * 1.3) * 10;
      if (pointer.active) {
        tx = hm.x + (pointer.x - hm.x) * 0.22;
        ty = hm.y + (pointer.y - hm.y) * 0.22;
      }
      if (!reduce) {
        drop.vx += (tx - drop.x) * 0.035;
        drop.vy += (ty - drop.y) * 0.035;
        drop.vx *= 0.86;
        drop.vy *= 0.86;
        drop.x += drop.vx;
        drop.y += drop.vy;
      }

      // Παλμοί (δακτύλιοι) γύρω από τη σταγόνα.
      if (!reduce) {
        nextRing -= dt;
        if (nextRing <= 0) {
          rings.push({ r: R * 0.9, life: 0, max: 110 });
          nextRing = 2.4;
        }
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        const g = rings[i];
        g.life++;
        g.r += 1.7;
        const a = 0.28 * (1 - g.life / g.max);
        if (a <= 0) {
          rings.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(drop.x, drop.y + R * 0.15, g.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(230,70,95,${a})`;
        ctx!.lineWidth = 2;
        ctx!.stroke();
      }

      // Σταγονίδια.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.vy += 0.16;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        const k = 1 - p.life / p.max;
        if (k <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * k, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(210,45,70,${0.85 * k})`;
        ctx!.fill();
      }

      // Η σταγόνα.
      const speed = Math.hypot(drop.vx, drop.vy);
      const stretch = 1 + Math.min(speed * 0.012, 0.18);
      const breathe = reduce ? 0 : Math.sin(t * 2.2) * 0.018;
      const tilt =
        clamp(drop.vx * 0.025, -0.35, 0.35) +
        (pointer.active ? clamp((pointer.x - hm.x) / w, -0.5, 0.5) * 0.25 : 0);

      ctx!.save();
      ctx!.translate(drop.x, drop.y);
      ctx!.rotate(tilt);
      ctx!.scale((1 / stretch) * (1 - breathe), stretch * (1 + breathe));
      ctx!.scale(R, R);

      const g = ctx!.createRadialGradient(-0.25, 0.2, 0.05, 0, 0.2, 1.1);
      g.addColorStop(0, "#e8465f");
      g.addColorStop(0.5, "#b81f38");
      g.addColorStop(1, "#6a0f20");
      ctx!.shadowColor = "rgba(230,50,80,0.55)";
      ctx!.shadowBlur = 70;
      ctx!.fillStyle = g;
      ctx!.fill(dropPath);
      ctx!.shadowBlur = 0;

      ctx!.beginPath();
      ctx!.ellipse(-0.3, 0.35, 0.11, 0.26, 0.35, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(255,255,255,0.38)";
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(-0.17, 0.66, 0.045, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(255,255,255,0.45)";
      ctx!.fill();
      ctx!.restore();
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      if (reduce) return;
      const d = Math.hypot(e.clientX - lastEmit.x, e.clientY - lastEmit.y);
      if (e.pointerType !== "touch" && d > 28) {
        lastEmit = { x: e.clientX, y: e.clientY };
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * -1.5,
          r: 2 + Math.random() * 3,
          life: 0,
          max: 45 + Math.random() * 25,
        });
      }
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      burst(e.clientX, e.clientY, 14);
      rings.push({ r: radius() * 0.9, life: 0, max: 110 });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`intro-overlay fixed inset-x-0 top-0 z-[100] overflow-x-hidden overflow-y-auto transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        height: "100dvh",
        background:
          "radial-gradient(ellipse at 50% 35%, #4a1020 0%, #2a0811 55%, #160408 100%)",
      }}
      role="dialog"
      aria-label={`Καλώς ήρθατε — ${title}`}
    >
      <style>{`
        html[data-intro="skip"] .intro-overlay { display: none; }
        @keyframes intro-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .intro-rise { opacity: 0; animation: intro-rise 0.9s ease forwards; }
        @media (prefers-reduced-motion: reduce) { .intro-rise { animation: none; opacity: 1; } }
      `}</style>

      <canvas ref={canvasRef} aria-hidden className="fixed inset-0" />

      <div
        className="pointer-events-none relative z-10 flex min-h-full flex-col items-center justify-end px-5 pt-[45dvh] text-center sm:px-6 sm:pt-[48dvh]"
        style={{ paddingBottom: "max(5dvh, calc(env(safe-area-inset-bottom) + 1.5rem))" }}
      >
        <p
          className="intro-rise text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80"
          style={{ animationDelay: "0.4s" }}
        >
          Καλώς ήρθατε
        </p>
        <h1
          className="intro-rise mt-3 max-w-3xl font-serif text-2xl leading-tight min-[400px]:text-3xl font-semibold text-white sm:text-5xl"
          style={{ animationDelay: "0.7s" }}
        >
          {title}
        </h1>
        <p
          className="intro-rise mt-3 text-base text-rose-100/80 sm:text-lg"
          style={{ animationDelay: "1s" }}
        >
          Κάθε σταγόνα δίνει ζωή
        </p>

        <div
          className="intro-rise pointer-events-auto mt-6 flex w-full max-w-sm flex-col items-center gap-4 sm:mt-8 sm:w-auto"
          style={{ animationDelay: "1.3s" }}
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={enter}
            className="min-h-12 w-full rounded-full bg-white px-9 py-3.5 text-sm sm:w-auto font-semibold tracking-wide text-[color:var(--color-accent-dark)] shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Είσοδος στην ιστοσελίδα →
          </button>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-rose-100/80 select-none">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) => setDontShow(e.target.checked)}
              className="h-4 w-4 accent-[color:var(--color-accent)]"
            />
            Να μην εμφανιστεί ξανά
          </label>
        </div>
      </div>
    </div>
  );
}
