import { motion } from 'motion/react'
import { Bi } from './Icons'

const EASE = [0.22, 1, 0.36, 1]

const Star = ({ className = '' }) => (
  <span
    aria-hidden="true"
    className={`inline-block bg-lime ${className}`}
    style={{
      WebkitMask: "url('/icons/Star.svg') center / contain no-repeat",
      mask: "url('/icons/Star.svg') center / contain no-repeat",
    }}
  />
)

const SKILLS = [
  'SCRIPTING',
  'GRAPHIC DESIGN',
  'UI DESIGN',
  'VISUAL DESIGN',
  'ROBLOX',
]

const CONTACTS = [
  { label: 'Github', icon: 'github', href: '' },
  { label: 'Discord', icon: 'discord', href: 'https://discordapp.com/users/1064350742980337735' },
]

const MarqueeRow = () => (
  <div className="flex shrink-0 items-center gap-8 pr-8">
    {SKILLS.map((s) => (
      <span key={s} className="flex items-center gap-8">
        <span className="font-display text-lg text-white/90 sm:text-xl">{s}</span>
        <Star className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
    ))}
  </div>
)

export default function LetsBuildIt() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden text-white"
    >
      <div className="mx-auto max-w-[1400px] px-6 pb-0 pt-24 sm:px-9 sm:pt-28">
        <div className="flex flex-col gap-12 md:flex-row md:items-stretch md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: 'blur(18px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-display text-[13vw] leading-[0.92] tracking-tight md:text-[7.5vw]"
          >
            <span className="block">LET&apos;S</span>
            <span className="block text-lime">BUILD IT.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
            className="flex flex-col md:-mt-2 md:items-end md:justify-between md:text-right"
          >
            <p className="text-xl fw-400 leading-relaxed text-white/100 sm:text-2xl">
              Reach me directly through
              <br className="hidden sm:block" /> GitHub or Discord
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:mt-0 md:justify-end">
              {CONTACTS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.1 }}
                  className="group inline-flex shrink-0 items-stretch overflow-hidden rounded-2xl bg-ink text-sm fw-600 leading-none shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] sm:text-base"
                >
                  <span className="flex aspect-square w-11 shrink-0 items-center justify-center self-stretch rounded-2xl rounded-tr-none bg-lime text-ink sm:w-auto">
                    <Bi name={c.icon} className="text-xl leading-none sm:text-2xl" />
                  </span>
                  <span className="flex shrink-0 items-center whitespace-nowrap py-3.5 pl-4 pr-6 sm:py-4 sm:pl-5 sm:pr-12">{c.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mt-20 flex overflow-hidden border-b border-white/15 py-4">
        <div className="animate-marquee flex min-w-full shrink-0 items-center">
          <MarqueeRow />
          <MarqueeRow />
        </div>
        <div className="animate-marquee flex min-w-full shrink-0 items-center" aria-hidden="true">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>
    </section>
  )
}
