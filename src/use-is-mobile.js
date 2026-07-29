import { useEffect, useState } from 'react'

// true kalau viewport <= breakpoint (default 767px = di bawah `sm:` Tailwind).
// dipakai buat: navbar mobile selalu solid (logo/menu kebaca) & mematikan
// parallax background di mobile biar diem.
export function useIsMobile(maxWidth = 767) {
  const query = `(max-width: ${maxWidth}px)`
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
