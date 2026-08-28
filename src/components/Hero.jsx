import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useContext } from 'react'
import { ScrollContext } from '../scroll-context'

const EASE = [0.22, 1, 0.36, 1]

const TitleLine = ({ children, delay = 0, stagger = 0.05, className = '' }) => (
  <span className={`block whitespace-nowrap ${className}`}>
    <span className="sr-only">{children}</span>
    {[...children].map((huruf, i) => (
      <motion.span
        key={i}
        aria-hidden="true"
        initial={{ opacity: 0, y: '-0.55em', filter: 'blur(18px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
        className="inline-block"
      >
        {huruf === ' ' ? ' ' : huruf}
      </motion.span>
    ))}
  </span>
)

const Fade = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export default function Hero() {
  const ref = useRef(null)
  const scrollEl = useContext(ScrollContext)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollEl ? { current: scrollEl } : undefined,
    offset: ['start start', 'end start'],
  })
  const yText = useTransform(scrollYProgress, [0, 1], [0, 110])

  return (
    <section
      id="top"
      ref={ref}
      className="grid-blue relative flex min-h-[72svh] items-center overflow-hidden font-jakarta text-white sm:min-h-screen"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center px-6 text-center sm:px-9">
        <motion.div style={{ y: yText }} className="flex flex-col items-center">
          <h1 className="text-[16vw] leading-[1.02] tracking-[-0.035em] sm:text-[14vw] md:text-[min(12vw,200px)]">
            <TitleLine delay={0.25} className="fw-800 italic text-lime">Axzy</TitleLine>
            <TitleLine delay={0.4} className="fw-800 text-white">Portfolio</TitleLine>
          </h1>

          <Fade delay={0.95} className="mt-6 max-w-[32ch] sm:mt-8 sm:max-w-[46ch]">
            <p className="text-base fw-500 leading-snug tracking-tight text-white/70 sm:text-xl">
              Graphic design, Roblox UI, and scripting, creating visuals that get {' '}
              <span className="fw-700 text-lime">understood</span> before anyone reads a single word.
            </p>
          </Fade>
        </motion.div>

      </div>
    </section>
  )
}
