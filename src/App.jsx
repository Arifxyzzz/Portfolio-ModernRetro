import { useRef, useState, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import SimpleBar from 'simplebar-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutServices from './components/AboutServices'
import Portfolio from './components/Portfolio'
import RatingTicket from './components/RatingTicket'
import Testimonials from './components/Testimonials'
import LetsBuildIt from './components/LetsBuildIt'
import Footer from './components/Footer'
import { ScrollContext } from './scroll-context'
import { useSmoothScroll } from './use-smooth-scroll'

const params = new URLSearchParams(window.location.search)
const STATIC = params.has('static')
if (STATIC) document.documentElement.setAttribute('data-static', '')

export default function App() {
  const simpleBarRef = useRef(null)
  const [scrollEl, setScrollEl] = useState(null)

  useEffect(() => {
    const el = simpleBarRef.current?.getScrollElement?.()
    if (el) setScrollEl(el)
  }, [])

  useSmoothScroll(scrollEl, !STATIC)

  return (
    <MotionConfig reducedMotion={STATIC ? 'always' : 'never'}>
      <ScrollContext.Provider value={scrollEl}>
        <SimpleBar
          ref={simpleBarRef}
          className={STATIC ? '' : 'h-screen'}
          autoHide={false}
        >
          <Navbar />
          <main>
            <Hero />
            <AboutServices />
            <Portfolio />
            <div className="grid-blue">
              <RatingTicket />
              <Testimonials />
              <LetsBuildIt />
            </div>
          </main>
          <Footer />
        </SimpleBar>
      </ScrollContext.Provider>
    </MotionConfig>
  )
}
