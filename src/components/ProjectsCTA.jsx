import { motion } from 'motion/react'
import { Bi } from './Icons'
import { navigate } from '../use-route'

const EASE = [0.22, 1, 0.36, 1]

export default function ProjectsCTA() {
  return (
    <section className="relative px-6 pb-12 pt-16 sm:px-9 sm:pb-16 sm:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative rounded-[2.5rem] rounded-br-[5rem] bg-paper p-8 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.5)] sm:p-14"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[640px]">
              <p className="mb-3 text-sm fw-600 uppercase tracking-[0.28em] text-brand">
                All Projects
              </p>
              <h3 className="font-jakarta text-3xl fw-800 leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl">
                Explore the full<br className="hidden sm:block" /> collection of works.
              </h3>
              <p className="mt-4 max-w-[520px] text-base fw-400 leading-relaxed text-ink/60 sm:text-lg">
                From Roblox UI and graphic design to scripting, 
                everything is on the project page.
              </p>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="group inline-flex shrink-0 items-stretch overflow-hidden rounded-2xl bg-ink text-base fw-600 leading-none shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_16px_28px_rgba(0,0,0,0.4)]"
            >
              <span className="flex items-center whitespace-nowrap py-4 pl-6 pr-5 text-white">
                See all projects
              </span>
              <span className="-my-px -mr-px flex aspect-square w-14 shrink-0 items-center justify-center bg-lime text-ink">
                <Bi
                  name="arrow-up-short"
                  className="rotate-45 text-2xl leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
