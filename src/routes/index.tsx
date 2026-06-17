import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import bottleAsset from "@/assets/bottle.asset.json";
import logoAsset from "@/assets/logo.asset.json";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Riwaah — Nur-E-Zulf Luxury Herbal Hair Oil" },
      { name: "description", content: "Heritage in every drop. A royal blend of heritage botanicals — hair growth, fall control, and deep nourishment." },
      { property: "og:title", content: "Riwaah — Nur-E-Zulf Luxury Herbal Hair Oil" },
      { property: "og:description", content: "Heritage in every drop. Crafted with tradition, perfected by time." },
    ],
  }),
  component: Index,
});

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const isMobile = useIsMobile();

  // Bottle motion — float, rotate, scale, slide left on final section
  const bottleY = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.7, 0.85, 1], [0, 0, 55, 55, 0, -30]);
  const bottleRotate = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [-6, 4, -2, -10]);
  // Keep bottle visible inside the ring; scale down only at the very end
  const bottleScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 0.8, 0.85, 1], [1, 0.9, 0.75, 0.7, 0, 0]);
  const bottleX = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  // Background hue shifts subtly per section
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.34, 0.67, 1],
    [
      "oklch(0.22 0.04 145)",
      "oklch(0.20 0.05 150)",
      "oklch(0.18 0.05 140)",
      "oklch(0.16 0.04 145)",
    ],
  );

  return (
    <main
      ref={containerRef}
      className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {/* Animated background */}
      <motion.div style={{ backgroundColor: bgColor }} className="fixed inset-0 -z-20" />
      <div className="vignette fixed inset-0 -z-10 opacity-90" />
      <div className="pointer-events-none fixed inset-0 -z-10 grain" />

      <Nav />

      {/* Sticky bottle — desktop only; on mobile we render the bottle inline per section */}
      {!isMobile && (
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
        <motion.div
          style={{ x: bottleX, y: bottleY, rotate: bottleRotate, scale: bottleScale }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Golden glow */}
            <div className="absolute inset-0 -z-10 blur-2xl opacity-40"
              style={{ background: "radial-gradient(circle, oklch(0.78 0.13 85 / 0.45), transparent 55%)" }} />
            <img
              src={bottleAsset.url}
              alt="Riwaah Nur-E-Zulf Luxury Herbal Hair Oil bottle"
              className="h-[70vh] w-auto max-h-[640px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              style={{ filter: "drop-shadow(0 0 25px rgba(212,176,99,0.25))" }}
            />
            {/* Floor reflection */}
            <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 h-6 w-48 rounded-[50%] blur-xl"
              style={{ background: "oklch(0 0 0 / 0.55)" }} />
          </motion.div>
        </motion.div>
      </div>
      )}

      {/* Scroll sections */}
      <Hero isMobile={isMobile} />
      <Benefits isMobile={isMobile} />
      <Ingredients isMobile={isMobile} />
      <Closing isMobile={isMobile} />
      <Footer />
    </main>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-12 py-4 md:py-5 flex items-center justify-between backdrop-blur-md bg-background/40 border-b border-gold/15">
      <Link to="/" className="flex items-center gap-3">
        <img src={logoAsset.url} alt="Riwaah" className="h-9 w-9 md:h-10 md:w-10 object-contain" />
        <span className="font-serif text-lg md:text-xl tracking-[0.3em] text-gold">RIWAAH</span>
      </Link>
      <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase text-gold/80">
        <a href="#benefits" className="hover:text-gold transition">Benefits</a>
        <a href="#ingredients" className="hover:text-gold transition">Ingredients</a>
        <Link to="/story" className="hover:text-gold transition">Heritage</Link>
      </nav>
      <a
        href="#order"
        className="hidden md:inline-block border border-gold/60 text-gold text-xs tracking-[0.25em] uppercase px-5 py-2.5 hover:bg-gold hover:text-olive-deep transition"
      >
        Order Now
      </a>
      {/* Mobile menu button */}
      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-gold/40 rounded-sm text-gold"
      >
        <span className={`block w-5 h-px bg-gold transition-transform ${open ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"}`} />
        <span className={`block w-5 h-px bg-gold transition-transform ${open ? "-translate-y-[1px] -rotate-45" : "translate-y-[3px]"}`} />
      </button>
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-gold/20 flex flex-col">
          <a onClick={() => setOpen(false)} href="#benefits" className="px-6 py-4 text-xs tracking-[0.3em] uppercase text-gold-soft border-b border-gold/10">Benefits</a>
          <a onClick={() => setOpen(false)} href="#ingredients" className="px-6 py-4 text-xs tracking-[0.3em] uppercase text-gold-soft border-b border-gold/10">Ingredients</a>
          <Link onClick={() => setOpen(false)} to="/story" className="px-6 py-4 text-xs tracking-[0.3em] uppercase text-gold-soft border-b border-gold/10">Heritage</Link>
          <a onClick={() => setOpen(false)} href="#order" className="px-6 py-4 text-xs tracking-[0.3em] uppercase text-olive-deep bg-gold text-center">Order Now</a>
        </div>
      )}
    </header>
  );
}

