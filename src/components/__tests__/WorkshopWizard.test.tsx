import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useLadderStore, DEFAULT_STATE } from '@/lib/store'
import { getTrack } from '@/lib/content'
import WorkshopWizard from '../WorkshopWizard'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-1: WorkshopWizard renders header with track name, counter, and progress bar', () => {
  it('shows track name, "1 of N" counter, and <progress> element', () => {
    const devTrack = getTrack('dev')!
    render(<WorkshopWizard track={devTrack} scope={null} />)
    expect(screen.getByText(/Engineering/)).toBeInTheDocument()
    expect(screen.getByText(/1 of \d+/)).toBeInTheDocument()
    expect(document.querySelector('progress')).not.toBeNull()
  })
})

describe('B-2: Main area shows criterion text, checkbox, and 3 rating radio inputs', () => {
  it('renders criterion text, a checkbox, and Developing/Meeting/Exceeding radios', () => {
    const devTrack = getTrack('dev')!
    render(<WorkshopWizard track={devTrack} scope={null} />)
    // criterion text in card — first criterion of dev/delivery/project-planning at p3
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
    expect(screen.getByText(/developing/i)).toBeInTheDocument()
    expect(screen.getByText(/meeting/i)).toBeInTheDocument()
    expect(screen.getByText(/exceeding/i)).toBeInTheDocument()
  })
})

describe('B-3: Next advances; Back no-ops at 0; Skip advances without checkbox change', () => {
  it('Next button increments counter from "1 of N" to "2 of N"', () => {
    const devTrack = getTrack('dev')!
    render(<WorkshopWizard track={devTrack} scope={null} />)
    expect(screen.getByText(/1 of \d+/)).toBeInTheDocument()
    fireEvent.click(screen.getByText('Next →'))
    expect(screen.getByText(/2 of \d+/)).toBeInTheDocument()
  })

  it('Back at index=0 is a no-op', () => {
    const devTrack = getTrack('dev')!
    render(<WorkshopWizard track={devTrack} scope={null} />)
    fireEvent.click(screen.getByText('← Back'))
    expect(screen.getByText(/1 of \d+/)).toBeInTheDocument()
  })

  it('Skip advances without toggling checkbox', () => {
    const devTrack = getTrack('dev')!
    render(<WorkshopWizard track={devTrack} scope={null} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    fireEvent.click(screen.getByText('Skip'))
    expect(screen.getByText(/2 of \d+/)).toBeInTheDocument()
    // store should have no criteria checked
    const state = useLadderStore.getState()
    const allChecked = Object.values(state.assessments).flatMap((a) => a.criteriaChecked)
    expect(allChecked).toHaveLength(0)
  })
})

describe('B-4: Checkbox writes to store via toggleCriterion', () => {
  it('checking the checkbox adds criterion ID to store criteriaChecked', () => {
    const devTrack = getTrack('dev')!
    render(<WorkshopWizard track={devTrack} scope={null} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    const state = useLadderStore.getState()
    const allChecked = Object.values(state.assessments).flatMap((a) => a.criteriaChecked)
    expect(allChecked.length).toBeGreaterThan(0)
  })
})

describe('B-5: "Continue?" banner shown when workshopPosition matches current track+level', () => {
  it('shows resume banner when workshopPosition.criterionIndex > 0', () => {
    const devTrack = getTrack('dev')!
    useLadderStore.setState({
      ...DEFAULT_STATE,
      workshopPosition: {
        track: 'dev',
        level: 'p3',
        scope: null,
        criterionIndex: 3,
        totalCriteria: 50,
        startedAt: new Date().toISOString(),
      },
    })
    render(<WorkshopWizard track={devTrack} scope={null} />)
    expect(screen.getByText(/You left off at criterion/)).toBeInTheDocument()
  })
})

describe('B-7: Swipe gesture — left advances, right goes back', () => {
  it('swipe left (delta > 60px) calls Next', () => {
    const devTrack = getTrack('dev')!
    const { container } = render(<WorkshopWizard track={devTrack} scope={null} />)
    expect(screen.getByText(/1 of \d+/)).toBeInTheDocument()
    const wrapper = container.firstElementChild!
    fireEvent.pointerDown(wrapper, { clientX: 200 })
    fireEvent.pointerUp(wrapper, { clientX: 80 }) // delta = -120 (left swipe)
    expect(screen.getByText(/2 of \d+/)).toBeInTheDocument()
  })

  it('swipe right (delta > 60px) from index>0 goes back', () => {
    const devTrack = getTrack('dev')!
    const { container } = render(<WorkshopWizard track={devTrack} scope={null} />)
    fireEvent.click(screen.getByText('Next →'))
    expect(screen.getByText(/2 of \d+/)).toBeInTheDocument()
    const wrapper = container.firstElementChild!
    fireEvent.pointerDown(wrapper, { clientX: 80 })
    fireEvent.pointerUp(wrapper, { clientX: 200 }) // delta = +120 (right swipe)
    expect(screen.getByText(/1 of \d+/)).toBeInTheDocument()
  })
})

describe('B-6: Completion screen shows heading and CTAs after last criterion', () => {
  it('shows "Workshop complete" heading and result/domain links after advancing past last criterion', () => {
    // Use scope to limit to a single competency with few criteria
    const devTrack = getTrack('dev')!
    const deliveryDomain = devTrack.domains.find((d) => d.id === 'delivery')!
    const competency = deliveryDomain.competencies[0]
    render(<WorkshopWizard track={devTrack} scope={competency.id} />)
    // Click Next until done
    const levelData = competency.levels.find((l) => l.level === 'p3')!
    const total = levelData.criteria.length
    for (let i = 0; i < total; i++) {
      fireEvent.click(screen.getByText('Next →'))
    }
    expect(screen.getByText(/Workshop complete/i)).toBeInTheDocument()
    expect(screen.getByText('See my results')).toBeInTheDocument()
    expect(screen.getByText('Review by domain')).toBeInTheDocument()
  })
})
