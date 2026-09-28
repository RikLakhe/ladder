'use client'

import Link from 'next/link'
import { useLadderStore } from '@/lib/store'
import { computeProgress } from '@/lib/content'
import ProgressRing from '@/components/ProgressRing'
import type { Track } from '@/lib/types'

interface TrackOverviewProps {
  track: Track
}

export default function TrackOverview({ track }: TrackOverviewProps) {
  const currentLevel = useLadderStore((s) => s.currentLevel)
  const assessments = useLadderStore((s) => s.assessments)

  function getDomainProgress(domainId: string): number {
    const domain = track.domains.find((d) => d.id === domainId)
    if (!domain || domain.comingSoon) return 0

    let totalCriteria = 0
    let checkedCriteria = 0

    for (const competency of domain.competencies) {
      const key = `${track.id}/${domainId}/${competency.id}`
      const assessment = assessments[key]
      const checkedIds = assessment?.criteriaChecked ?? []

      const levelData = competency.levels.find((l) => l.level === currentLevel)
      if (!levelData) continue

      totalCriteria += levelData.criteria.length
      checkedCriteria += levelData.criteria.filter((c) => checkedIds.includes(c.id)).length
    }

    if (totalCriteria === 0) return 0
    return Math.round((checkedCriteria / totalCriteria) * 100)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {track.domains.map((domain) => (
        <div key={domain.id} data-testid="domain-card" className="rounded-lg border p-4">
          {domain.comingSoon ? (
            <div>
              <h3 className="font-semibold text-gray-800">{domain.name}</h3>
              <span className="mt-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-500">
                Coming soon
              </span>
            </div>
          ) : (
            <Link href={`/${track.id}/${domain.id}`} className="block">
              <div className="flex items-center gap-4">
                <div data-testid="progress-ring">
                  <ProgressRing
                    percentage={getDomainProgress(domain.id)}
                    size={56}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{domain.name}</h3>
                  <p className="text-sm text-gray-500">{getDomainProgress(domain.id)}% complete</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
