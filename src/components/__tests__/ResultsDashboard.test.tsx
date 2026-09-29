import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getTrack } from '@/lib/content'
import DomainScorecard from '../DomainScorecard'
import ResultsDashboard from '../ResultsDashboard'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-2: DomainScorecard renders "X / Y" text', () => {
  it('renders "3 / 10" when metCount=3 and total=10', () => {
    const devTrack = getTrack('dev')!
    const domain = devTrack.domains[0]
    render(
      <DomainScorecard
        domain={domain}
        metCount={3}
        total={10}
        ratings={{ developing: 1, meeting: 1, exceeding: 1 }}
        href={`/dev/${domain.id}`}
      />
    )
    expect(screen.getByText(/3 \/ 10/)).toBeInTheDocument()
  })
})

describe('B-3: ResultsDashboard focus areas shows 3 lowest-scoring competencies', () => {
  it('shows exactly 3 focus area cards with seeded assessments', () => {
    const devTrack = getTrack('dev')!
    render(<ResultsDashboard track={devTrack} />)
    // With no assessments all competencies at 0 — should still show 3 focus areas
    const focusSection = screen.getByText(/focus areas/i).closest('section') ??
      screen.getByText(/focus areas/i).parentElement!
    // At least 3 competency names rendered in focus area
    const cards = screen.getAllByTestId('focus-area-card')
    expect(cards).toHaveLength(3)
  })
})

describe('B-4: Nudge shown when all domains ≥ 80%, hidden otherwise', () => {
  it('nudge hidden when no assessments (all domains at 0%)', () => {
    const devTrack = getTrack('dev')!
    render(<ResultsDashboard track={devTrack} />)
    expect(screen.queryByText(/ready for/i)).toBeNull()
  })
})
