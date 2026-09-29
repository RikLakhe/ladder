interface DataPoint {
  domain: string
  metPct: number
  exceedingPct: number
}

interface Props {
  data: DataPoint[]
}

const SIZE = 240
const CENTER = SIZE / 2
const RADIUS = 90
const LABEL_RADIUS = RADIUS + 22

function polarToCartesian(angleDeg: number, r: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) }
}

function toPoints(data: DataPoint[], pctKey: 'metPct' | 'exceedingPct'): string {
  const n = data.length
  return data
    .map((d, i) => {
      const { x, y } = polarToCartesian((i * 360) / n, (d[pctKey] / 100) * RADIUS)
      return `${x},${y}`
    })
    .join(' ')
}

function toOuterPoints(n: number): string {
  return Array.from({ length: n }, (_, i) => {
    const { x, y } = polarToCartesian((i * 360) / n, RADIUS)
    return `${x},${y}`
  }).join(' ')
}

export default function RadarChart({ data }: Props) {
  const n = data.length

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-label="Skill radar chart"
    >
      {/* Outer grid */}
      <path
        d={toOuterPoints(n).split(' ').map((p, i) => `${i === 0 ? 'M' : 'L'}${p}`).join(' ') + ' Z'}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={1}
      />
      {/* Axis lines */}
      {data.map((_, i) => {
        const { x, y } = polarToCartesian((i * 360) / n, RADIUS)
        return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="#e2e8f0" strokeWidth={1} />
      })}
      {/* Met polygon (filled) */}
      <polygon
        points={toPoints(data, 'metPct')}
        fill="#038E43"
        fillOpacity={0.25}
        stroke="#038E43"
        strokeWidth={1.5}
      />
      {/* Exceeding polygon (outline) */}
      <polygon
        points={toPoints(data, 'exceedingPct')}
        fill="none"
        stroke="#3EB474"
        strokeWidth={1.5}
        strokeDasharray="4 2"
      />
      {/* Axis labels */}
      {data.map((d, i) => {
        const { x, y } = polarToCartesian((i * 360) / n, LABEL_RADIUS)
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={9}
            fill="#475569"
          >
            {d.domain}
          </text>
        )
      })}
    </svg>
  )
}
