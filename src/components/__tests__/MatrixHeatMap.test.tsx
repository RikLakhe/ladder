import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getTrack } from '@/lib/content'
import MatrixHeatMap from '../MatrixHeatMap'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-1: MatrixHeatMap renders 30 heat cells for dev track', () => {
  it('renders exactly 30 data-testid=heat-cell elements (5 domains × 6 levels)', () => {
    const devTrack = getTrack('dev')!
    render(<MatrixHeatMap track={devTrack} />)
    const cells = screen.getAllByTestId('heat-cell')
    expect(cells).toHaveLength(30)
  })
})

describe('B-2: Current-level column shows "You" badge', () => {
  it('renders exactly one "You" badge and its column header has data-level matching currentLevel', () => {
    useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p3' })
    const devTrack = getTrack('dev')!
    render(<MatrixHeatMap track={devTrack} />)
    const badges = screen.getAllByText('You')
    expect(badges).toHaveLength(1)
    const th = badges[0].closest('[data-level]')
    expect(th?.getAttribute('data-level')).toBe('p3')
  })
})

describe('B-3: Live cells have links; coming-soon cells do not', () => {
  it('coming-soon domain cells have no <a> element; live domain cells have <a> with href', () => {
    const qaTrack = getTrack('qa')!
    const { container } = render(<MatrixHeatMap track={qaTrack} />)
    // qa track last domain is comingSoon: true (technical-skill)
    // Find all rows in tbody
    const rows = container.querySelectorAll('tbody tr')
    // Last row = technical-skill (comingSoon)
    const lastRow = rows[rows.length - 1]
    const comingSoonCells = lastRow.querySelectorAll('[data-testid="heat-cell"]')
    comingSoonCells.forEach((cell) => {
      expect(cell.closest('a')).toBeNull()
    })
    // First row = delivery (live)
    const firstRow = rows[0]
    const liveCells = firstRow.querySelectorAll('[data-testid="heat-cell"]')
    liveCells.forEach((cell) => {
      const anchor = cell.closest('a')
      expect(anchor).not.toBeNull()
      expect(anchor?.getAttribute('href')).toMatch(/^\/qa\/delivery/)
    })
  })
})
