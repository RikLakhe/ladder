'use client'

import Link from 'next/link'
import { useLadderStore } from '@/lib/store'
import { computeProgress } from '@/lib/content'
import type { Track, LevelId } from '@/lib/types'

const LEVELS: LevelId[] = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']

function heatColor(pct: number): { bg: string; bucket: string } {
  if (pct === 0) return { bg: '#f1f5f9', bucket: '0' }
  if (pct < 50) return { bg: '#B4FFD6', bucket: '1' }
  if (pct < 80) return { bg: '#79D9A5', bucket: '50' }
  if (pct < 100) return { bg: '#3EB474', bucket: '80' }
  return { bg: '#038E43', bucket: '100' }
}

function domainPct(
  domain: Track['domains'][number],
  level: LevelId,
  checkedIds: string[]
): number {
  if (domain.comingSoon || domain.competencies.length === 0) return 0
  const total = domain.competencies.length
  const sum = domain.competencies.reduce(
    (acc, c) => acc + computeProgress(c, level, checkedIds),
    0
  )
  return Math.round(sum / total)
}

interface Props {
  track: Track
}

export default function MatrixHeatMap({ track }: Props) {
  const { currentLevel, assessments } = useLadderStore()
  const checkedIds = Object.values(assessments).flatMap((a) => a.criteriaChecked)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="p-2 text-left font-medium text-gray-500 w-32">Domain</th>
            {LEVELS.map((level) => (
              <th
                key={level}
                data-level={level}
                className="p-2 text-center font-medium text-gray-500 min-w-[72px]"
              >
                <span>{level.toUpperCase()}</span>
                {level === currentLevel && (
                  <span className="ml-1 rounded-full bg-leapverse-100 px-1.5 py-0.5 text-xs text-white">
                    You
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {track.domains.map((domain) => (
            <tr key={domain.id}>
              <td className="p-2 font-medium text-gray-700 truncate max-w-[8rem]">
                {domain.name}
              </td>
              {LEVELS.map((level) => {
                const pct = domainPct(domain, level, checkedIds)
                const { bg, bucket } = heatColor(pct)
                const criteriaTotal = domain.comingSoon
                  ? 0
                  : domain.competencies.reduce((acc, c) => {
                      const ld = c.levels.find((l) => l.level === level)
                      return acc + (ld?.criteria.length ?? 0)
                    }, 0)
                const criteriaChecked = domain.comingSoon
                  ? 0
                  : domain.competencies.reduce((acc, c) => {
                      const ld = c.levels.find((l) => l.level === level)
                      if (!ld) return acc
                      return acc + ld.criteria.filter((cr) => checkedIds.includes(cr.id)).length
                    }, 0)
                const titleStr = domain.comingSoon
                  ? `${domain.name} · ${level.toUpperCase()} — coming soon`
                  : `${domain.name} · ${level.toUpperCase()} — ${criteriaChecked} of ${criteriaTotal} criteria met`

                const cellInner = (
                  <div
                    data-testid="heat-cell"
                    data-heat={bucket}
                    title={titleStr}
                    className="h-10 w-full rounded flex items-center justify-center text-xs font-medium transition-opacity"
                    style={{ background: bg }}
                  >
                    {pct === 100 && !domain.comingSoon && (
                      <span aria-hidden="true">✓</span>
                    )}
                  </div>
                )

                return (
                  <td key={level} className="p-1">
                    {domain.comingSoon ? (
                      cellInner
                    ) : (
                      <Link href={`/${track.id}/${domain.id}`} className="block">
                        {cellInner}
                      </Link>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