function SectionFrame({ children, side }: { children: React.ReactNode; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`max-w-md ${side === "left" ? "text-right md:pr-12 ml-auto md:ml-0" : "text-left md:pl-12"}`}
    >
      {children}
    </motion.div>
  );
}

function InlineBottle({ size = "h-[55vh] max-h-[420px]" }: { size?: string }) {
  return (
    <div className="relative flex justify-center my-8">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.13 85 / 0.5), transparent 60%)" }} />
      <motion.img
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        src={bottleAsset.url}
        alt="Riwaah Nur-E-Zulf bottle"
        className={`${size} w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]`}
        style={{ filter: "drop-shadow(0 0 20px rgba(212,176,99,0.25))" }}
      />
    </div>
  );
}

function Hero({ isMobile }: { isMobile: boolean }) {
  return (
    <section className="relative z-20 snap-start h-screen flex items-center px-5 md:px-16 pt-16 md:pt-0">
      {isMobile ? (
        <div className="w-full flex flex-col h-full pt-2 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-2">Riwaah Presents</p>
            <h1 className="font-serif text-3xl sm:text-4xl leading-[0.95] gold-gradient">
              NUR-E-ZULF
            </h1>
            <div className="ornate-divider w-20 my-2" />
            <p className="italic text-sm text-gold-soft/90 font-serif">Heritage in every drop.</p>
          </motion.div>
          <div className="flex-1 flex items-center justify-center min-h-0 my-1">
            <InlineBottle size="h-[26vh] max-h-[230px]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <p className="text-[10px] tracking-[0.4em] text-gold/70 uppercase mb-2">Luxury Herbal Hair Oil</p>
            <p className="text-[13px] text-gold-soft/80 leading-relaxed">
              Inspired by generations of hair-care rituals — a luxurious infusion of heritage botanicals for the hair you were meant to have.
            </p>
            <a href="#benefits" className="inline-block mt-2 text-[10px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1">
              Discover the ritual ↓
            </a>
          </motion.div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-3 items-center gap-6">
          <SectionFrame side="left">
            <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-4">Riwaah Presents</p>
            <h1 className="font-serif text-5xl md:text-6xl leading-[0.95] gold-gradient whitespace-nowrap">
              NUR-E-ZULF
            </h1>
            <div className="ornate-divider w-32 ml-auto my-6" />
            <p className="italic text-lg text-gold-soft/90 font-serif">Heritage in every drop.</p>
          </SectionFrame>
          <div />
          <SectionFrame side="right">
            <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-4">Luxury Herbal Hair Oil</p>
            <h2 className="font-serif text-3xl md:text-4xl text-gold-soft leading-tight">
              A royal blend, crafted with tradition, perfected by time.
            </h2>
            <div className="ornate-divider w-32 my-6" />
            <p className="text-sm text-gold-soft/70 leading-relaxed max-w-sm">
              Inspired by generations of hair-care rituals — a luxurious infusion of heritage botanicals and nourishing oils for the hair you were meant to have.
            </p>
            <a href="#benefits" className="inline-block mt-8 text-xs tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1 hover:border-gold transition">
              Discover the ritual ↓
            </a>
          </SectionFrame>
        </div>
      )}
    </section>
  );
}

