import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react'
import { useRef, useContext } from 'react'
import { ScrollContext } from '../scroll-context'
import { useIsMobile } from '../use-is-mobile'

const EASE = [0.22, 1, 0.36, 1]

// title muncul dengan blur-in: dari blur + fade + sedikit membesar.
const BlurWord = ({ children, delay = 0, className = '' }) => (
  <motion.span
    className={`block ${className}`}
    initial={{ opacity: 0, filter: 'blur(24px)', scale: 1.06 }}
    whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    viewport={{ once: false, amount: 0.4 }}
    transition={{ duration: 1.3, ease: EASE, delay }}
  >
    {children}
  </motion.span>
)

/* Section "PORTFOLIO" — struktur 4 layer sama kaya Hero:
   (1) background (grayscale + spotlight warna), (2) title solid,
   (3) objek karakter, (4) title stroke (paling depan).
   Bedanya: teks lebih kecil, tulisan PORTFOLIO, & warna teks GELAP. */
export default function Portfolio() {
  const ref = useRef(null)
  const scrollEl = useContext(ScrollContext)
  // di mobile background dibikin DIEM (ga parallax) — cukup title & objek yg
  // gerak. yBg dipaksa 0 kalau mobile.
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollEl ? { current: scrollEl } : undefined,
    offset: ['start end', 'end start'],
  })
  // parallax halus: title & objek gerak beda kecepatan saat scroll
  const yTitle = useTransform(scrollYProgress, [0, 1], [60, -60])
  const yObjek = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yBgRaw = useTransform(scrollYProgress, [0, 1], [-30, 30])
  // mobile: bg diem (0), desktop: parallax normal
  const yBg = isMobile ? 0 : yBgRaw

  // posisi cursor untuk spotlight warna (default di tengah)
  const mx = useMotionValue(50)
  const my = useMotionValue(45)
  const spotMask = useMotionTemplate`radial-gradient(circle 260px at ${mx}% ${my}%, #000 0%, #000 30%, transparent 70%)`

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative aspect-[2940/1672] overflow-hidden bg-paper text-ink sm:aspect-auto sm:min-h-screen"
    >
      {/* LAYER 1a — background abu-abu (saturasi 0) */}
      <motion.img
        src="/porto-background.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-center [filter:grayscale(1)_brightness(1.05)] sm:object-cover"
      />
      {/* LAYER 1b — background berwarna, cuma tampil di area cursor (spotlight) */}
      <motion.img
        src="/porto-background.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{ y: yBg, maskImage: spotMask, WebkitMaskImage: spotMask }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain object-center sm:object-cover"
      />

      {/* LAYER 2 — title PORTFOLIO solid (di antara bg & objek) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.h2
          style={{ y: yTitle }}
          className="pointer-events-none select-none text-center font-display leading-none text-ink drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          <BlurWord delay={0.15} className="text-[8vw] sm:text-[7vw]">
            PORTFOLIO
          </BlurWord>
        </motion.h2>
      </div>

      {/* LAYER 3 — objek karakter (size & posisi = background) */}
      <motion.img
        src="/porto-objek.webp"
        alt="AXZY portfolio"
        draggable="false"
        style={{ y: yObjek }}
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-contain object-center drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)] sm:object-cover"
      />

      {/* LAYER 4 — title PORTFOLIO stroke gelap (paling depan, tetap kebaca nembus karakter) */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <motion.h2
          style={{ y: yTitle }}
          className="pointer-events-none select-none text-center font-display leading-none"
        >
          <BlurWord delay={0.15} className="text-stroke-dark text-[8vw] sm:text-[7vw]">
            PORTFOLIO
          </BlurWord>
        </motion.h2>
      </div>
    </section>
  )
}
