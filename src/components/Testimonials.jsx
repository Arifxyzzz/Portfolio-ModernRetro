import { motion } from 'motion/react'
import { Bi } from './Icons'

const EASE = [0.22, 1, 0.36, 1]

const ITEMS = [
  { name: 'SZ', role: 'Admin, HelsClub', text: 'UI-nya keren banget, clean dan nggak norak.', image: 'https://ugc.production.linktr.ee/af312b25-6797-4f15-8a00-f36ad9839415_Tambahkan-JudulHELS-CLUB-20251002-121754-0000.jpeg?io=true&size=avatar-v3_0' },
  { name: 'Zyrex', role: 'Customer', text: 'GUI hasil redesign-nya rapi banget dan responsif di semua device. Dipakai di berbagai screen tetap enak dilihat dan digunakan.', image: 'https://i.pinimg.com/736x/58/32/92/583292a5f8212b0942beac955c555a6c.jpg' },
  { name: 'GOAT', role: 'Owner, NovaClub', text: 'Desainnya keren, bisa menyesuaikan dengan konsep yang kupengen. Nggak terpaku satu style saja.', image: 'https://cdn.discordapp.com/avatars/556879790112768041/29aac7a44d860c554f992b66c256da24.png?size=4096' },
  { name: 'Beammmmm', role: 'Customer', text: "Besides the results being good, the process is also pleasant. Communication is clear and revisions are quick, so it's not complicated.", image: 'https://cdn.discordapp.com/avatars/381072677714132993/a_4dcfcaf785d8614085daf12a3b835a8a.gif?size=4096' },
  { name: 'Crozy!', role: 'Customer', text: "With an affordable price, the results are far above expectations. It's rare to find this kind of quality at that price.", image: 'https://i.pinimg.com/736x/95/87/10/9587104704d2d1c5d83a7dddafb4fa4d.jpg' },
  { name: 'Venus', role: 'Customer, Developer', text: 'Detail desainnya diperhatiin banget, dari layout sampai interaksi. Nggak cuma bagus, tapi juga nyaman enak diliat.', image: 'https://i.pinimg.com/1200x/18/f0/45/18f045b0936ab238ae827e9a0ee0b885.jpg' },
  { name: 'Etgamerz', role: 'Admin, VoidcraftStudio', text: 'The design is unique and pleasing to the eye, not common. The price is also affordable, but the quality is still good.', image: 'https://i.pinimg.com/736x/d1/a2/28/d1a228056590d244188f0ef3b040d4f6.jpg' },
  { name: 'Sxrlll', role: 'Customer', text: 'Desainnya bagus, hasilnya sesuai, dan prosesnya juga enak. Overall puas sih.', image: 'https://cdn.discordapp.com/avatars/637783502938570804/9c6a2e192adba1907d314bab25ce221f.png?size=4096' },
  { name: 'anmx14', role: 'Customer', text: 'The service is fast, and the response is also clear. The result meets expectations.', image: 'https://cdn.builtbybit.com/avatars/s/546/546990.jpg?1743150760' },
]

const Card = ({ t }) => (
  <figure className="relative w-[320px] shrink-0 rounded-3xl rounded-br-[3.5rem] bg-paper p-6 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]">
    <Bi name="quote" className="absolute right-4 top-4 text-3xl leading-none text-ink/45" />
    <figcaption className="mb-4 flex items-center gap-3">
      <img
        src={t.image}
        alt={t.name}
        loading="lazy"
        draggable="false"
        className="h-11 w-11 shrink-0 rounded-xl bg-ink object-cover"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] fw-700 text-ink">{t.name}</span>
        <span className="text-[11px] fw-600 uppercase tracking-[0.12em] text-ink/45">{t.role}</span>
      </span>
    </figcaption>
    <blockquote className="text-[14px] fw-400 leading-relaxed text-ink/60">{t.text}</blockquote>
  </figure>
)

const Row = ({ items }) => (
  <div className="flex shrink-0 items-stretch gap-6 pr-6">
    {items.map((t, i) => (
      <Card key={i} t={t} />
    ))}
  </div>
)

export default function Testimonials() {
  const rowA = ITEMS
  const rowB = [...ITEMS.slice(2), ...ITEMS.slice(0, 2)]

  return (
    <section className="relative overflow-hidden pb-6 pt-14 text-white sm:pt-16">
      <motion.p
        initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-4 text-center text-lg fw-500 uppercase tracking-[0.28em] text-lime"
      >
        Testimoni
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        className="mx-auto max-w-[900px] px-6 text-center font-jakarta text-3xl fw-800 leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
      >
        Kind words from people<br className="hidden sm:block" /> I&apos;ve worked with.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, filter: 'blur(16px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="relative mt-14 flex flex-col gap-8 py-10"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
          maskImage:
            'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="group flex">
          <div className="animate-marquee flex shrink-0 items-stretch group-hover:[animation-play-state:paused]">
            <Row items={rowA} />
            <Row items={rowA} />
          </div>
          <div className="animate-marquee flex shrink-0 items-stretch group-hover:[animation-play-state:paused]" aria-hidden="true">
            <Row items={rowA} />
            <Row items={rowA} />
          </div>
        </div>

        <div className="group flex">
          <div className="animate-marquee-rev flex shrink-0 items-stretch group-hover:[animation-play-state:paused]">
            <Row items={rowB} />
            <Row items={rowB} />
          </div>
          <div className="animate-marquee-rev flex shrink-0 items-stretch group-hover:[animation-play-state:paused]" aria-hidden="true">
            <Row items={rowB} />
            <Row items={rowB} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
