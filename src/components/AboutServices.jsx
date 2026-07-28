import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/* ikon tool (SVG black-fill di-mask, jadi bisa diwarnain).
   dipakai di baris "made with modern tools" pada bagian About. */
const ToolIcon = ({ src, className = '' }) => (
  <span
    aria-hidden="true"
    className={`inline-block ${className}`}
    style={{
      WebkitMask: `url('${src}') center / contain no-repeat`,
      mask: `url('${src}') center / contain no-repeat`,
    }}
  />
)

/* tools yang dipakai (ikon di /public/icons) */
const TOOLS = [
  { src: '/icons/CorelDraw.svg', label: 'CorelDRAW' },
  { src: '/icons/Lua.svg', label: 'Lua' },
  { src: '/icons/Roblox.svg', label: 'Roblox Studio' },
]

/* daftar layanan (kolom kiri) — tiap item di-wrap 2 baris */
const SERVICES = [
  ['GRAPHIC', 'DESIGN'],
  ['ROBLOX UI', 'DESIGN'],
  ['ROBLOX', 'SCRIPTING'],
]

export default function AboutServices() {
  return (
    /* section background = GRID BIRU. card (About gelap + Services putih)
       melayang di atasnya: lebih sempit dari batas konten (ada padding di
       wrapper) & lebih pendek, jadi grid biru keliatan di sekelilingnya.
       About = rounded ATAS, Services = rounded BAWAH -> nempel jadi satu
       kartu dengan sobekan di tengah. */
    <section id="about" className="grid-blue">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* ===== ABOUT (gelap) — rounded atas ===== */}
        <div className="relative overflow-hidden rounded-t-[2.25rem] bg-ticket text-white">
          {/* bg NYAMBUNG dari section tetangga: potongan bg Hero nempel di
              tepi ATAS (pudar ke bawah) & bg Porto di tepi BAWAH (pudar ke
              atas). di-blur + opacity rendah + grayscale biar melebur ke
              dark card -> transisi antar-section keliatan nyatu. */}
          <img
            src="/hero-background.webp"
            alt=""
            aria-hidden="true"
            draggable="false"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent)',
              maskImage: 'linear-gradient(to bottom, #000, transparent)',
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-[55%] w-full select-none object-cover object-top opacity-25 blur-2xl [filter:grayscale(1)_brightness(0.7)]"
          />
          <img
            src="/porto-background.webp"
            alt=""
            aria-hidden="true"
            draggable="false"
            style={{
              WebkitMaskImage: 'linear-gradient(to top, #000, transparent)',
              maskImage: 'linear-gradient(to top, #000, transparent)',
            }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full select-none object-cover object-bottom opacity-20 blur-2xl [filter:grayscale(1)_brightness(0.8)]"
          />
          {/* karakter (kanan), full-height, digeser agak ke kiri &
              di-fade transparan ke bawah (mask gradient). */}
          <img
            src="/AboutMe.png"
            alt="Axzy"
            draggable="false"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 35%, transparent 92%)',
              maskImage: 'linear-gradient(to bottom, #000 35%, transparent 92%)',
            }}
            className="pointer-events-none absolute bottom-0 right-[4%] h-[125%] w-auto max-w-none select-none object-contain object-bottom opacity-95 sm:right-[10%]"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative flex flex-col gap-8 px-8 py-24 sm:px-14 sm:py-28"
          >
            <h2 className="font-jakarta text-4xl fw-600 tracking-tight sm:text-5xl">About Me.</h2>
            <p className="max-w-[46ch] text-base leading-relaxed text-white/70 sm:text-lg">
              Hi, I&rsquo;m Axzy — a graphic &amp; Roblox designer. I turn ideas into clean,
              functional visuals and interactive experiences that people actually enjoy using.
              From brand assets to in-game UI, I craft it end to end.
            </p>

            {/* baris tools — teks besar (Jakarta) di TENGAH card + list
                icon beserta namanya (nama di kanan icon), juga di tengah. */}
            <div className="mt-6 flex flex-col items-center gap-6 text-center">
              <span className="font-jakarta text-2xl fw-600 tracking-tight text-white sm:text-3xl">
                Made with modern tools.
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {TOOLS.map((t) => (
                  <span key={t.label} className="inline-flex items-center gap-3">
                    <ToolIcon src={t.src} className="h-8 w-8 bg-white/90 sm:h-9 sm:w-9" />
                    <span className="font-jakarta text-lg fw-500 text-white/90 sm:text-xl">
                      {t.label}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== SERVICES (putih) — rounded bawah, nempel ke About (sobekan di batas) ===== */}
        <div className="services-tear relative overflow-hidden rounded-b-[2.25rem]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="grid gap-12 px-8 py-24 sm:px-14 sm:py-28 md:grid-cols-[1.15fr_1fr] md:items-start"
          >
            {/* kiri: label kecil (di ATAS list) + daftar layanan (Moderniz) */}
            <div className="flex flex-col gap-6">
              <span className="text-xs fw-600 uppercase tracking-[0.24em] text-ink/40">
                Our Services
              </span>
              {SERVICES.map((lines) => (
                <h3
                  key={lines.join(' ')}
                  className="font-display text-4xl uppercase leading-[0.9] tracking-tight text-ink sm:text-5xl"
                >
                  {lines[0]}
                  <br />
                  {lines[1]}
                </h3>
              ))}
            </div>

            {/* kanan: judul besar + deskripsi + tag (semua align kiri) */}
            <div className="flex flex-col gap-6">
              <p className="font-jakarta text-3xl fw-700 leading-[1.1] tracking-tight sm:text-4xl">
                Creative solutions
                <br />
                for modern <span className="text-brand">creators.</span>
              </p>
              <p className="max-w-[42ch] text-base leading-relaxed text-ink/55">
                Whether it&rsquo;s a bold brand identity, a polished game interface, or reliable
                scripting under the hood — every project ships pixel-perfect and on time.
              </p>
              {/* tag/pill kecil */}
              <div className="flex flex-wrap gap-2.5">
                {['Branding', 'UI/UX', 'Lua', 'Illustration'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-2 text-sm fw-600 text-ink/70"
                  >
                    <span className="h-2 w-2 rounded-full bg-lime" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
