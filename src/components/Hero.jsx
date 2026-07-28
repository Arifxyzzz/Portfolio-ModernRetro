import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react'
import { useRef, useContext } from 'react'
import { ScrollContext } from '../scroll-context'

const EASE = [0.22, 1, 0.36, 1]

// title muncul dengan blur-in: dari blur + fade + sedikit membesar.
// tidak ada overflow clipping jadi glyph Moderniz tidak kepotong.
const BlurWord = ({ children, delay = 0, className = '' }) => (
  <motion.span
    className={`block ${className}`}
    initial={{ opacity: 0, filter: 'blur(24px)', scale: 1.06 }}
    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
    transition={{ duration: 1.3, ease: EASE, delay }}
  >
    {children}
  </motion.span>
)

export default function Hero() {
  const ref = useRef(null)
  // container scroll dari SimpleBar (via context). useScroll baca dari sini,
  // bukan window, karena SimpleBar yang nge-scroll — kalau null fallback window.
  const scrollEl = useContext(ScrollContext)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollEl ? { current: scrollEl } : undefined,
    offset: ['start start', 'end start'],
  })
  // parallax halus: title & objek gerak beda kecepatan saat scroll
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 120])
  const yObjek = useTransform(scrollYProgress, [0, 1], [0, -50])
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 60])

  // posisi cursor untuk spotlight warna (default di tengah)
  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  // radial mask: pusat = titik cursor, warna hanya muncul di sekitar cursor
  const spotMask = useMotionTemplate`radial-gradient(circle 260px at ${mx}% ${my}%, #000 0%, #000 30%, transparent 70%)`

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden bg-ink text-white"
    >
      {/* LAYER 1a — background abu-abu (saturasi 0) */}
      <motion.img
        src="/hero-background.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{ y: yBg }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center [scale:1.18] [filter:grayscale(1)_brightness(0.72)]"
      />
      {/* LAYER 1b — background berwarna, cuma tampil di area cursor (spotlight) */}
      <motion.img
        src="/hero-background.webp"
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{ y: yBg, maskImage: spotMask, WebkitMaskImage: spotMask }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center [scale:1.18]"
      />

      {/* LAYER 2 — title AXZY solid (di antara bg & objek) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.h1
          style={{ y: yTitle }}
          className="pointer-events-none select-none text-center font-display leading-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        >
          <BlurWord delay={0.35} className="text-[16vw] sm:text-[15vw]">
            AXZY
          </BlurWord>
        </motion.h1>
      </div>

      {/* LAYER 3 — objek karakter (size & posisi = background) */}
      <motion.img
        src="/hero-objek.webp"
        alt="AXZY characters"
        draggable="false"
        style={{ y: yObjek }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-cover object-center [scale:1.18] drop-shadow-[0_30px_50px_rgba(0,0,0,0.4)]"
      />

      {/* LAYER 4 — title AXZY stroke (paling depan, biar tetap kebaca nembus karakter) */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <motion.h1
          style={{ y: yTitle }}
          className="pointer-events-none select-none text-center font-display leading-none"
        >
          <BlurWord delay={0.35} className="text-stroke text-[16vw] sm:text-[15vw]">
            AXZY
          </BlurWord>
        </motion.h1>
      </div>
    </section>
  )
}
