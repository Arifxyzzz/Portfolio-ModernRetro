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

// mode statis untuk verifikasi headless: ?static
const params = new URLSearchParams(window.location.search)
const STATIC = params.has('static')
if (STATIC) document.documentElement.setAttribute('data-static', '')

export default function App() {
  const simpleBarRef = useRef(null)
  // ref ke elemen scroll dalam SimpleBar; disediakan ke context setelah mount
  const [scrollEl, setScrollEl] = useState(null)

  useEffect(() => {
    // getScrollElement() = div yang beneran nge-scroll di dalam SimpleBar
    const el = simpleBarRef.current?.getScrollElement?.()
    if (el) setScrollEl(el)
  }, [])

  return (
    <MotionConfig reducedMotion={STATIC ? 'always' : 'never'}>
      <ScrollContext.Provider value={scrollEl}>
        <SimpleBar
          ref={simpleBarRef}
          // normal: kunci tinggi 1 layar biar konten nge-scroll di dalam.
          // static (headless screenshot): tinggi auto biar full-page ke-capture.
          className={STATIC ? '' : 'h-screen'}
          // selalu tampil (auto-hide dimatiin)
          autoHide={false}
        >
          <Navbar />
          <main>
            <Hero />
            {/* About + Services: dua kartu numpuk (about gelap, services putih),
                di antara Hero & Portfolio. */}
            <AboutServices />
            {/* Section Portfolio: struktur 4 layer kaya Hero (bg+spotlight,
                title, objek, line) tapi teks lebih kecil & warna gelap. */}
            <Portfolio />
            {/* Testimoni + Lets Build It berbagi SATU background grid biru
                (wrapper) biar garis grid-nya nyatu/menerus, ga dobel di batas. */}
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
