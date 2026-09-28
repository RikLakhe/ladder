'use client'

import Link from 'next/link'
import { useLadderStore } from '@/lib/store'
import type { Track, Domain, Competency, LevelId } from '@/lib/types'

const LEVEL_ORDER: LevelId[] = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']
const LEVEL_LABEL: Record<LevelId, string> = {
  p2: 'P2', p3: 'P3', p4: 'P4', p5: 'P5', p6: 'P6', p7: 'P7',
}

interface CompetencyDetailProps {
  track: Track
  domain: Domain
  competency: Competency
}

export default function CompetencyDetail({ track, domain, competency }: CompetencyDetailProps) {
  const currentLevel = useLadderStore((s) => s.currentLevel)

  return (
    <div>
      <nav className="mb-6 text-sm text-gray-500 flex gap-2 flex-wrap">
        <Link href={`/${track.id}`} className="hover:underline">{track.name}</Link>
        <span>/</span>
        <Link href={`/${track.id}/${domain.id}`} className="hover:underline">{domain.name}</Link>
        <span>/</span>
        <span className="font-medium text-gray-800">{competency.name}</span>
      </nav>

      <div className="flex flex-col gap-4">
        {LEVEL_ORDER.map((levelId) => {
          const levelData = competency.levels.find((l) => l.level === levelId)
          const isCurrentLevel = currentLevel === levelId

          return (
            <div
              key={levelId}
              data-level={levelId}
              className={`rounded-lg border p-5 ${
                isCurrentLevel
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
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
                  <p className="text-gray-700 mb-3">{levelData.descriptor}</p>
                  <ul className="space-y-1">
                    {levelData.criteria.map((criterion) => (
                      <li key={criterion.id} className="text-sm text-gray-600">
                        {criterion.text}
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
