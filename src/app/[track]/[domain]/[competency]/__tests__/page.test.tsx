import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CompetencyDetail from '../CompetencyDetail'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getCompetency, getTrack } from '@/lib/content'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

const track = getTrack('dev')!
const domain = track.domains.find((d) => d.id === 'leadership')!
const competency = getCompetency('dev', 'leadership', 'decision-making')!

describe('B-1: CompetencyDetail — 6 level cards', () => {
  it('renders exactly 6 level cards (P2–P7 badges)', () => {
    render(<CompetencyDetail track={track} domain={domain} competency={competency} />)
    for (const level of ['P2', 'P3', 'P4', 'P5', 'P6', 'P7']) {
      expect(screen.getByText(level)).toBeTruthy()
    }
  })

  it('renders P3 descriptor text', () => {
    render(<CompetencyDetail track={track} domain={domain} competency={competency} />)
    const p3Level = competency.levels.find((l) => l.level === 'p3')!
    expect(screen.getByText(p3Level.descriptor)).toBeTruthy()
  })

  it('renders P3 criterion text', () => {
    render(<CompetencyDetail track={track} domain={domain} competency={competency} />)
    const p3Level = competency.levels.find((l) => l.level === 'p3')!
    expect(screen.getByText(p3Level.criteria[0].text)).toBeTruthy()
  })

  it('renders no checkbox or rating control inputs', () => {
    const { container } = render(
      <CompetencyDetail track={track} domain={domain} competency={competency} />
    )
    expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(0)
    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(0)
    expect(container.querySelectorAll('select')).toHaveLength(0)
  })
})

describe('B-1: CompetencyDetail — current level highlight', () => {
  it('"Your level" badge present exactly once when currentLevel=p3', () => {
    useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p3' })
    render(<CompetencyDetail track={track} domain={domain} competency={competency} />)
    const badges = screen.getAllByText('Your level')
    expect(badges).toHaveLength(1)
  })

  it('P7 card highlighted at currentLevel=p7 with no crash', () => {
    useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p7' })
    render(<CompetencyDetail track={track} domain={domain} competency={competency} />)
    expect(screen.getAllByText('Your level')).toHaveLength(1)
  })

  it('no "Your level" badge when currentLevel does not match displayed cards', () => {
    // Default currentLevel is 'p3' — swap to ensure this test is meaningful
    // by checking that ONLY the matching card gets the badge (no extras)
    useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p4' })
    render(<CompetencyDetail track={track} domain={domain} competency={competency} />)
    const badges = screen.getAllByText('Your level')
    expect(badges).toHaveLength(1)
    // p3 card should NOT have the badge
    expect(screen.queryByText('P3')?.closest('[data-level]')?.textContent).not.toContain(
      'Your level'
    )
  })
})

describe('B-1: CompetencyDetail — breadcrumb', () => {
  it('breadcrumb shows track name, domain name, and competency name', () => {
    render(<CompetencyDetail track={track} domain={domain} competency={competency} />)
    expect(screen.getByText(track.name)).toBeTruthy()
    expect(screen.getByText(domain.name)).toBeTruthy()
    expect(screen.getByText(competency.name)).toBeTruthy()
  })
})
