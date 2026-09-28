import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressRing from '../ProgressRing'

describe('B-1: ProgressRing renders visible percentage text', () => {
  it('renders "75%" text at percentage=75', () => {
    render(<ProgressRing percentage={75} size={64} />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('renders "0%" text at percentage=0', () => {
    render(<ProgressRing percentage={0} size={64} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})

describe('B-2: ProgressRing SVG arc strokeDashoffset', () => {
  it('strokeDashoffset equals full circumference at percentage=0', () => {
    const { container } = render(<ProgressRing percentage={0} size={64} />)
    const circle = container.querySelector('circle.progress-arc')!
    const r = parseFloat(circle.getAttribute('r') ?? '0')
    const circumference = 2 * Math.PI * r
    const offset = parseFloat(circle.getAttribute('stroke-dashoffset') ?? '0')
    expect(offset).toBeCloseTo(circumference, 1)
  })

  it('strokeDashoffset equals 0 at percentage=100', () => {
    const { container } = render(<ProgressRing percentage={100} size={64} />)
    const circle = container.querySelector('circle.progress-arc')!
    const offset = parseFloat(circle.getAttribute('stroke-dashoffset') ?? '1')
    expect(offset).toBeCloseTo(0, 1)
  })
})

describe('B-3: ProgressRing strokeWidth default', () => {
  it('defaults strokeWidth to 4 when not provided', () => {
    const { container } = render(<ProgressRing percentage={50} size={64} />)
    const circle = container.querySelector('circle.progress-arc')!
    expect(circle.getAttribute('stroke-width')).toBe('4')
  })

  it('uses explicit strokeWidth when provided', () => {
    const { container } = render(<ProgressRing percentage={50} size={64} strokeWidth={8} />)
    const circle = container.querySelector('circle.progress-arc')!
    expect(circle.getAttribute('stroke-width')).toBe('8')
  })
})
