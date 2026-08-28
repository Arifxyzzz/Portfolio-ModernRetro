import { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Logo from './Logo'
import { Bi } from './Icons'
import { ScrollContext } from '../scroll-context'
import { useIsMobile } from '../use-is-mobile'
import { navigate } from '../use-route'

const links = [
  { label: 'Home', target: 'top' },
  { label: 'About', target: 'about' },
  { label: 'Service', target: 'services' },
  { label: 'Project', target: '/projects' },
  { label: 'Contact', target: 'contact' },
]

export default function Navbar({ route = '/' }) {
  const [open, setOpen] = useState(false)
  const forceSolid =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('nav') === 'solid'
  const [scrolled, setScrolled] = useState(forceSolid)
  const scrollEl = useContext(ScrollContext)
  const isMobile = useIsMobile()
  const onProjects = route.startsWith('/projects')
  const solid = scrolled || open || isMobile || onProjects

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (e, id) => {
    e.preventDefault()
    setOpen(false)
    if (id.startsWith('/')) {
      navigate(id)
      return
    }
    if (onProjects) {
      navigate(id === 'top' ? '/' : `/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (!el && id !== 'top') return
    const container = scrollEl ?? window
    if (id === 'top') {
      container.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const navH = isMobile ? 0 : 94
    if (scrollEl) {
      const top = scrollEl.scrollTop + el.getBoundingClientRect().top - navH
      scrollEl.scrollTo({ top, behavior: 'smooth' })
    } else {
      const top = window.scrollY + el.getBoundingClientRect().top - navH
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

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
      className={`relative z-50 transition-colors duration-500 md:fixed md:inset-x-0 md:top-0 ${
        solid ? 'text-ink' : 'text-white'
      }`}
    >
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: solid ? 1 : 0,
          filter: solid ? 'blur(0px)' : 'blur(14px)',
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="navbar-tear pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 sm:px-9">
        <a href="/" onClick={(e) => scrollTo(e, onProjects ? '/' : 'top')} className="flex items-center">
          <Logo height={46} className={solid ? 'text-ink' : 'text-white'} />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={`#${l.target}`}
              onClick={(e) => scrollTo(e, l.target)}
              className={`text-base fw-500 transition-colors ${
                solid
                  ? 'text-ink/70 hover:text-ink'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://bagibagi.co/Axzy"
            target="_blank"
            rel="noopener noreferrer"
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
              solid ? 'bg-black/5 ring-black/10' : 'bg-white/10 ring-white/20'
            }`}
            aria-label="Menu"
          >
            <Bi name={open ? 'x-lg' : 'list'} className="text-xl" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden px-5 text-ink md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
                hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col pb-10"
            >
              {links.map((l) => (
                <motion.a
                  key={l.label}
                  href={`#${l.target}`}
                  onClick={(e) => scrollTo(e, l.target)}
                  variants={{
                    hidden: { opacity: 0, y: -14, filter: 'blur(6px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block rounded-2xl px-1 py-2.5 text-2xl fw-700 tracking-tight transition-colors hover:text-brand"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="https://bagibagi.co/Axzy"
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: -14, filter: 'blur(6px)' },
                  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="btn btn-dark mt-3 w-full justify-center"
              >
                Support <Bi name="arrow-up-short" className="rotate-45 text-lg" />
              </motion.a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