const benefits = [
  { title: "Hair Growth", desc: "Stimulates the scalp and strengthens roots, encouraging natural, healthy growth from within." },
  { title: "Hair Fall Control", desc: "Heritage botanicals fortify the strand, helping reduce breakage with every massage." },
  { title: "Deep Nourishment", desc: "A rich, slow-infused oil that restores softness, shine, and the strength of well-cared-for hair." },
];

function Benefits({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <section id="benefits" className="relative z-20 snap-start h-screen flex flex-col items-center px-5 pt-20 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-3"
        >
          <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-2">The Promise</p>
          <h2 className="font-serif text-3xl gold-gradient">Benefits</h2>
          <div className="ornate-divider w-20 mx-auto my-2" />
        </motion.div>
        <div className="flex-1 min-h-0 flex items-center">
          <InlineBottle size="h-[26vh] max-h-[220px]" />
        </div>
        <div className="w-full max-w-sm space-y-3">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <h3 className="font-serif text-base text-gold-soft">{b.title}</h3>
              <p className="text-[11px] text-gold-soft/70 leading-snug">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id="benefits" className="relative z-20 snap-start h-screen flex flex-col items-center px-6 md:px-16 py-24">
      <div className="w-full grid md:grid-cols-3 items-center gap-10 flex-1">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="text-right md:pr-12 ml-auto max-w-md"
          >
            <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-3">The Promise</p>
            <h2 className="font-serif text-5xl gold-gradient">Benefits</h2>
            <div className="ornate-divider w-32 ml-auto mt-4" />
            <p className="text-sm text-gold-soft/70 mt-4">
              Six botanicals. Five base oils. One ritual passed down through generations.
            </p>
          </motion.div>
          <BenefitCard {...benefits[0]} side="left" />
        </div>
        <div className="hidden md:block" />
        <div className="space-y-12">
          <BenefitCard {...benefits[1]} side="right" />
          <BenefitCard {...benefits[2]} side="right" />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ title, desc, side }: { title: string; desc: string; side: "left" | "right" }) {
  return (
    <SectionFrame side={side}>
      <h3 className="font-serif text-2xl text-gold-soft mb-3">{title}</h3>
      <div className={`ornate-divider w-16 mb-3 ${side === "left" ? "ml-auto" : ""}`} />
      <p className="text-sm text-gold-soft/70 leading-relaxed">{desc}</p>
    </SectionFrame>
  );
}

const ingredientClock = [
  { name: "Coconut Oil", symbol: "❋" },
  { name: "Almond Oil", symbol: "❀" },
  { name: "Amla Oil", symbol: "✤" },
  { name: "Castor Oil", symbol: "✶" },
  { name: "Rosemary", symbol: "❦" },
  { name: "Hibiscus", symbol: "✿" },
  { name: "Vitamin E", symbol: "✦" },
  { name: "Bhringraj", symbol: "❧" },
  { name: "Amr Bel", symbol: "✸" },
  { name: "Brahmi", symbol: "❖" },
];

function Ingredients({ isMobile }: { isMobile: boolean }) {
  return (
    <section id="ingredients" className="relative z-30 snap-start h-screen flex flex-col items-center justify-center px-5 md:px-16 pt-20 pb-6 md:pt-24 md:pb-10 bg-background/20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4 md:mb-6"
      >
        <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-3">The Sacred Blend</p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl gold-gradient">Heritage Ingredients</h2>
        <div className="ornate-divider w-24 mx-auto mt-3" />
      </motion.div>

      <IngredientClock showInnerBottle={isMobile} />
    </section>
  );
}

