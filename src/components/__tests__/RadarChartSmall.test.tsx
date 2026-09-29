import { describe, it, expect } from 'vitest'
import { render, container } from '@testing-library/react'
import RadarChartSmall from '../RadarChartSmall'

const FIVE_DOMAINS = [
  { domain: 'Delivery', pct: 0 },
  { domain: 'Leadership', pct: 0 },
  { domain: 'FCC', pct: 0 },
  { domain: 'Strategic Impact', pct: 0 },
  { domain: 'Technical Skill', pct: 0 },
]

describe('B-5: RadarChartSmall hidden when all pct=0', () => {
  it('renders no SVG when all percentages are 0', () => {
    const { container: c } = render(<RadarChartSmall data={FIVE_DOMAINS} />)
    expect(c.querySelector('svg')).toBeNull()
  })
})

describe('B-5: RadarChartSmall renders SVG with 5 text labels when ≥1 pct > 0', () => {
  it('renders SVG with exactly 5 <text> elements when ≥1 pct > 0', () => {
    const data = [...FIVE_DOMAINS]
    data[0] = { domain: 'Delivery', pct: 60 }
    const { container: c } = render(<RadarChartSmall data={data} />)
    const svg = c.querySelector('svg')
    expect(svg).not.toBeNull()
    const labels = c.querySelectorAll('text')
    expect(labels).toHaveLength(5)
  })
})
