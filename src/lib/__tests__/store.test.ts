import { describe, it, expect, beforeEach } from 'vitest'
import { useLadderStore, DEFAULT_STATE } from '../store'

beforeEach(() => {
  useLadderStore.setState({ ...DEFAULT_STATE })
})

describe('B-1: default state', () => {
  it('initialises with correct defaults', () => {
    const state = useLadderStore.getState()
    expect(state.currentTrack).toBeNull()
    expect(state.currentLevel).toBe('p3')
    expect(state.focusedView).toBe(false)
    expect(state.assessments).toEqual({})
  })
})

describe('B-2: setTrack', () => {
  it('updates currentTrack', () => {
    useLadderStore.getState().setTrack('dev')
    expect(useLadderStore.getState().currentTrack).toBe('dev')
  })
})

describe('B-3: setLevel', () => {
  it('updates currentLevel', () => {
    useLadderStore.getState().setLevel('p5')
    expect(useLadderStore.getState().currentLevel).toBe('p5')
  })
})

describe('B-4: toggleFocusedView', () => {
  it('inverts focusedView on each call', () => {
    useLadderStore.getState().toggleFocusedView()
    expect(useLadderStore.getState().focusedView).toBe(true)
    useLadderStore.getState().toggleFocusedView()
    expect(useLadderStore.getState().focusedView).toBe(false)
  })
})

describe('B-5: setRating creates new entry', () => {
  it('sets selfRating and initialises criteriaChecked to []', () => {
    const key = 'dev/leadership/decision-making'
    useLadderStore.getState().setRating(key, 'meeting')
    const assessment = useLadderStore.getState().assessments[key]
    expect(assessment.selfRating).toBe('meeting')
    expect(assessment.criteriaChecked).toEqual([])
    expect(assessment.updatedAt).toBeTruthy()
  })
})

describe('B-6: setRating preserves criteriaChecked', () => {
  it('second setRating does not clear existing criteriaChecked', () => {
    const key = 'dev/leadership/decision-making'
    const criterionId = 'dev/leadership/decision-making/p3/0'
    useLadderStore.getState().setRating(key, 'developing')
    useLadderStore.getState().toggleCriterion(key, criterionId)
    useLadderStore.getState().setRating(key, 'meeting')
    const assessment = useLadderStore.getState().assessments[key]
    expect(assessment.selfRating).toBe('meeting')
    expect(assessment.criteriaChecked).toContain(criterionId)
  })
})

describe('B-7: toggleCriterion adds on first call', () => {
  it('adds criterionId to criteriaChecked', () => {
    const key = 'dev/leadership/decision-making'
    const criterionId = 'dev/leadership/decision-making/p3/0'
    useLadderStore.getState().setRating(key, 'developing')
    useLadderStore.getState().toggleCriterion(key, criterionId)
    expect(useLadderStore.getState().assessments[key].criteriaChecked).toContain(criterionId)
  })
})

describe('B-8: toggleCriterion removes on second call', () => {
  it('removes criterionId and preserves selfRating', () => {
    const key = 'dev/leadership/decision-making'
    const criterionId = 'dev/leadership/decision-making/p3/0'
    useLadderStore.getState().setRating(key, 'exceeding')
    useLadderStore.getState().toggleCriterion(key, criterionId)
    useLadderStore.getState().toggleCriterion(key, criterionId)
    const assessment = useLadderStore.getState().assessments[key]
    expect(assessment.criteriaChecked).not.toContain(criterionId)
    expect(assessment.selfRating).toBe('exceeding')
  })
})
