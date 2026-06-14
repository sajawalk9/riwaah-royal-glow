import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bottleAsset from "@/assets/bottle.asset.json";
import logoAsset from "@/assets/logo.asset.json";

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
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Bottle motion — float, rotate, scale, slide left on final section
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const bottleRotate = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [-6, 4, -2, -10]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1.05, 0.95, 0.85]);
  // On the final "Begin the Ritual" section (last ~20% of scroll), shift bottle to the left
  const bottleX = useTransform(scrollYProgress, [0, 0.78, 1], ["0%", "0%", "-28%"]);
  // Ingredient orbit fades out on final section
  const orbitOpacity = useTransform(scrollYProgress, [0, 0.75, 0.9], [1, 1, 0]);

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
    <main ref={containerRef} className="relative">
      {/* Animated background */}
      <motion.div style={{ backgroundColor: bgColor }} className="fixed inset-0 -z-20" />
      <div className="vignette fixed inset-0 -z-10 opacity-90" />
      <div className="pointer-events-none fixed inset-0 -z-10 grain" />

      <Nav />

      {/* Sticky bottle — visible throughout */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
        <motion.div
          style={{ x: bottleX, y: bottleY, rotate: bottleRotate, scale: bottleScale }}
          className="relative"
        >
          {/* Orbiting ingredients */}
          <motion.div style={{ opacity: orbitOpacity }} className="absolute inset-0 -z-10">
            <IngredientOrbit />
          </motion.div>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Golden glow */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-60"
              style={{ background: "radial-gradient(circle, oklch(0.78 0.13 85 / 0.5), transparent 60%)" }} />
            <img
              src={bottleAsset.url}
              alt="Riwaah Nur-E-Zulf Luxury Herbal Hair Oil bottle"
              className="h-[78vh] w-auto max-h-[700px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              style={{ filter: "drop-shadow(0 0 25px rgba(212,176,99,0.25))" }}
            />
            {/* Floor reflection */}
            <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 h-6 w-48 rounded-[50%] blur-xl"
              style={{ background: "oklch(0 0 0 / 0.55)" }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll sections */}
      <Hero />
      <Benefits />
      <Ingredients />
      <Closing />
      <Footer />
    </main>
  );
}

function Nav() {
  return NavInner();
}

const orbitIngredients = [
  { name: "Coconut Oil", angle: 0 },
  { name: "Almond Oil", angle: 36 },
  { name: "Amla Oil", angle: 72 },
  { name: "Castor Oil", angle: 108 },
  { name: "Rosemary", angle: 144 },
  { name: "Hibiscus", angle: 180 },
  { name: "Vitamin E", angle: 216 },
  { name: "Bhringraj", angle: 252 },
  { name: "Amr Bel", angle: 288 },
  { name: "Brahmi", angle: 324 },
];

