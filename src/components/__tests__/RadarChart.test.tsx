import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import RadarChart from '../RadarChart'

const FIVE_DOMAINS = [
  { domain: 'Delivery', metPct: 0, exceedingPct: 0 },
  { domain: 'Leadership', metPct: 0, exceedingPct: 0 },
  { domain: 'FCC', metPct: 0, exceedingPct: 0 },
  { domain: 'Strategic Impact', metPct: 0, exceedingPct: 0 },
  { domain: 'Technical Skills', metPct: 0, exceedingPct: 0 },
]

describe('B-1: RadarChart renders SVG with 5 axis labels and 2 polygons', () => {
  it('renders an SVG with 5 <text> labels and exactly 2 <polygon> elements', () => {
    const { container } = render(<RadarChart data={FIVE_DOMAINS} />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    const labels = container.querySelectorAll('text')
    expect(labels).toHaveLength(5)
    const polygons = container.querySelectorAll('polygon')
    expect(polygons).toHaveLength(2)
  })

  it('axis labels match provided domain names', () => {
    const { container } = render(<RadarChart data={FIVE_DOMAINS} />)
    const labels = Array.from(container.querySelectorAll('text')).map((el) => el.textContent)
    expect(labels).toContain('Delivery')
    expect(labels).toContain('Technical Skills')
  })
})
