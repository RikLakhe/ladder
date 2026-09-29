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
