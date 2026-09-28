interface ProgressRingProps {
  percentage: number
  size: number
  strokeWidth?: number
}

export default function ProgressRing({ percentage, size, strokeWidth = 4 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        className="progress-arc"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#2563eb"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="rotate-90"
        style={{ transform: `rotate(90deg) translate(0px, -${size / 2}px)`, transformOrigin: 'center' }}
        fontSize={size * 0.22}
        fill="#111827"
      >
        {percentage}%
      </text>
    </svg>
  )
}