function IngredientClock({ showInnerBottle = false }: { showInnerBottle?: boolean }) {
  const count = ingredientClock.length;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="relative aspect-square"
      style={{ width: "min(82vw, 68vh, 560px)" }}
    >
      {/* Golden ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid oklch(0.78 0.13 85 / 0.55)",
          boxShadow:
            "0 0 40px oklch(0.78 0.13 85 / 0.25), inset 0 0 30px oklch(0.78 0.13 85 / 0.15)",
        }}
      />
      <div
        className="absolute inset-6 rounded-full pointer-events-none"
        style={{ border: "1px dashed oklch(0.78 0.13 85 / 0.25)" }}
      />

      {showInnerBottle && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 m-auto blur-3xl opacity-50 w-1/2 h-1/2"
            style={{ background: "radial-gradient(circle, oklch(0.78 0.13 85 / 0.5), transparent 60%)" }} />
          <motion.img
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src={bottleAsset.url}
            alt="Riwaah Nur-E-Zulf bottle"
            className="h-[55%] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            style={{ filter: "drop-shadow(0 0 20px rgba(212,176,99,0.3))" }}
          />
        </div>
      )}

      {/* Clock-positioned ingredients */}
      {ingredientClock.map((ing, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const radiusPct = 50;
        const x = 50 + Math.cos(angle) * radiusPct;
        const y = 50 + Math.sin(angle) * radiusPct;
        return (
          <motion.div
            key={ing.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <motion.div
              whileHover={{ scale: 1.15, y: -4 }}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-gold/60 shadow-[0_8px_24px_rgba(0,0,0,0.5)] group-hover:border-gold transition"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.4 0.08 130 / 0.75), oklch(0.16 0.04 145 / 0.75))",
                }}
              >
                <span
                  className="text-2xl md:text-3xl font-serif"
                  style={{
                    color: "oklch(0.82 0.13 85)",
                    textShadow: "0 0 10px oklch(0.78 0.13 85 / 0.6)",
                  }}
                >
                  {ing.symbol}
                </span>
              </div>
              <span className="text-[9px] md:text-xs tracking-[0.18em] uppercase text-gold-soft font-serif whitespace-nowrap">
                {ing.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Closing({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <section id="order" className="relative z-20 snap-start h-screen flex flex-col items-center justify-center px-5 py-16">
        <InlineBottle size="h-[40vh] max-h-[340px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-6 max-w-sm"
        >
          <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-4">200 ML · Limited Heritage Batch</p>
          <h2 className="font-serif text-4xl gold-gradient mb-4">Begin the Ritual</h2>
          <div className="ornate-divider w-32 mx-auto mb-5" />
          <p className="text-gold-soft/70 mb-8 text-sm">
            Crafted in small batches with no mineral oil, no parabens, no sulfates. Just heritage, bottled.
          </p>
          <div className="flex flex-col items-center gap-3">
            <a href="#" className="bg-gold text-olive-deep text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-gold-soft transition w-full text-center">
              Order — PKR 2,500
            </a>
            <Link to="/story" className="border border-gold/60 text-gold text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-gold/10 transition w-full text-center">
              Our Heritage
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }
  return (
    <section id="order" className="relative z-20 snap-start h-screen flex items-center justify-center px-6 md:px-16 py-24">
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <InlineBottle size="h-[38vh] max-h-[340px]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="text-center max-w-xl"
        >
          <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-3">200 ML · Limited Heritage Batch</p>
          <h2 className="font-serif text-4xl md:text-5xl gold-gradient mb-3">Begin the Ritual</h2>
          <div className="ornate-divider w-32 mb-4 mx-auto" />
          <p className="text-gold-soft/70 mb-6 max-w-md mx-auto">
            Crafted in small batches with no mineral oil, no parabens, no sulfates. Just heritage, bottled.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#" className="bg-gold text-olive-deep text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-gold-soft transition">
              Order — PKR 2,500
            </a>
            <Link to="/story" className="border border-gold/60 text-gold text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-gold/10 transition">
              Our Heritage
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-20 border-t border-gold/15 px-6 md:px-16 py-10 text-center">
      <img src={logoAsset.url} alt="Riwaah" className="h-12 w-12 mx-auto opacity-80 mb-3" />
      <p className="text-[10px] tracking-[0.5em] text-gold/60 uppercase">Riwaah · Crafted in Pakistan · © 2026</p>
    </footer>
  );
}
