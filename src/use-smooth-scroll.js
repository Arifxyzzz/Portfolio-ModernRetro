import { useEffect } from 'react'

const LERP = 0.09
const MULT = 1.0
const SNAP = 0.4

export function useSmoothScroll(el, enabled = true) {
  useEffect(() => {
    if (!el || !enabled) return
    if (!window.matchMedia('(any-pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let target = el.scrollTop
    let pos = el.scrollTop
    let raf = 0
    let animating = false
    let ditulis = null

    const max = () => el.scrollHeight - el.clientHeight

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      animating = false
      ditulis = null
    }

    const yieldTo = () => {
      stop()
      target = pos = el.scrollTop
    }

    const tick = () => {
      if (ditulis !== null && Math.abs(el.scrollTop - ditulis) > 1) {
        yieldTo()
        return
      }
      pos += (target - pos) * LERP
      if (Math.abs(target - pos) < SNAP) pos = target
      el.scrollTop = pos
      ditulis = el.scrollTop
      if (pos === target) {
        animating = false
        raf = 0
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (animating) return
      animating = true
      raf = requestAnimationFrame(tick)
    }

    const onWheel = (e) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      let node = e.target
      while (node && node !== el) {
        if (node.scrollHeight > node.clientHeight + 1) {
          const oy = getComputedStyle(node).overflowY
          if (oy === 'auto' || oy === 'scroll') return
        }
        node = node.parentElement
      }

      e.preventDefault()
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientHeight : 1
      if (!animating) {
        target = pos = el.scrollTop
        ditulis = el.scrollTop
      }
      target = Math.max(0, Math.min(max(), target + e.deltaY * unit * MULT))
      start()
    }

    const onScroll = () => {
      if (!animating) target = pos = el.scrollTop
    }

    const onIntent = () => yieldTo()

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerdown', onIntent, { capture: true, passive: true })
    document.addEventListener('keydown', onIntent, { capture: true, passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerdown', onIntent, { capture: true })
      document.removeEventListener('keydown', onIntent, { capture: true })
      cancelAnimationFrame(raf)
    }
  }, [el, enabled])
}
