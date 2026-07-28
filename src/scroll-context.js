import { createContext } from 'react'

// ref ke elemen scroll SimpleBar. dipakai Hero (& komponen lain) supaya
// useScroll Framer Motion baca scroll dari container SimpleBar, bukan window.
export const ScrollContext = createContext(null)
