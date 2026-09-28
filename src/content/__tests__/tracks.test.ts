import { describe, it, expect } from 'vitest'
import { tracks } from '../tracks'
import type { Track, Domain, Competency, LevelDescriptor } from '@/lib/types'

const LEVEL_IDS = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7'] as const
const CRITERION_ID_RE = /^(dev|qa|data|ai|shared)\/.+\/.+\/p[2-7]\/\d+$/

describe('B-1: tracks schema', () => {
  it('1. has exactly 4 tracks with correct IDs', () => {
    expect(tracks).toHaveLength(4)
    expect(tracks.map((t) => t.id)).toEqual(['dev', 'qa', 'data', 'ai'])
  })

  it('2. every track has required fields', () => {
    for (const track of tracks) {
      expect(track.id).toBeTruthy()
      expect(track.name).toBeTruthy()
      expect(track.description).toBeTruthy()
      expect(Array.isArray(track.domains)).toBe(true)
    }
  })

  it('3. every domain has required fields including comingSoon boolean', () => {
    for (const track of tracks) {
      for (const domain of track.domains) {
        expect(domain.id).toBeTruthy()
        expect(domain.name).toBeTruthy()
        expect(domain.description).toBeTruthy()
        expect(typeof domain.comingSoon).toBe('boolean')
        expect(Array.isArray(domain.competencies)).toBe(true)
      }
    }
  })

  it('4. every non-coming-soon competency has entries for all 6 levels', () => {
    for (const track of tracks) {
      for (const domain of track.domains) {
        if (domain.comingSoon) continue
        for (const competency of domain.competencies) {
          const levelIds = competency.levels.map((l: LevelDescriptor) => l.level)
          for (const levelId of LEVEL_IDS) {
            expect(levelIds).toContain(levelId)
          }
        }
      }
    }
  })

  it('5. every level has a non-empty descriptor', () => {
    for (const track of tracks) {
      for (const domain of track.domains) {
        if (domain.comingSoon) continue
        for (const competency of domain.competencies) {
          for (const level of competency.levels) {
            expect(level.descriptor.trim().length).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('6. every level in a non-coming-soon domain has at least 1 criterion', () => {
    for (const track of tracks) {
      for (const domain of track.domains) {
        if (domain.comingSoon) continue
        for (const competency of domain.competencies) {
          for (const level of competency.levels) {
            expect(level.criteria.length).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('7. all criterion IDs match the expected format', () => {
    for (const track of tracks) {
      for (const domain of track.domains) {
        if (domain.comingSoon) continue
        for (const competency of domain.competencies) {
          for (const level of competency.levels) {
            for (const criterion of level.criteria) {
              expect(criterion.id).toMatch(CRITERION_ID_RE)
            }
          }
        }
      }
    }
  })

  it('8. competency IDs are unique within each domain', () => {
    for (const track of tracks) {
      for (const domain of track.domains) {
        const ids = domain.competencies.map((c: Competency) => c.id)
        const unique = new Set(ids)
        expect(unique.size).toBe(ids.length)
      }
    }
  })

  it('9. every domain with comingSoon: true has competencies: []', () => {
    for (const track of tracks) {
      for (const domain of track.domains) {
        if (domain.comingSoon) {
          expect(domain.competencies).toEqual([])
        }
      }
    }
  })
})
