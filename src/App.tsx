import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const navItems = [];

const stats = [
  ["100+", "AI Use Cases"],
  ["50+", "Automation Workflows"],
  ["10+", "Industries"],
  ["24/7", "Intelligence"],
];

const process = ["Discover", "Analyze", "Design", "Develop", "Deploy", "Scale"];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const particles = Array.from({ length: 86 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00055,
      vy: (Math.random() - 0.5) * 0.00055,
      size: Math.random() * 1.8 + 0.4,
      glow: Math.random() * 0.75 + 0.25,
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      frame += 0.006;
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width * 0.72, height * 0.24, 0, width * 0.72, height * 0.24, width * 0.58);
      gradient.addColorStop(0, "rgba(79, 70, 229, 0.18)");
      gradient.addColorStop(0.45, "rgba(6, 182, 212, 0.08)");
      gradient.addColorStop(1, "rgba(5, 8, 22, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;

        const x = p.x * width;
        const y = p.y * height;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.18 + p.glow * 0.4})`;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const ox = other.x * width;
          const oy = other.y * height;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 118) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / 118)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(ox, oy);
            ctx.stroke();
          }
        }
      });

      ctx.save();
      ctx.translate(width * 0.74, height * 0.48);
      ctx.rotate(frame);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        const radius = 160 + i * 52;
        for (let a = 0; a <= 6; a += 1) {
          const angle = (Math.PI * 2 * a) / 6;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20 h-full w-full bg-[#050816]" aria-hidden="true" />;
}

function SacredGeometry({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 420 420" className="h-full w-full text-cyan-300/20">
        <circle cx="210" cy="210" r="132" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="210" cy="96" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="210" cy="324" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="96" cy="210" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="324" cy="210" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M210 40 357 295H63L210 40Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M210 380 63 125h294L210 380Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.75 }}
    >
      {eyebrow ? <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{text}</p> : null}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-500 md:px-8 lg:px-12 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <nav
        className={`mx-auto flex min-h-[76px] max-w-[1820px] items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-[#07111f]/[0.82] px-5 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 md:px-7 ${
          scrolled ? "bg-[#07111f]/[0.9]" : ""
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-1"
          aria-label="DYAU.AI home"
          onClick={() => setMobileOpen(false)}
        >
          <span className="leading-none">
            <span className="flex items-end gap-0 text-[24px] font-black tracking-[0.02em] text-white">
              <span>DYAU</span>
              <span className="text-cyan-300">.AI</span>
            </span>
          </span>
        </a>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <a
            href="mailto:contact@dyau.ai"
            className="rounded-full border border-cyan-300/25 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/10 hover:text-white"
          >
            contact@dyau.ai
          </a>
        </div>

        <button
          className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white xl:hidden"
          onClick={() => setMobileOpen((v: boolean) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        className="mx-auto mt-3 max-w-[1820px] overflow-hidden xl:hidden"
      >
        <div className="rounded-[28px] border border-white/10 bg-[#08111f]/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl">
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:hidden">
            <a
              href="mailto:contact@dyau.ai"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-cyan-300/25 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/10 hover:text-white"
            >
              contact@dyau.ai
            </a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white selection:bg-cyan-300 selection:text-[#050816]">
      <ParticleField />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,8,22,0)_0%,rgba(5,8,22,0.68)_55%,#050816_100%)]" />

      <Navbar />

      <main id="home">
        {false && (
        <section className="relative flex min-h-screen items-center pt-28">
          <SacredGeometry className="-left-44 top-28 h-[520px] w-[520px] opacity-50" />
          <div className="mx-auto flex w-full max-w-7xl justify-center px-5 py-16 md:px-8">
            <motion.div className="mx-auto flex max-w-5xl flex-col items-center text-center" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
              <p className="mb-5 text-3xl font-semibold tracking-tight text-white drop-shadow-[0_0_32px_rgba(139,92,246,0.45)] md:text-5xl lg:text-6xl">ॐ द्यौः शान्तिः</p>
              <p className="mb-8 text-sm font-medium uppercase tracking-[0.45em] text-cyan-200/90">Wisdom Beyond Intelligence</p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">
                Where Ancient Wisdom Meets Artificial Intelligence
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                DYAU.AI helps organizations harness AI, automation, and intelligent systems to transform business operations and accelerate growth.
              </p>
            </motion.div>
          </div>
        </section>
        )}

        {false && (
        <section id="about" className="relative px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75 }}
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">ABOUT DYAU.AI</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">AI & QUANTUM COMPUTING</h2>
            </motion.div>
            <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-indigo-950/20 backdrop-blur-2xl md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08),transparent_30%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.06),transparent_22%)]" />
              <div className="relative grid gap-10 lg:grid-cols-2">
                <div className="relative border-b border-white/10 pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                  <div className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300/80">AI</div>
                  <div className="mt-6 space-y-4">
                    {[
                      "AI Governance Consultancy",
                      "Responsible AI Strategy & Advisory",
                      "AI Risk Management & Compliance",
                      "Intelligent Process Automation",
                      "Custom AI Solution Development",
                      "AI Ethics & Trust Frameworks",
                      "Enterprise AI Integration Services",
                      "AI Performance Monitoring & Optimization",
                      "Predictive Analytics & Decision Intelligence",
                      "Human-in-the-Loop AI Systems",
                      "Generative AI Consulting",
                      "AI Security & Model Governance"
                    ].map((item) => (
                      <motion.div
                        key={item}
                        className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45 }}
                      >
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                        <p className="text-sm leading-7 text-slate-300">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative lg:pl-10">
                  <div className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300/80">Quantum Computing</div>
                  <div className="mt-6 space-y-4">
                    {[
                      "Quantum Computing Research & Advisory",
                      "Quantum Algorithm Development",
                      "Quantum-Inspired Optimization Solutions",
                      "Quantum Simulation & Modeling",
                      "Quantum Cryptography Consulting",
                      "Quantum Readiness Assessment",
                      "Advanced Computational Research",
                      "Hybrid AI–Quantum Solutions",
                      "Complex Systems Optimization",
                      "Future Computing Strategy & Innovation",
                      "Quantum Data Analytics",
                      "Next-Generation Computing Frameworks"
                    ].map((item) => (
                      <motion.div
                        key={item}
                        className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: 0.06 }}
                      >
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                        <p className="text-sm leading-7 text-slate-300">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mt-10 flex flex-col items-center justify-center border-t border-white/10 pt-8 text-center">
                <div className="relative">
                  <span className="absolute inset-x-[-18px] top-1/2 h-8 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-2xl" />
                  <span className="absolute inset-0 rounded-full bg-cyan-400/25 blur-xl animate-pulse" />
                  
                  <div className="relative inline-flex items-center justify-center rounded-full border border-cyan-300/60 bg-[#050816] px-6 py-2.5 shadow-[0_0_28px_rgba(34,211,238,0.3)] overflow-hidden">
                    {/* Floating lights inside the capsule */}
                    <motion.div
                      className="absolute h-6 w-6 rounded-full bg-cyan-400/40 blur-[6px]"
                      animate={{
                        x: [-45, 45, -45],
                        y: [-3, 3, -3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute h-5 w-5 rounded-full bg-purple-400/40 blur-[5px]"
                      animate={{
                        x: [45, -45, 45],
                        y: [3, -3, 3],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <p className="relative z-10 text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">
                      COMING SOON
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-base text-slate-300/80">Building the bridge between wisdom and intelligence.</p>
              </div>
            </div>
          </div>
        </section>

        )}

        <section id="mantra" className="relative flex min-h-[78vh] items-center overflow-hidden px-5 pb-24 pt-44 md:px-8 md:pt-52">
          <SacredGeometry className="left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-80" />
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
          <motion.div
            className="relative mx-auto max-w-5xl text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-4xl font-semibold tracking-tight text-white drop-shadow-[0_0_46px_rgba(6,182,212,0.35)] md:text-6xl">ॐ द्यौः शान्तिः</p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.36em] text-cyan-200/90 md:text-base">
              AI & Quantum Computing
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-2xl leading-relaxed text-slate-200 md:text-4xl">
              "True intelligence emerges when technology serves wisdom."
            </p>
            <div className="relative mt-10 inline-block">
              {/* Outer pulsing glow */}
              <span className="absolute inset-0 rounded-full bg-cyan-400/25 blur-xl animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-cyan-400/15 blur-md animate-pulse" />
              
              <div className="relative inline-flex items-center justify-center rounded-full border border-cyan-300/60 bg-[#050816] px-8 py-3 shadow-[0_0_30px_rgba(34,211,238,0.3)] overflow-hidden">
                {/* Floating lights inside the capsule */}
                <motion.div
                  className="absolute h-8 w-8 rounded-full bg-cyan-400/40 blur-[8px]"
                  animate={{
                    x: [-60, 60, -60],
                    y: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute h-6 w-6 rounded-full bg-purple-400/40 blur-[6px]"
                  animate={{
                    x: [60, -60, 60],
                    y: [5, -5, 5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <p className="relative z-10 text-sm font-bold uppercase tracking-[0.4em] text-cyan-300">
                  COMING SOON
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {false && (
        <section id="contact" className="relative scroll-mt-28 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.75 }}>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">Contact</p>
              <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Let's Build the Future Together</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Bring your AI opportunity, automation challenge, or transformation roadmap. DYAU.AI will help shape it into a secure, scalable system.
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:contact@dyau.ai"
                  className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-5 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.12]"
                >
                  <span className="font-semibold">Email:</span>
                  <span>contact@dyau.ai</span>
                </a>
                <p className="text-sm text-slate-400">We typically reply within 1–2 business days.</p>
              </div>
            </motion.div>
            <motion.form
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl md:p-8"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {["Name", "Email", "Phone", "Company"].map((field) => (
                  <label key={field} className="block">
                    <span className="sr-only">{field}</span>
                    <input
                      type={field === "Email" ? "email" : field === "Phone" ? "tel" : "text"}
                      placeholder={field}
                      className="w-full rounded-2xl border border-white/10 bg-[#050816]/55 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-[#050816]/80"
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 block">
                <span className="sr-only">Message</span>
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-[#050816]/55 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-[#050816]/80"
                />
              </label>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <a
                  href="mailto:contact@dyau.ai?subject=Schedule%20Consultation"
                  className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-[#050816] transition hover:bg-cyan-100"
                >
                  Schedule Consultation
                </a>
                <a
                  href="mailto:contact@dyau.ai?subject=Website%20Inquiry"
                  className="rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-cyan-300/10"
                >
                  Send Message
                </a>
              </div>
            </motion.form>
          </div>
        </section>
        )}
      </main>

      <footer className="border-t border-white/10 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a href="#home" className="text-xl font-semibold tracking-[0.22em] text-white">DYAU<span className="text-cyan-300">.AI</span></a>
          </div>
          <div>
            <a
              href="mailto:contact@dyau.ai"
              className="rounded-full border border-cyan-300/20 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/10 hover:text-white"
            >
              contact@dyau.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
