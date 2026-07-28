import { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Logo from './Logo'
import { Bi } from './Icons'
import { ScrollContext } from '../scroll-context'

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Store', href: '#store' },
  { label: 'Updates', href: '#updates' },
  { label: 'Sales', href: '#sales' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  // scrolled: true kalau halaman udah di-scroll turun -> navbar jadi panel
  // putih + sobekan bawah + teks gelap biar nyatu & kebaca di atas konten.
  // forceSolid: verifikasi headless (?nav=solid) — paksa state scrolled.
  const forceSolid =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('nav') === 'solid'
  const [scrolled, setScrolled] = useState(forceSolid)
  const scrollEl = useContext(ScrollContext)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // dengerin scroll dari container SimpleBar (fallback window kalau null)
  useEffect(() => {
    if (forceSolid) return
    const target = scrollEl ?? window
    const read = () => {
      const y = scrollEl ? scrollEl.scrollTop : window.scrollY
      setScrolled(y > 12)
    }
    read()
    target.addEventListener('scroll', read, { passive: true })
    return () => target.removeEventListener('scroll', read)
  }, [scrollEl, forceSolid])

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'text-ink' : 'text-white'
      }`}
    >
      {/* panel putih + sobekan bawah sebagai LAYER terpisah di belakang, biar
          bisa di-animate blur-in mulus (background/mask ga bisa transisi CSS). */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: scrolled ? 1 : 0,
          filter: scrolled ? 'blur(0px)' : 'blur(14px)',
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="navbar-tear pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 sm:px-9">
        {/* logo (pakai SVG asli) — ikut warna teks (putih/ink) */}
        <a href="#top" className="flex items-center">
          <Logo height={46} className={scrolled ? 'text-ink' : 'text-white'} />
        </a>

        {/* nav links (desktop) — polos, tanpa pill */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-base fw-500 transition-colors ${
                scrolled
                  ? 'text-ink/70 hover:text-ink'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden items-center gap-1 rounded-full bg-ink py-2.5 pl-5 pr-4 text-sm fw-500 leading-none text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_24px_rgba(0,0,0,0.35)] sm:inline-flex"
          >
            <span className="leading-none">Support</span>
            <Bi
              name="arrow-up-short"
              className="rotate-45 text-base leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full ring-1 backdrop-blur-md md:hidden ${
              scrolled ? 'bg-black/5 ring-black/10' : 'bg-white/10 ring-white/20'
            }`}
            aria-label="Menu"
          >
            <Bi name={open ? 'x-lg' : 'list'} className="text-xl" />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-4 rounded-3xl bg-white p-3 text-ink shadow-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-lg fw-600 hover:bg-black/5"
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-dark mt-2 w-full justify-center">
              Support <Bi name="arrow-up-short" className="rotate-45 text-lg" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
