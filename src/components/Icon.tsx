import type { CSSProperties } from 'react'

const paths = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  transfer: 'M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4',
  history: 'M4 5v5h5M4.5 10a8 8 0 1 1-.2 5M12 7v5l3 2',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8m8-7.87a4 4 0 0 1 0 7.75',
  help: 'M12 17h.01M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  back: 'M19 12H5m5-5-5 5 5 5',
  chevron: 'm9 5 7 7-7 7',
  check: 'm5 12 4 4L19 6',
  shield: 'M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7ZM8 12l3 3 5-6',
  wallet:
    'M20 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h15V8H5a3 3 0 0 1 0-5m15 9h-5v5h5m-3-2.5h.01',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12m13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  eyeOff:
    'm3 3 18 18M10.58 5.08A11 11 0 0 1 12 5c6 0 10 7 10 7a19 19 0 0 1-3 3.5M6.5 6.5A22 22 0 0 0 2 12s4 7 10 7a12 12 0 0 0 5.5-1.5',
  search: 'M21 21l-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  download: 'M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6',
  lock: 'M5 10h14v11H5ZM8 10V7a4 4 0 0 1 8 0v3m-4 5v2',
  plus: 'M12 5v14M5 12h14',
  info: 'M12 11v6m0-10h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  close: 'm6 6 12 12M6 18 18 6',
  incoming: 'M17 7 7 17M7 7v10h10',
  outgoing: 'M7 17 17 7M7 7h10v10',
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z',
  warning: 'm12 3 10 18H2ZM12 9v4m0 4h.01',
  receipt: 'M5 3v18l3-2 4 2 4-2 3 2V3Zm4 5h6m-6 4h6m-6 4h3',
  calendar: 'M8 2v4m8-4v4M3 10h18M3 5h18v17H3Z',
  fingerprint: 'M4 10A8 8 0 0 1 20 10 M12 6A4 4 0 0 0 8 10 M12 2A8 8 0 0 0 4 10 M8 14A4 4 0 0 1 16 14 M12 18A4 4 0 0 0 16 14',
  menu: 'M3 12h18 M3 6h18 M3 18h18',
  image: 'M3 5h18v14H3z M8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M21 15l-5-5L5 21'
}

export type IconName = keyof typeof paths
export function Icon({
  name,
  size = 20,
  className = '',
  style,
}: {
  name: IconName
  size?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={paths[name]} />
    </svg>
  )
}
