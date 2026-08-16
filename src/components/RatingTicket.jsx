import { motion } from 'motion/react'

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

export default function RatingTicket() {
  return (
    <section className="overflow-hidden bg-ticket text-white">
      <div className="relative mx-auto flex max-w-[1400px] items-stretch pl-6 sm:pl-9">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-1 flex-col items-start gap-10 py-16 pr-6 sm:py-24 sm:pr-14 md:flex-row md:items-center md:justify-between md:gap-12 md:pr-10"
        >
          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="max-w-[15ch] font-jakarta text-[2.25rem] fw-600 leading-[1.08] tracking-tight text-white sm:text-6xl md:text-[4.25rem]">
              I don&rsquo;t just design visuals. I craft experiences.
            </h3>
            <div className="flex gap-2 sm:gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.4, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 }}
                  className="inline-flex"
                >
                  <Star className="h-10 w-10 sm:h-15 sm:w-15" />
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="flex shrink-0 flex-col items-start text-left md:items-end md:text-right"
          >
            <span className="font-display text-7xl leading-none text-white sm:text-8xl">4.5</span>
            <span className="mt-4 font-jakarta text-2xl fw-500 leading-tight text-lime sm:text-3xl">
              Customer
              <br />
              Rating
            </span>
          </motion.div>
        </motion.div>

        <div className="ticket-tear relative flex w-16 shrink-0 items-center justify-center pl-3 sm:w-52 sm:pl-4">
          <span
            className="hidden font-display tracking-tight text-ticket sm:block sm:text-8xl"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            #027
          </span>
        </div>

        <div aria-hidden="true" className="absolute inset-y-0 left-full w-screen bg-white" />
      </div>
    </section>
  )
}
