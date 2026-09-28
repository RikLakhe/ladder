'use client'

import { useLadderStore } from '@/lib/store'
import type { Competency, TrackId, LevelId, SelfRating } from '@/lib/types'

const LEVEL_ORDER: LevelId[] = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']
const LEVEL_LABEL: Record<LevelId, string> = {
  p2: 'P2', p3: 'P3', p4: 'P4', p5: 'P5', p6: 'P6', p7: 'P7',
}
const RATINGS: { value: SelfRating; label: string }[] = [
  { value: 'developing', label: 'Developing' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'exceeding', label: 'Exceeding' },
]

interface CompetencyAssessmentViewProps {
  competency: Competency
  trackId: TrackId
  domainId: string
}

export default function CompetencyAssessmentView({
  competency,
  trackId,
  domainId,
}: CompetencyAssessmentViewProps) {
  const currentLevel = useLadderStore((s) => s.currentLevel)
  const assessments = useLadderStore((s) => s.assessments)
  const toggleCriterion = useLadderStore((s) => s.toggleCriterion)
  const setRating = useLadderStore((s) => s.setRating)

  const key = `${trackId}/${domainId}/${competency.id}`
  const assessment = assessments[key]
  const checkedIds = assessment?.criteriaChecked ?? []
  const selfRating = assessment?.selfRating

  // Current level first so its checkboxes are first in DOM
  const orderedLevels = [
    currentLevel,
    ...LEVEL_ORDER.filter((l) => l !== currentLevel),
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {RATINGS.map(({ value, label }) => (
          <button
            key={value}
            aria-pressed={selfRating === value ? 'true' : 'false'}
            onClick={() => setRating(key, value)}
            className={`px-4 py-2 rounded border text-sm font-medium ${
              selfRating === value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {orderedLevels.map((levelId) => {
          const levelData = competency.levels.find((l) => l.level === levelId)
          const isCurrentLevel = currentLevel === levelId

          return (
            <div
              key={levelId}
              data-level={levelId}
              className={`rounded-lg border p-5 ${
                isCurrentLevel ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`font-bold text-lg ${isCurrentLevel ? 'text-blue-700' : 'text-gray-700'}`}>
                  {LEVEL_LABEL[levelId]}
                </span>
                {isCurrentLevel && (
                  <span className="rounded-full bg-blue-600 px-3 py-0.5 text-xs font-medium text-white">
                    Your level
                  </span>
                )}
              </div>

              {levelData ? (
                <>
                  <p className="text-gray-700 mb-3 text-sm">{levelData.descriptor}</p>
                  <ul className="space-y-2">
                    {levelData.criteria.map((criterion) => (
                      <li key={criterion.id} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id={criterion.id}
                          checked={checkedIds.includes(criterion.id)}
                          onChange={() => toggleCriterion(key, criterion.id)}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={criterion.id} className="text-sm text-gray-600">
                          {criterion.text}
                        </label>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-gray-400">No criteria defined for this level.</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
