import { useRef, useState, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import SimpleBar from 'simplebar-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutServices from './components/AboutServices'
import Portfolio from './components/Portfolio'
import RatingTicket from './components/RatingTicket'
import Testimonials from './components/Testimonials'
import ProjectsCTA from './components/ProjectsCTA'
import LetsBuildIt from './components/LetsBuildIt'
import Footer from './components/Footer'
import Projects from './components/Projects'
import { ScrollContext } from './scroll-context'
import { useSmoothScroll } from './use-smooth-scroll'
import { useRoute } from './use-route'

const params = new URLSearchParams(window.location.search)
const STATIC = params.has('static')
if (STATIC) document.documentElement.setAttribute('data-static', '')

export default function App() {
  const simpleBarRef = useRef(null)
  const [scrollEl, setScrollEl] = useState(null)
  const path = useRoute()
  const isProjects = path.startsWith('/projects')

  useEffect(() => {
    const el = simpleBarRef.current?.getScrollElement?.()
    if (el) setScrollEl(el)
  }, [])

  useEffect(() => {
    const el = simpleBarRef.current?.getScrollElement?.()
    const hash = window.location.hash.slice(1)
    if (hash && !isProjects) {
      requestAnimationFrame(() => {
        const target = document.getElementById(hash)
        if (!target) return
        const navH = window.innerWidth < 768 ? 0 : 94
        if (el) {
          const top = el.scrollTop + target.getBoundingClientRect().top - navH
          el.scrollTo({ top, behavior: 'smooth' })
        } else {
          const top = window.scrollY + target.getBoundingClientRect().top - navH
          window.scrollTo({ top, behavior: 'smooth' })
        }
        history.replaceState(null, '', window.location.pathname)
      })
      return
    }
    if (el) el.scrollTop = 0
    else window.scrollTo({ top: 0 })
  }, [path, isProjects])

  useSmoothScroll(scrollEl, !STATIC)

  return (
    <MotionConfig reducedMotion={STATIC ? 'always' : 'never'}>
      <ScrollContext.Provider value={scrollEl}>
        <SimpleBar
          ref={simpleBarRef}
          className={STATIC ? '' : 'h-screen'}
          autoHide={false}
        >
          <Navbar route={path} />
          {isProjects ? (
            <Projects />
          ) : (
            <main>
              <Hero />
              <AboutServices />
              <Portfolio />
              <div className="grid-blue">
                <RatingTicket />
                <Testimonials />
                <ProjectsCTA />
                <LetsBuildIt />
              </div>
            </main>
          )}
          <Footer />
        </SimpleBar>
      </ScrollContext.Provider>
    </MotionConfig>
  )
}
