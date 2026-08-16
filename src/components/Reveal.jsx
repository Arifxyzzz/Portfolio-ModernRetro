import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

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
