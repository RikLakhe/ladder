import { describe, it, expect } from 'vitest'
import {
  getTracks,
  getTrack,
  getDomain,
  getCompetency,
  getNextLevel,
  computeProgress,
} from '../content'
import type { TrackId } from '../types'

describe('getTracks', () => {
  it('returns all 4 tracks', () => {
    expect(getTracks()).toHaveLength(4)
  })
})

describe('getTrack', () => {
  it('returns matching track', () => {
    const track = getTrack('dev')
    expect(track).not.toBeNull()
    expect(track?.id).toBe('dev')
  })

  it('returns null for unknown id', () => {
    expect(getTrack('unknown' as TrackId)).toBeNull()
  })
})

describe('getDomain', () => {
  it('returns matching domain', () => {
    const domain = getDomain('dev', 'leadership')
    expect(domain).not.toBeNull()
    expect(domain?.id).toBe('leadership')
  })

  it('returns null for unknown domain', () => {
    expect(getDomain('dev', 'nonexistent')).toBeNull()
  })
})

describe('getCompetency', () => {
  it('returns matching competency', () => {
    const competency = getCompetency('dev', 'leadership', 'decision-making')
    expect(competency).not.toBeNull()
    expect(competency?.id).toBe('decision-making')
  })
})

describe('getNextLevel', () => {
  it('returns next level for p2', () => {
    expect(getNextLevel('p2')).toBe('p3')
  })

  it('returns p7 for p6', () => {
    expect(getNextLevel('p6')).toBe('p7')
  })

  it('returns null for p7 — never beyond P7', () => {
    expect(getNextLevel('p7')).toBeNull()
  })
})

describe('computeProgress', () => {
  it('returns 0 when no criteria checked', () => {
    const competency = getCompetency('dev', 'leadership', 'decision-making')!
    expect(computeProgress(competency, 'p3', [])).toBe(0)
  })

  it('returns 100 when all criteria checked', () => {
    const competency = getCompetency('dev', 'leadership', 'decision-making')!
    const level = competency.levels.find((l) => l.level === 'p3')!
    const allIds = level.criteria.map((c) => c.id)
    expect(computeProgress(competency, 'p3', allIds)).toBe(100)
  })

  it('returns rounded integer for partial progress', () => {
    const competency = getCompetency('dev', 'leadership', 'decision-making')!
    const level = competency.levels.find((l) => l.level === 'p3')!
    const [firstId] = level.criteria.map((c) => c.id)
    const result = computeProgress(competency, 'p3', [firstId])
    expect(Number.isInteger(result)).toBe(true)
    expect(result).toBeGreaterThan(0)
    expect(result).toBeLessThan(100)
  })
})
