// Logo AxzyCreative dirender via CSS mask supaya warnanya ikut `currentColor`.
const RATIO = 26458.32 / 5938.16

export default function Logo({ height = 22, className = '' }) {
  return (
    <span
      role="img"
      aria-label="AxzyCreative"
      className={`inline-block bg-current align-middle ${className}`}
      style={{
        height,
        width: height * RATIO,
        maskImage: 'url(/AxzyCreative.svg)',
        WebkitMaskImage: 'url(/AxzyCreative.svg)',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskPosition: 'left center',
        WebkitMaskPosition: 'left center',
      }}
    />
  )
}
