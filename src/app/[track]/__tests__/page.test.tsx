import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import TrackOverview from '../TrackOverview'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getTrack } from '@/lib/content'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-4: track overview — dev track domain cards', () => {
  it('renders exactly 5 domain cards for dev track', () => {
    const track = getTrack('dev')!
    render(<TrackOverview track={track} />)
    const cards = screen.getAllByTestId('domain-card')
    expect(cards).toHaveLength(5)
  })

  it('non-coming-soon domain cards contain a progress ring', () => {
    const track = getTrack('dev')!
    render(<TrackOverview track={track} />)
    const rings = screen.getAllByTestId('progress-ring')
    expect(rings.length).toBeGreaterThan(0)
  })

  it('non-coming-soon domain cards are wrapped in a link to /{track}/{domain}', () => {
    const track = getTrack('dev')!
    render(<TrackOverview track={track} />)
    const details = document.querySelector('details')!
    const domainLinks = within(details).getAllByRole('link')
    expect(domainLinks.length).toBeGreaterThan(0)
    domainLinks.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^\/dev\//)
    })
  })
})

describe('B-4: track overview — qa track coming-soon card', () => {
  it('shows "Coming soon" badge on technical-skill card', () => {
    const track = getTrack('qa')!
    render(<TrackOverview track={track} />)
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })

  it('coming-soon card has no link', () => {
    const track = getTrack('qa')!
    render(<TrackOverview track={track} />)
    // Scope to <details> — only domain card links, not heat-map links
    const details = document.querySelector('details')!
    const domainLinks = within(details).getAllByRole('link')
    expect(domainLinks).toHaveLength(4)
    domainLinks.forEach((link) => {
      expect(link.getAttribute('href')).not.toContain('technical-skill')
    })
  })

  it('coming-soon card has no progress ring', () => {
    const track = getTrack('qa')!
    render(<TrackOverview track={track} />)
    // 4 non-coming-soon domains should each have a ring
    const rings = screen.getAllByTestId('progress-ring')
    expect(rings).toHaveLength(4)
  })
})

describe('B-T2: TrackOverview composition — MatrixHeatMap + Workshop link + details disclosure', () => {
  it('renders 30 heat cells from MatrixHeatMap for dev track', () => {
    const track = getTrack('dev')!
    render(<TrackOverview track={track} />)
    const cells = screen.getAllByTestId('heat-cell')
    expect(cells).toHaveLength(30)
  })

  it('renders "Start Workshop" link', () => {
    const track = getTrack('dev')!
    render(<TrackOverview track={track} />)
    expect(screen.getByText('Start Workshop')).toBeInTheDocument()
  })

  it('domain cards are inside a <details> disclosure element', () => {
    const track = getTrack('dev')!
    render(<TrackOverview track={track} />)
    const details = document.querySelector('details')!
    expect(details).not.toBeNull()
    const cards = within(details).getAllByTestId('domain-card')
    expect(cards).toHaveLength(5)
  })
})

describe('B-5: domain progress calculation', () => {
  it('renders 0% progress rings with no assessments', () => {
    const track = getTrack('dev')!
    render(<TrackOverview track={track} />)
    const rings = screen.getAllByTestId('progress-ring')
    rings.forEach((ring) => {
      expect(ring.textContent).toBe('0%')
    })
  })

  it('renders correct percentage when criteria are checked', () => {
    const track = getTrack('dev')!
    // Get first competency in leadership domain to check a criterion
    const leadershipDomain = track.domains.find((d) => d.id === 'leadership')!
    const competency = leadershipDomain.competencies[0]
    const level = competency.levels.find((l) => l.level === 'p3')!
    const criterionId = level.criteria[0].id

    useLadderStore.setState({
      ...DEFAULT_STATE,
      currentLevel: 'p3',
      assessments: {
        [`dev/leadership/${competency.id}`]: {
          criteriaChecked: [criterionId],
          updatedAt: new Date().toISOString(),
        },
      },
    })

    render(<TrackOverview track={track} />)
    // At least one ring should show > 0%
    const rings = screen.getAllByTestId('progress-ring')
    const percentages = rings.map((r) => parseInt(r.textContent ?? '0'))
    expect(percentages.some((p) => p > 0)).toBe(true)
  })
})
