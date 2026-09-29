'use client'

interface DataPoint {
  domain: string
  pct: number
}

interface Props {
  data: DataPoint[]
}

const SIZE = 200
const CENTER = SIZE / 2
const RADIUS = 80
const LABEL_RADIUS = RADIUS + 20

function polarToCartesian(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  }
}

export default function RadarChartSmall({ data }: Props) {
  const hasData = data.some((d) => d.pct > 0)
  if (!hasData) return null

  const n = data.length
  const angleStep = 360 / n

  const outerPoints = data.map((_, i) => polarToCartesian(i * angleStep, RADIUS))
  const dataPoints = data.map((d, i) => polarToCartesian(i * angleStep, (d.pct / 100) * RADIUS))

  const outerPath = outerPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-label="Skill radar chart"
    >
      {/* Background polygon */}
      <path d={outerPath} fill="none" stroke="#e2e8f0" strokeWidth={1} />
      {/* Data polygon */}
      <path d={dataPath} fill="#038E43" fillOpacity={0.2} stroke="#038E43" strokeWidth={1.5} />
      {/* Axis lines */}
      {outerPoints.map((p, i) => (
        <line key={i} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth={1} />
      ))}
      {/* Labels */}
      {data.map((d, i) => {
        const pos = polarToCartesian(i * angleStep, LABEL_RADIUS)
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fill="#475569"
          >
            {d.domain}
          </text>
        )
      })}
    </svg>
  )
}
