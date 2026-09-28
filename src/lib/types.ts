export type LevelId = 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7'
export type TrackId = 'dev' | 'qa' | 'data' | 'ai'
export type SelfRating = 'developing' | 'meeting' | 'exceeding'

export interface Criterion {
  id: string
  text: string
}

export interface LevelDescriptor {
  level: LevelId
  descriptor: string
  criteria: Criterion[]
}

export interface Competency {
  id: string
  name: string
  description: string
  levels: LevelDescriptor[]
}

export interface Domain {
  id: string
  name: string
  description: string
  comingSoon: boolean
  competencies: Competency[]
}

export interface Track {
  id: TrackId
  name: string
  description: string
  domains: Domain[]
}

export interface CompetencyAssessment {
  selfRating?: SelfRating
  criteriaChecked: string[]
  updatedAt: string
}

export interface AssessmentStore {
  currentTrack: TrackId | null
  currentLevel: LevelId
  focusedView: boolean
  assessments: Record<string, CompetencyAssessment>
  setTrack: (track: TrackId) => void
  setLevel: (level: LevelId) => void
  toggleFocusedView: () => void
  setFocusedView: (value: boolean) => void
  setRating: (key: string, rating: SelfRating) => void
  toggleCriterion: (key: string, criterionId: string) => void
}

export const LEVELS = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7'] as const
