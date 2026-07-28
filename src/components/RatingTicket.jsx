import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/* bintang (Star.svg di-mask, warna lime) */
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
    /* dua blok full-height: gelap (kiri) & putih (kanan). sobekan = batas
       antara dua warna itu. background full-bleed, konten ikut max-w web. */
    <section className="overflow-hidden bg-ticket text-white">
      <div className="relative mx-auto flex max-w-[1400px] items-stretch pl-6 sm:pl-9">
        {/* badan gelap: heading + rating */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-1 items-center justify-between gap-8 py-24 pr-10 sm:gap-12 sm:pr-14"
        >
          {/* kiri: heading + bintang */}
          <div className="flex flex-col gap-8">
            <h3 className="max-w-[15ch] font-jakarta text-5xl fw-600 leading-[1.08] tracking-tight text-white sm:text-6xl md:text-[4.25rem]">
              I don&rsquo;t just design visuals. I craft experiences.
            </h3>
            <div className="flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-15 w-15 sm:h-15 sm:w-15" />
              ))}
            </div>
          </div>

          {/* kanan: rating (rata kanan) */}
          <div className="flex shrink-0 flex-col items-end text-right">
            <span className="font-display text-7xl leading-none text-white sm:text-8xl">4.5</span>
            <span className="mt-4 font-jakarta text-2xl fw-500 leading-tight text-lime sm:text-3xl">
              Customer
              <br />
              Rating
            </span>
          </div>
        </motion.div>

        {/* stub putih full-height — #027 vertikal (Moderniz).
            tepi KIRI-nya digigit takik (ticket-tear) = efek sobekan sama
            kaya navbar/footer. */}
        <div className="ticket-tear relative flex w-40 shrink-0 items-center justify-center pl-4 sm:w-52">
          <span
            className="font-display text-6xl tracking-tight text-ticket sm:text-8xl"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            #027
          </span>
        </div>

        {/* filler putih full-bleed ke KANAN: nempel di tepi kanan container
            (left-full) lalu ngulur w-screen sampe mentok tepi layar. ditaruh
            di LUAR stub (yg kena mask ticket-tear) biar ga ikut kepotong. */}
        <div aria-hidden="true" className="absolute inset-y-0 left-full w-screen bg-white" />
      </div>
    </section>
  )
}
