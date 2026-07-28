// Wrapper tipis untuk Bootstrap Icons (font sudah di-import di main.jsx).
// Pemakaian: <Bi name="arrow-up-right" className="text-lg" />
export function Bi({ name, className = '' }) {
  return <i className={`bi bi-${name} ${className}`} aria-hidden="true" />
}

// Shortcut yang sering dipakai supaya markup lebih enak dibaca.
export const IconArrow = (p) => <Bi name="arrow-up-right" {...p} />
export const IconArrowDown = (p) => <Bi name="arrow-down" {...p} />
export const IconGithub = (p) => <Bi name="github" {...p} />
export const IconDiscord = (p) => <Bi name="discord" {...p} />
export const IconStar = (p) => <Bi name="star-fill" {...p} />
export const IconSpark = (p) => <Bi name="stars" {...p} />
export const IconCheck = (p) => <Bi name="check-lg" {...p} />
export const IconQuote = (p) => <Bi name="quote" {...p} />