function IngredientOrbit() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="relative w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
      style={{ perspective: 1000 }}
    >
      {orbitIngredients.map((ing, i) => {
        const rad = (ing.angle * Math.PI) / 180;
        const radius = 320;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius * 0.55;
        return (
          <motion.div
            key={ing.name}
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{ x, y }}
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              whileHover={{ scale: 1.25 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" } }}
              className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className="w-14 h-14 rounded-full border border-gold/40 backdrop-blur-md flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.5)] group-hover:border-gold transition"
                style={{
                  background: "radial-gradient(circle at 30% 30%, oklch(0.4 0.08 130 / 0.7), oklch(0.18 0.04 145 / 0.6))",
                }}
              >
                <span className="text-gold text-xl font-serif italic">
                  {ing.name[0]}
                </span>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80 font-serif opacity-0 group-hover:opacity-100 transition">
                {ing.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function NavInner() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-sm bg-background/20 border-b border-gold/15">
      <Link to="/" className="flex items-center gap-3">
        <img src={logoAsset.url} alt="Riwaah" className="h-10 w-10 object-contain" />
        <span className="font-serif text-xl tracking-[0.3em] text-gold">RIWAAH</span>
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

function Hero() {
  return (
    <section className="relative z-20 min-h-screen flex items-center px-6 md:px-16">
      <div className="w-full grid md:grid-cols-3 items-center gap-6">
        <SectionFrame side="left">
          <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-4">Riwaah Presents</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[0.95] gold-gradient whitespace-nowrap">
            NUR <span className="italic text-3xl md:text-4xl align-middle">— E —</span> ZULF
          </h1>
          <div className="ornate-divider w-32 ml-auto my-6" />
          <p className="italic text-lg text-gold-soft/90 font-serif">Heritage in every drop.</p>
        </SectionFrame>

        <div className="hidden md:block" />

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
    </section>
  );
}

const benefits = [
  { title: "Hair Growth", desc: "Stimulates the scalp and strengthens roots, encouraging natural, healthy growth from within." },
  { title: "Hair Fall Control", desc: "Heritage botanicals fortify the strand, helping reduce breakage with every massage." },
  { title: "Deep Nourishment", desc: "A rich, slow-infused oil that restores softness, shine, and the strength of well-cared-for hair." },
];

function Benefits() {
  return (
    <section id="benefits" className="relative z-20 min-h-screen flex items-center px-6 md:px-16 py-32">
      <div className="w-full grid md:grid-cols-3 items-center gap-10">
        <div className="space-y-12">
          {benefits.slice(0, 2).map((b, i) => (
            <BenefitCard key={i} {...b} side="left" />
          ))}
        </div>
        <div className="hidden md:block" />
        <div className="space-y-12">
          <SectionFrame side="right">
            <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-4">The Promise</p>
            <h2 className="font-serif text-4xl md:text-5xl gold-gradient">Benefits</h2>
            <div className="ornate-divider w-24 my-5" />
            <p className="text-sm text-gold-soft/70 max-w-sm">
              Six botanicals. Five base oils. One ritual passed down through generations.
            </p>
          </SectionFrame>
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
  { name: "Amla", symbol: "🌿" },
  { name: "Hibiscus", symbol: "🌺" },
  { name: "Brahmi", symbol: "🍃" },
  { name: "Kalonji", symbol: "⚫" },
  { name: "Fenugreek", symbol: "🌱" },
  { name: "Rosemary", symbol: "🌾" },
  { name: "Neem", symbol: "🌳" },
  { name: "Castor Oil", symbol: "🫒" },
  { name: "Coconut Oil", symbol: "🥥" },
  { name: "Almond Oil", symbol: "🌰" },
  { name: "Amarbel", symbol: "🌼" },
  { name: "Vitamin E", symbol: "✦" },
];

function Ingredients() {
  return (
    <section id="ingredients" className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-3">The Sacred Blend</p>
        <h2 className="font-serif text-4xl md:text-5xl gold-gradient">Heritage Ingredients</h2>
        <div className="ornate-divider w-32 mx-auto mt-4" />
      </motion.div>

      <IngredientClock />
    </section>
  );
}

function IngredientClock() {
  const count = ingredientClock.length;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="relative w-[min(90vw,640px)] aspect-square"
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
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-gold/50 shadow-[0_8px_24px_rgba(0,0,0,0.5)] group-hover:border-gold transition"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.4 0.08 130 / 0.75), oklch(0.16 0.04 145 / 0.75))",
                }}
              >
                <span className="text-2xl md:text-3xl">{ing.symbol}</span>
              </div>
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold-soft font-serif whitespace-nowrap">
                {ing.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Closing() {
  return (
    <section id="order" className="relative z-20 min-h-screen flex items-center px-6 md:px-16 py-32">
      <div className="w-full grid md:grid-cols-2 gap-10">
        <div className="hidden md:block" />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="text-left md:pl-8"
        >
          <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-6">200 ML · Limited Heritage Batch</p>
          <h2 className="font-serif text-5xl md:text-6xl gold-gradient mb-6">Begin the Ritual</h2>
          <div className="ornate-divider w-32 mb-6" />
          <p className="text-gold-soft/70 mb-10 max-w-md">
            Crafted in small batches with no mineral oil, no parabens, no sulfates. Just heritage, bottled.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
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
