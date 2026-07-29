import { motion } from 'motion/react'
import { Bi } from './Icons'

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
  { src: '/icons/Lua.svg', label: 'LuaScript' },
  { src: '/icons/Roblox.svg', label: 'RobloxStudio' },
]

/* daftar layanan (kolom kiri) — tiap item di-wrap 2 baris */
const SERVICES = [
  ['GRAPHIC', 'DESIGN'],
  ['ROBLOX UI', 'DESIGN'],
  ['ROBLOX', 'SCRIPTING'],
]

/* isi 3 card (di bawah deskripsi). tiap card: judul 2 baris (Moderniz) +
   pill putih berisi teks biasa + potongan highlight (lime). */
const CARDS = [
  { title: ['HIGH', 'QUALITY'], pill: 'A clean and neat', highlight: 'interface', float: true },
  { title: ['CUSTOM', 'SOLUTION'], pill: 'Built for your', highlight: 'needs', arrow: true },
  { title: ['SHIP', 'ON TIME'], pill: '100+ projects done', bubble: true },
]

export default function AboutServices() {
  return (
    /* section background = GRID BIRU. card (About gelap + Services putih)
       melayang di atasnya. */
    <section id="about" className="relative">
      {/* ===== ABOUT (gelap) — full width, tepi bawah disobek (satu sisi) ===== */}
      {/* z-[30]: harus di ATAS objek hero (z-20). soalnya AboutMe nembus ke
          atas masuk area hero — kalau z-nya di bawah, ketutup objek hero. */}
      <div className="relative z-[30] text-white">
        {/* bg gelap DIPISAH ke layer sendiri biar sobekan (mask) cuma ngenain
            background — AboutMe di sibling ini tetap bebas tembus ke atas.
            di dalemnya: gambar hero-background (grayscale + digelapin) biar
            nyambung sama hero, bukan flat. overlay gelap di atasnya biar teks
            tetep kebaca. base bg-ticket sbg fallback kalau gambar gagal load. */}
        <div className="about-tear absolute inset-0 overflow-hidden bg-ticket">
          <img
            src="https://images5.alphacoders.com/140/1401545.jpg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center opacity-3 [filter:grayscale(1)]"
          />
        </div>
        {/* karakter (kanan) — DESKTOP ONLY: absolute di kanan, fade ke bawah,
            tembus ke atas card. di mobile disembunyiin (dipindah ke flow, di
            bawah quote — lihat <img> inline di bawah). */}
        <img
          src="/AboutMe.png"
          alt="Axzy"
          draggable="false"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, #000 35%, transparent 92%)',
            maskImage: 'linear-gradient(to bottom, #000 35%, transparent 92%)',
          }}
          className="pointer-events-none absolute bottom-auto right-0 top-auto z-[1] hidden h-[112%] w-auto max-w-none select-none object-contain object-bottom opacity-95 sm:-bottom-2 sm:right-[18%] sm:block"
        />
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-[2] mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-16 sm:px-10 sm:py-28"
        >
          <h2 className="font-jakarta text-4xl fw-600 tracking-tight sm:text-5xl">About Me.</h2>
          <p className="max-w-[52ch] text-base leading-relaxed text-white/70 sm:text-lg">
            I'm Axzy, a graphic designer specializing in visual design and UI.
            I enjoy turning ideas into clean, engaging, and user-friendly designs.
            My goal is to create visuals that not only look great but also communicate
            clearly and leave a lasting impression.
          </p>

          {/* quote — di bawah deskripsi, miring & agak pudar */}
          <p className="max-w-[42ch] font-jakarta text-base italic leading-relaxed text-white/35 sm:text-base">
            &ldquo;I communicate through visuals, not words.&rdquo;
          </p>

          {/* karakter (MOBILE ONLY) — di flow, antara quote & "Made with
              modern tools". desktop pakai <img> absolute di atas.
              tetep dikasih fade ke bawah biar nyatu (sama kaya desktop). */}
          <img
            src="/AboutMe.png"
            alt="Axzy"
            draggable="false"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 96%)',
              maskImage: 'linear-gradient(to bottom, #000 55%, transparent 96%)',
            }}
            className="pointer-events-none mx-auto h-80 w-auto max-w-none select-none object-contain sm:hidden"
          />

          {/* baris tools — teks besar (Jakarta) di TENGAH card + list
              icon beserta namanya (nama di kanan icon), juga di tengah. */}
          <div className="mt-6 flex flex-col items-center gap-6 text-center">
            <span className="font-jakarta text-2xl fw-600 tracking-tight text-white sm:text-3xl">
              Made with modern tools.
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {TOOLS.map((t, i) => (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.1 }}
                  className="inline-flex items-center gap-3"
                >
                  <ToolIcon src={t.src} className="h-8 w-8 bg-white/90 sm:h-9 sm:w-9" />
                  <span className="font-jakarta text-lg fw-500 text-white/90 sm:text-xl">
                    {t.label}
                  </span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== SERVICES (putih) — full width, diselip naik ke belakang gigi
          sobekan About (overlap) biar takik nampilin putih -> nyatu ===== */}
      <div id="services" className="relative -mt-3 bg-paper">
        <div
          className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 sm:px-10 sm:py-28 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-12"
        >
          {/* kiri: label kecil (di ATAS list) + daftar layanan (Moderniz).
              tiap item reveal sendiri-sendiri (stagger) + ilang pas kelewat. */}
          <div className="flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-sm fw-700 uppercase tracking-[0.24em] text-ink/40"
            >
              Our Services
            </motion.span>
            {SERVICES.map((lines, i) => (
              <motion.h3
                key={lines.join(' ')}
                initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
                className="font-display text-[2rem] uppercase leading-[0.9] tracking-tight text-ink sm:text-6xl"
              >
                {lines[0]}
                <br />
                {lines[1]}
              </motion.h3>
            ))}
          </div>

          {/* kanan: judul besar + deskripsi + 3 card (di bawah deskripsi) */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-jakarta text-4xl fw-700 leading-[1.1] tracking-tight sm:text-5xl"
            >
              Creative solutions
              <br />
              for modern <span className="text-brand">creators.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="max-w-[42ch] text-lg fw-500 leading-relaxed text-ink/55"
            >
              We specialize in Roblox UI/UX design, custom scripting, and
              graphic design. We help creators, communities, and businesses
              turn their ideas into creative and functional digital experiences.
            </motion.p>

            {/* 3 card KOSONG — efek STACKED 2 layer:
                - layer bawah: duplikat card warna PUTIH, posisi sama tapi
                  digeser turun dikit + di-blur -> jadi glow lembut di bawah.
                - layer atas: card HITAM (yg keliatan penuh).
                lebar total dibatasi = lebar deskripsi biar ga ngelebihin. */}
            <div className="mt-2 grid w-full max-w-[62ch] grid-cols-1 gap-3 sm:grid-cols-3">
              {CARDS.map((c, i) => (
                <motion.figure
                  key={c.title.join(' ')}
                  initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.12 }}
                  className="group relative flex min-h-[120px] flex-col justify-between rounded-3xl rounded-br-[3rem] bg-black p-4 text-white shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* layer putih DI DALEM card: solid, geser turun + blur, mask
                      gradient bawah->atas (pudar di atas). ditaruh paling
                      belakang biar konten (z-[1]) ga ketutup. */}
                  <div
                    aria-hidden="true"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to top, #000 30%, transparent 100%)',
                      maskImage: 'linear-gradient(to top, #000 30%, transparent 100%)',
                    }}
                    className="pointer-events-none absolute inset-0 translate-y-3 rounded-3xl rounded-br-[3rem] bg-white blur-[15px]"
                  />
                  {/* judul 2 baris — Moderniz. whitespace-nowrap biar
                      "ON TIME" ga ke-wrap jadi 2 baris. */}
                  <h4 className="relative z-[1] text-center font-display text-sm uppercase leading-[1.05] tracking-tight sm:text-base">
                    {c.title[0]}
                    <br />
                    <span className="whitespace-nowrap">{c.title[1]}</span>
                  </h4>
                  {/* pill putih: teks biasa (nowrap). highlight INLINE di dalem
                      pill (kecuali card 'float' -> highlight jadi pill melayang).
                      card 'float' kasih padding kanan ekstra biar teks ga
                      ketutup pill 'interface' yg nimpa. */}
                  <div className="relative z-[1] mb-3 flex items-center justify-center">
                    <span
                      className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-1.5 text-[11px] fw-600 text-ink shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
                        c.float
                          ? '-translate-x-2 pl-3 pr-12'
                          : c.highlight
                            ? 'pl-3 pr-1.5' /* highlight inline: jarak kanan = py biar simetris */
                            : 'px-3'
                      } ${c.bubble ? 'origin-bottom-left group-hover:-rotate-6' : ''}`}
                    >
                      {c.pill}
                      {c.highlight && !c.float && (
                        <span className="rounded-full bg-lime px-2 py-0.5 text-ink">
                          {c.highlight}
                        </span>
                      )}
                      {/* ekor bubble chat (segitiga kecil di bawah, agak ke kiri) */}
                      {c.bubble && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 bg-white"
                        />
                      )}
                      {/* highlight MELAYANG (cuma card 'float'): pill lime terpisah
                          nimpa di pojok kanan pill utama (di area padding-kanan),
                          rotasi + shadow. ANCHOR ke pill (di dalem span) biar
                          jarak-nya konsisten di mobile & desktop (ga ngikut lebar
                          kartu yg beda). */}
                      {c.highlight && c.float && (
                        <span className="absolute -right-4 top-1/2 -translate-y-1/2 rotate-[24deg] whitespace-nowrap rounded-full bg-lime px-2.5 py-1 text-[11px] fw-700 text-ink shadow-[0_6px_14px_-4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-[60%] group-hover:rotate-[-8deg] group-hover:scale-110">
                          {c.highlight}
                        </span>
                      )}
                    </span>
                    {/* card tengah: tombol bulat biru (panah) nempel di pill.
                        pakai ikon Bootstrap biar bener-bener center di lingkaran. */}
                    {c.arrow && (
                      <span className="absolute -bottom-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-brand text-white shadow-[0_4px_10px_-2px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                        <Bi name="arrow-up-right" className="text-[11px] leading-none" />
                      </span>
                    )}
                  </div>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
