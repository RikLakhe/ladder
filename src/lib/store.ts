import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AssessmentStore, TrackId, LevelId, SelfRating, WorkshopPosition } from './types'

export const DEFAULT_STATE = {
  currentTrack: null as TrackId | null,
  currentLevel: 'p3' as LevelId,
  focusedView: false,
  assessments: {} as AssessmentStore['assessments'],
  workshopPosition: null as WorkshopPosition | null,
}

export const useLadderStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      setTrack: (track) => set({ currentTrack: track }),

      setLevel: (level) => set({ currentLevel: level }),

      toggleFocusedView: () => set((s) => ({ focusedView: !s.focusedView })),

      setFocusedView: (value) => set({ focusedView: value }),

      setRating: (key, rating: SelfRating) => {
        const existing = get().assessments[key]
        set({
          assessments: {
            ...get().assessments,
            [key]: {
              selfRating: rating,
              criteriaChecked: existing?.criteriaChecked ?? [],
              updatedAt: new Date().toISOString(),
            },
          },
        })
      },

      setWorkshopPosition: (pos) => set({ workshopPosition: pos }),

      toggleCriterion: (key, criterionId) => {
        const existing = get().assessments[key]
        const checked = existing?.criteriaChecked ?? []
        const next = checked.includes(criterionId)
          ? checked.filter((id) => id !== criterionId)
          : [...checked, criterionId]
        set({
          assessments: {
            ...get().assessments,
            [key]: {
              ...existing,
              criteriaChecked: next,
              updatedAt: new Date().toISOString(),
            },
          },
        })
      },
    }),
    {
      name: 'ladder-store',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)
