import { useEffect, useState } from 'react'

export function useRoute() {
  const [path, setPath] = useState(
    typeof window === 'undefined' ? '/' : window.location.pathname
  )

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return path
}

export function navigate(to) {
  if (typeof window === 'undefined') return
  if (window.location.pathname === to) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0 })
}
