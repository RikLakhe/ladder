import { tracks as allTracks } from '@/content/tracks'
import type { Track, Domain, Competency, LevelId, TrackId } from './types'

const LEVEL_ORDER: LevelId[] = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']

export function getTracks(): Track[] {
  return allTracks
}

export function getTrack(id: TrackId): Track | null {
  return allTracks.find((t) => t.id === id) ?? null
}

export function getDomain(trackId: TrackId, domainId: string): Domain | null {
  const track = getTrack(trackId)
  if (!track) return null
  return track.domains.find((d) => d.id === domainId) ?? null
}

export function getCompetency(
  trackId: TrackId,
  domainId: string,
  competencyId: string
): Competency | null {
  const domain = getDomain(trackId, domainId)
  if (!domain) return null
  return domain.competencies.find((c) => c.id === competencyId) ?? null
}

export function getNextLevel(level: LevelId): LevelId | null {
  const idx = LEVEL_ORDER.indexOf(level)
  if (idx === -1 || idx === LEVEL_ORDER.length - 1) return null
  return LEVEL_ORDER[idx + 1]
}

export function computeProgress(
  competency: Competency,
  level: LevelId,
  checkedIds: string[]
): number {
  const levelData = competency.levels.find((l) => l.level === level)
  if (!levelData || levelData.criteria.length === 0) return 0
  const checked = levelData.criteria.filter((c) => checkedIds.includes(c.id)).length
  return Math.round((checked / levelData.criteria.length) * 100)
}
