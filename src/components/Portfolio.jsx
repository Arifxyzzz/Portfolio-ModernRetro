import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useContext, Fragment } from 'react'
import { ScrollContext } from '../scroll-context'
import { useIsMobile } from '../use-is-mobile'

const EASE = [0.22, 1, 0.36, 1]

const SplitTitle = ({ text, className = '', delay = 0, step = 0.05, breaks = [] }) => (
  <span className={`title-lines mx-auto flex justify-between ${className}`}>
    {text.split('').map((ch, i) => (
      <Fragment key={i}>
        {breaks
          .filter((b) => b.at === i)
          .map((b) => (
            <i key={b.at + b.cls} aria-hidden="true" className={`title-br ${b.cls}`} />
          ))}
        <motion.span
          className="inline-block shrink-0"
          initial={{ opacity: 0, y: '0.18em', filter: 'blur(24px)', scale: 1.06 }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE, delay: delay + i * step }}
        >
          {ch}
        </motion.span>
      </Fragment>
    ))}
  </span>
)

const BREAKS = [
  { at: 3, cls: 'br-xs' },
  { at: 4, cls: 'br-sm' },
  { at: 6, cls: 'br-xs' },
]

const TitleStack = () => (
  <h2 className="font-display leading-[0.82]">
    <SplitTitle
      text="PORTFOLIO"
      delay={0.15}
      breaks={BREAKS}
      className="w-[3.07em] text-[27vw] sm:w-[4.19em] sm:text-[19vw]"
    />
  </h2>
)

export default function Portfolio() {
  const ref = useRef(null)
  const scrollEl = useContext(ScrollContext)
  const isMobile = useIsMobile()
  const isNarrow = useIsMobile(639)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollEl ? { current: scrollEl } : undefined,
    offset: ['start end', 'end start'],
  })
  const yTitle = useTransform(scrollYProgress, [0, 1], [60, -60])
  const yObjek = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yGhostRaw = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const yGhost = isMobile ? 0 : yGhostRaw

  const stackBox =
    'pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center px-5 text-center'

  return (
    <section
      id="work"
      ref={ref}
      className="grid-blue relative flex min-h-[80svh] flex-col overflow-hidden text-white sm:min-h-screen"
    >
      <motion.span
        aria-hidden="true"
        style={{ y: yGhost }}
        className="text-hairline pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[38vw] leading-none"
      >
        2727
      </motion.span>

      <motion.div style={{ y: yTitle }} className={`${stackBox} z-10`}>
        <TitleStack />
      </motion.div>

      <motion.div
        style={{ y: yObjek }}
        className="pointer-events-none absolute inset-x-0 bottom-[33%] z-20 mx-auto h-[30%] w-full select-none [filter:drop-shadow(14px_18px_10px_rgba(2,6,32,0.45))_drop-shadow(34px_44px_40px_rgba(2,6,32,0.32))] sm:bottom-[22%] sm:h-[32%] lg:bottom-[30%] lg:h-[44%]"
      >
        <motion.img
          src="/Object-2.webp"
          alt="AXZY portfolio"
          draggable="false"
          decoding="async"
          loading="lazy"
          style={{ willChange: 'transform' }}
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{ scale: isNarrow ? 1.35 : 1.7, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          className="h-full w-full select-none object-contain object-center"
        />
      </motion.div>

    </section>
  )
}
