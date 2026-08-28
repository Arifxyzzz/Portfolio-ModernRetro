import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { Bi } from './Icons'
import { navigate } from '../use-route'

const EASE = [0.22, 1, 0.36, 1]

const PROJECTS = [
  {
    title: 'UI Redesign',
    tag: 'Roblox UI',
    client: 'SZ',
    cover: 'https://i.imgur.com/DUkGUUD.png',
    href: 'https://example.com/hels',
  },
  {
    title: 'Brand Kit',
    tag: 'Graphic Design',
    client: 'GOAT',
    cover: 'https://i.imgur.com/DUkGUUD.png',
    description:
      'Full brand kit untuk NovaClub — logo, palette, typography, dan asset sosmed. Fokus pada identitas yang konsisten di semua touchpoint.',
    gallery: [
      'https://i.imgur.com/DUkGUUD.png',
      'https://i.imgur.com/DUkGUUD.png',
      'https://i.imgur.com/DUkGUUD.png',
    ],
  },
  {
    title: 'Landing',
    tag: 'UI Design',
    client: 'Etgamerz',
    cover: 'https://i.imgur.com/DUkGUUD.png',
    href: 'https://example.com/void',
  },
  {
    title: 'Dashboard',
    tag: 'Visual Design',
    client: 'Zyrex',
    cover: 'https://i.imgur.com/DUkGUUD.png',
    description:
      'Redesign dashboard admin dengan hierarki jelas, responsive di semua device, dan komponen reusable.',
    gallery: [
      'https://i.imgur.com/DUkGUUD.png',
      'https://i.imgur.com/DUkGUUD.png',
    ],
  },
  {
    title: 'Product Page',
    tag: 'Web Design',
    client: 'Crozy!',
    cover: 'https://i.imgur.com/DUkGUUD.png',
    href: 'https://example.com/crozy',
  },
  {
    title: 'UI System',
    tag: 'Roblox UI',
    client: 'Venus',
    cover: 'https://i.imgur.com/DUkGUUD.png',
    description:
      'UI system modular untuk game Roblox — button, modal, HUD, dan inventory. Nyaman diliat, cepat diimplementasi.',
    gallery: [
      'https://i.imgur.com/DUkGUUD.png',
      'https://i.imgur.com/DUkGUUD.png',
      'https://i.imgur.com/DUkGUUD.png',
      'https://i.imgur.com/DUkGUUD.png',
    ],
  },
]

const Card = ({ p, i, onInfo }) => {
  const isHref = !!p.href
  const Tag = isHref ? motion.a : motion.button
  const props = isHref
    ? { href: p.href, target: '_blank', rel: 'noreferrer' }
    : { type: 'button', onClick: () => onInfo(p) }

  return (
    <Tag
      {...props}
      initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl rounded-br-[3.5rem] bg-paper text-left shadow-[0_18px_36px_-16px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
        <img
          src={p.cover}
          alt={p.title}
          loading="lazy"
          draggable="false"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[11px] fw-600 uppercase tracking-[0.14em] text-white backdrop-blur">
          {p.tag}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div className="min-w-0">
          <h3 className="truncate text-lg fw-700 leading-tight text-ink">{p.title}</h3>
          <p className="mt-1 text-xs fw-500 uppercase tracking-[0.18em] text-ink/45">{p.client}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime text-ink">
          {isHref ? (
            <Bi
              name="arrow-up-short"
              className="rotate-45 text-2xl leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          ) : (
            <Bi
              name="search"
              className="text-lg leading-none transition-transform duration-300 ease-out group-hover:scale-110"
            />
          )}
        </span>
      </div>
    </Tag>
  )
}

const DetailModal = ({ project, onClose }) => {
  const [idx, setIdx] = useState(0)
  const gallery = project?.gallery?.length ? project.gallery : [project?.cover]

  useEffect(() => {
    setIdx(0)
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx((v) => (v + 1) % gallery.length)
      if (e.key === 'ArrowLeft') setIdx((v) => (v - 1 + gallery.length) % gallery.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, gallery.length, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-[1100px] flex-col overflow-hidden rounded-3xl rounded-br-[4rem] bg-paper shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] md:flex-row"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/85 text-white backdrop-blur transition-colors hover:bg-black"
            >
              <Bi name="x-lg" className="text-base" />
            </button>

            <div className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden bg-ink/10 md:aspect-auto md:h-auto md:w-[58%]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={gallery[idx]}
                  alt={`${project.title} ${idx + 1}`}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-full w-full object-cover"
                  draggable="false"
                />
              </AnimatePresence>

              {gallery.length > 1 && (
                <>
                  <button
                    aria-label="Prev"
                    onClick={() => setIdx((v) => (v - 1 + gallery.length) % gallery.length)}
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-md transition hover:bg-paper"
                  >
                    <Bi name="chevron-left" className="text-base" />
                  </button>
                  <button
                    aria-label="Next"
                    onClick={() => setIdx((v) => (v + 1) % gallery.length)}
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-md transition hover:bg-paper"
                  >
                    <Bi name="chevron-right" className="text-base" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 backdrop-blur">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to ${i + 1}`}
                        onClick={() => setIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === idx ? 'w-6 bg-lime' : 'w-1.5 bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6 sm:p-8">
              <span className="w-fit rounded-full bg-ink/10 px-3 py-1 text-[11px] fw-600 uppercase tracking-[0.14em] text-ink/70">
                {project.tag}
              </span>
              <h3 className="font-jakarta text-2xl fw-800 leading-tight tracking-tight text-ink sm:text-3xl">
                {project.title}
              </h3>
              <p className="text-xs fw-500 uppercase tracking-[0.18em] text-ink/45">
                Client — {project.client}
              </p>
              <p className="text-base fw-400 leading-relaxed text-ink/70">
                {project.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)

  const back = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <main className="grid-blue relative min-h-screen overflow-hidden text-white">
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-16 sm:px-9 sm:pb-32 sm:pt-24">
        <motion.a
          href="/"
          onClick={back}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="group inline-flex items-center gap-2 text-sm fw-600 uppercase tracking-[0.2em] text-white/75 hover:text-lime"
        >
          <Bi name="arrow-left-short" className="text-2xl transition-transform group-hover:-translate-x-1" />
          Back
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(18px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="mt-8 font-display text-[16vw] leading-[0.9] tracking-tight sm:text-[11vw] md:text-[8.5vw]"
        >
          PROJECTS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-4 max-w-[620px] text-base fw-400 leading-relaxed text-white/80 sm:text-lg"
        >
          A collection of Axzy&apos;s work, ranging from Roblox UI and graphic
          design to scripting. Click on an item for more details.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Card key={p.title} p={p} i={i} onInfo={setActive} />
          ))}
        </div>
      </div>

      <DetailModal project={active} onClose={() => setActive(null)} />
    </main>
  )
}
