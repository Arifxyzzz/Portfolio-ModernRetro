import { motion } from 'motion/react'
import Logo from './Logo'
import { Bi } from './Icons'
import Reveal from './Reveal'

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]
const SOCIAL = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
]

const FooterCol = ({ title, items, external = false }) => (
  <div>
    <p className="mb-3.5 text-[15px] fw-700 uppercase tracking-[0.14em] text-ink/45">{title}</p>
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it.label}>
          <a
            href={it.href}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="group inline-flex items-center gap-1 text-[15px] fw-600 text-ink/70 transition-colors hover:text-ink"
          >
            {it.label}
            {external && (
              <Bi
                name="arrow-up-short"
                className="rotate-45 text-base text-brand transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default function Footer() {
  return (
    <footer className="relative bg-paper">
      <div className="bg-paper text-ink">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 pb-10 pt-9 sm:px-9 md:flex-row md:items-start md:justify-between">
          <Reveal as="div" y={24} blur={10} amount={0.5} className="max-w-sm">
            <a href="#top" className="block leading-none -ml-3">
              <Logo height={42} className="text-ink" />
            </a>
            <p className="mt-4 text-[15px] fw-400 leading-relaxed text-ink/55">
              Whether you're building a Roblox game, growing a community, or launching a brand,
              AxzyCreative turns rough ideas into clean UI, scripts, and visual systems.
            </p>
          </Reveal>

          <Reveal as="div" y={24} blur={10} delay={0.1} amount={0.5} className="flex gap-16 pr-0 sm:gap-24 md:pr-28 lg:pr-36">
            <FooterCol title="Navigation" items={NAV} />
            <FooterCol title="Social" items={SOCIAL} external />
          </Reveal>
        </div>

      </div>

      <div className="footer-tear text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3 px-6 pb-6 pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-9">
          <p className="text-[15px] fw-400 text-white/45">
            © 2026 AxzyCreative. All Rights Reserved.
          </p>
          <p className="text-[15px] fw-400 text-white/45">
            Powered by <span className="fw-600 text-white/85">Axzy Studio.</span>
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1400px] justify-end px-6 sm:px-9">
          <div className="-translate-y-1/2">
            <motion.div
              role="img"
              aria-label="Available on Project"
              draggable="false"
              drag
              dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.04 }}
              style={{
                backgroundImage: "url('/AvaliableOnProject.svg')",
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              className="pointer-events-auto aspect-square w-40 cursor-grab select-none drop-shadow-xl transition-[filter] duration-300 hover:drop-shadow-2xl active:cursor-grabbing sm:w-44 md:w-48"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
