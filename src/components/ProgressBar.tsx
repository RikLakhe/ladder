interface ProgressBarProps {
  percentage: number
  className?: string
}

export default function ProgressBar({ percentage, className = '' }: ProgressBarProps) {
  return (
    <div className={`h-2 w-full rounded-full bg-gray-100 overflow-hidden ${className}`}>
      <div
        data-testid="progress-fill"
        className="h-full rounded-full bg-leapverse-100"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
