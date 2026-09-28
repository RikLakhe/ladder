import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CompetencyAssessmentView from '../CompetencyAssessmentView'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getCompetency } from '@/lib/content'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p3' })
})

const competency = getCompetency('dev', 'leadership', 'decision-making')!
const trackId = 'dev' as const
const domainId = 'leadership'
const assessmentKey = `${trackId}/${domainId}/${competency.id}`

describe('B-1: CompetencyAssessmentView — checkboxes', () => {
  it('renders at least 2 checkboxes for P3 criteria', () => {
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThanOrEqual(2)
  })

  it('checking first P3 checkbox adds criterion ID to store criteriaChecked', () => {
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    const p3Level = competency.levels.find((l) => l.level === 'p3')!
    const firstCriterionId = p3Level.criteria[0].id
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    const state = useLadderStore.getState()
    expect(state.assessments[assessmentKey]?.criteriaChecked).toContain(firstCriterionId)
  })

  it('unchecking a checked checkbox removes criterion ID from store', () => {
    useLadderStore.setState({
      ...DEFAULT_STATE,
      currentLevel: 'p3',
      assessments: {
        [assessmentKey]: {
          criteriaChecked: [competency.levels.find((l) => l.level === 'p3')!.criteria[0].id],
          updatedAt: new Date().toISOString(),
        },
      },
    })
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    const state = useLadderStore.getState()
    expect(state.assessments[assessmentKey]?.criteriaChecked).toHaveLength(0)
  })
})

describe('B-1: CompetencyAssessmentView — self-rating buttons', () => {
  it('renders 3 self-rating buttons (Developing, Meeting, Exceeding)', () => {
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    expect(screen.getByRole('button', { name: /developing/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /meeting/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /exceeding/i })).toBeTruthy()
  })

  it('clicking Meeting sets selfRating="meeting" in store', () => {
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    fireEvent.click(screen.getByRole('button', { name: /meeting/i }))
    expect(useLadderStore.getState().assessments[assessmentKey]?.selfRating).toBe('meeting')
  })

  it('aria-pressed reflects store selfRating state', () => {
    useLadderStore.setState({
      ...DEFAULT_STATE,
      currentLevel: 'p3',
      assessments: {
        [assessmentKey]: {
          selfRating: 'exceeding',
          criteriaChecked: [],
          updatedAt: new Date().toISOString(),
        },
      },
    })
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    expect(screen.getByRole('button', { name: /exceeding/i }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: /meeting/i }).getAttribute('aria-pressed')).toBe('false')
  })
})

describe('B-1: CompetencyAssessmentView — current level highlight', () => {
  it('P3 card shows "Your level" badge when currentLevel=p3', () => {
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    expect(screen.getAllByText('Your level')).toHaveLength(1)
  })
})

describe('B-1: CompetencyAssessmentView — assessment key isolation', () => {
  it('operation on one key does not affect another key', () => {
    const otherKey = 'dev/leadership/mentoring'
    useLadderStore.setState({
      ...DEFAULT_STATE,
      currentLevel: 'p3',
      assessments: {
        [otherKey]: {
          criteriaChecked: ['shared/leadership/mentoring/p3/0'],
          updatedAt: new Date().toISOString(),
        },
      },
    })
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    const state = useLadderStore.getState()
    expect(state.assessments[otherKey]?.criteriaChecked).toEqual(['shared/leadership/mentoring/p3/0'])
  })
})

describe('B-1: CompetencyAssessmentView — focused view', () => {
  it('focusedView=false: all 6 level badges visible', () => {
    useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p3', focusedView: false })
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    for (const label of ['P2', 'P3', 'P4', 'P5', 'P6', 'P7']) {
      expect(screen.getByText(label)).toBeTruthy()
    }
  })

  it('focusedView=true, currentLevel=p3: only P3 and P4 badges present; others absent from DOM', () => {
    useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p3', focusedView: true })
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    expect(screen.getByText('P3')).toBeTruthy()
    expect(screen.getByText('P4')).toBeTruthy()
    expect(screen.queryByText('P2')).toBeNull()
    expect(screen.queryByText('P5')).toBeNull()
    expect(screen.queryByText('P6')).toBeNull()
    expect(screen.queryByText('P7')).toBeNull()
  })

  it('focusedView=true, currentLevel=p7: only P7 badge visible + highest-level message', () => {
    useLadderStore.setState({ ...DEFAULT_STATE, currentLevel: 'p7', focusedView: true })
    render(<CompetencyAssessmentView competency={competency} trackId={trackId} domainId={domainId} />)
    expect(screen.getByText('P7')).toBeTruthy()
    expect(screen.queryByText('P6')).toBeNull()
    expect(
      screen.getByText("You're at the highest level — P7 is the top of the Leapfrog career ladder.")
    ).toBeTruthy()
  })
})
