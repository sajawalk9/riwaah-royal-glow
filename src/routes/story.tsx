import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import logoAsset from "@/assets/logo.asset.json";
import bottleAsset from "@/assets/bottle.asset.json";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Heritage — Riwaah Nur-E-Zulf" },
      { name: "description", content: "The story of Riwaah and Nur-E-Zulf — a luxury herbal hair oil rooted in generations of traditional hair-care rituals." },
      { property: "og:title", content: "Heritage — Riwaah Nur-E-Zulf" },
      { property: "og:description", content: "A ritual passed down through generations. Heritage in every drop." },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <main className="relative min-h-screen">
      <div className="vignette fixed inset-0 -z-10" />
      <div className="pointer-events-none fixed inset-0 -z-10 grain" />

      <header className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-gold/15 backdrop-blur-sm bg-background/30 sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Riwaah" className="h-10 w-10 object-contain" />
          <span className="font-serif text-xl tracking-[0.3em] text-gold">RIWAAH</span>
        </Link>
        <Link to="/" className="text-xs tracking-[0.3em] uppercase text-gold/80 hover:text-gold transition">← Back</Link>
      </header>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] text-gold/70 uppercase mb-4">The House of Riwaah</p>
          <h1 className="font-serif text-6xl md:text-7xl gold-gradient mb-6">Our Heritage</h1>
          <div className="ornate-divider w-32 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <img src={bottleAsset.url} alt="Nur-E-Zulf bottle" className="w-auto h-[35vh] max-h-[280px] mx-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl text-gold-soft">Inspired by generations of ritual.</h2>
            <div className="ornate-divider w-20" />
            <p className="text-gold-soft/75 leading-relaxed">
              Nur-E-Zulf — the light of the tresses — is a luxurious blend of carefully selected oils and heritage botanicals, crafted to nourish the scalp, strengthen hair, and enhance natural beauty the timeless way.
            </p>
            <p className="text-gold-soft/75 leading-relaxed">
              Every bottle is hand-finished in small batches. No mineral oil. No parabens. No sulfates. Only what our grandmothers would have approved of.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <Pill>No Mineral Oil</Pill>
              <Pill>No Parabens</Pill>
              <Pill>No Sulfates</Pill>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <Card title="Traditional Wisdom" desc="Recipes rooted in centuries of South Asian hair-care knowledge." />
          <Card title="Crafted With Care" desc="Slow-infused, hand-bottled, and inspected drop by drop." />
          <Card title="Rooted in Heritage" desc="A ritual carried forward — a luxury reimagined for today." />
        </div>

        <div className="mt-32 text-center">
          <Link to="/" className="inline-block bg-gold text-olive-deep text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold-soft transition">
            Return to the Bottle
          </Link>
        </div>
      </section>

      <footer className="border-t border-gold/15 px-6 py-10 text-center">
        <p className="text-[10px] tracking-[0.5em] text-gold/60 uppercase">Riwaah · Crafted in Pakistan · © 2026</p>
      </footer>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gold/40 text-gold text-[10px] tracking-[0.2em] uppercase text-center py-2">
      {children}
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="border border-gold/25 p-8 bg-olive/30 backdrop-blur-sm"
    >
      <h3 className="font-serif text-2xl text-gold-soft mb-3">{title}</h3>
      <div className="ornate-divider w-12 mb-3" />
      <p className="text-sm text-gold-soft/70 leading-relaxed">{desc}</p>
    </motion.div>
  );
}