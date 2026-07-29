import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

/* ===== REVEAL — pembungkus animasi "muncul pas viewport, ilang pas kelewat"
   =====
   inti anti-screenshot: pakai whileInView dengan once:FALSE. jadi tiap kali
   elemen KELUAR viewport, Framer Motion otomatis balikin ke state `initial`
   (blur + fade + geser) lagi. hasilnya konten cuma "utuh" pas beneran ada di
   layar — di-scroll lewat -> buyar. susah di-SS/di-copy desainnya.

   props:
   - as        : tag/elemen motion (default 'div'). contoh: 'h2', 'p', motion(Comp)
   - y         : jarak geser awal (default 40)
   - blur      : kekuatan blur awal px (default 14)
   - delay     : delay animasi
   - duration  : durasi (default 0.8)
   - amount    : porsi elemen yg harus keliatan buat trigger (default 0.3)
   - once      : override kalau butuh sekali aja (default false = bisa reveal/hide berulang)
   selain itu semua prop diteruskan ke motion.<as> (className, style, onClick, dst). */
export default function Reveal({
  as = 'div',
  children,
  y = 40,
  blur = 14,
  delay = 0,
  duration = 0.8,
  amount = 0.3,
  once = false,
  transition,
  ...rest
}) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={transition || { duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
